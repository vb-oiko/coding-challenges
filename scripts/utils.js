import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import readline from 'readline';
import { load } from 'cheerio';

export async function fetchProblemMetadata(url) {
    const slugMatch = url.match(/\/problems\/([^/]+)/);
    if (!slugMatch) throw new Error('Invalid LeetCode URL');

    const slug = slugMatch[1];
    const query = `
    query getQuestionDetail($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        title
        titleSlug
        difficulty
        content
        codeSnippets {
          lang
          langSlug
          code
        }
        exampleTestcases
      }
    }
  `;

    const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { titleSlug: slug } }),
    });

    const data = await res.json();
    const question = data.data.question;

    const jsSnippet = question.codeSnippets.find(
        (s) => s.lang === 'JavaScript'
    );
    if (!jsSnippet) throw new Error('No JavaScript snippet found');

    return {
        slug: question.titleSlug,
        title: question.title,
        difficulty: question.difficulty,
        descriptionHtml: question.content,
        functionCode: jsSnippet.code,
        exampleTestcases: question.exampleTestcases,
    };
}

export const toKebabCase = (str) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const toCamelCase = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

export const prompt = (q) =>
    new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(q, (ans) => {
            rl.close();
            resolve(ans);
        });
    });

export function extractTestCasesFromHTML(html) {
    const $ = load(html);
    const testCases = [];

    $('strong.example').each((_, el) => {
        const pre = $(el).parent().next('pre');
        if (pre.length === 0) return;

        const lines = pre
            .text()
            .split('\n')
            .map((l) => l.trim())
            .filter(Boolean);
        let inputObj = {};
        let outputVal = undefined;

        for (const line of lines) {
            // Match Input: pairs = [[1,2],[2,3],[3,4]]
            const inputMatch = line.match(/^Input:\s*(.+)$/i);
            if (inputMatch) {
                let inputStr = inputMatch[1]
                    .replace(/=/g, ':')
                    .replace(/'/g, '"'); // handle single quotes if any
                // Wrap in curly braces
                inputStr = `{${inputStr}}`;
                try {
                    // Use Function to parse JS-like arrays (since JSON.parse doesn't allow unquoted keys or single quotes)
                    inputObj = new Function('return ' + inputStr)();
                } catch {
                    inputObj = {};
                }
            }
            // Match Output: 2
            const outputMatch = line.match(/^Output:\s*(.+)$/i);
            if (outputMatch) {
                let val = outputMatch[1].trim();
                try {
                    outputVal = new Function('return ' + val)();
                } catch {
                    outputVal = val;
                }
            }
        }

        if (Object.keys(inputObj).length && outputVal !== undefined) {
            testCases.push({
                input: inputObj,
                output: outputVal,
            });
        }
    });

    return testCases;
}

export function generateTestBoilerplate(testCases, functionName = 'problem') {
    return `

const tests = ${JSON.stringify(testCases)};

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = ${functionName}(...Object.values(test.input));
    if (!deepEqual(result, test.output)) {
        console.log('❌ fail:');
        console.dir(
            { ...test.input, result, expected: test.output },
            { depth: null }
        );
    } else {
        console.log('✅ pass');
    }
}

    `;
}

export function parseFunctionName(functionCode) {
    // Matches: var functionName = function(
    const match = functionCode.match(
        /var\s+([a-zA-Z0-9_]+)\s*=\s*function\s*\(/
    );
    return match ? match[1] : null;
}

export function createProblemFolderAndFiles({
    targetDir,
    indexFileContent,
    readmeFileContent,
}) {
    const indexFile = path.join(targetDir, 'index.js');

    if (fs.existsSync(indexFile)) {
        console.error('❌ Problem already exists.');
        process.exit(1);
    }

    fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(indexFile, indexFileContent);

    fs.writeFileSync(path.join(targetDir, 'README.md'), readmeFileContent);

    console.log(`\n✅ Created:`);
    console.log(`- ${indexFile}`);
}
