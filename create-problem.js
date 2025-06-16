#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import fetch from 'node-fetch';
import { load } from 'cheerio';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_PATH = path.join(__dirname, 'neetcode');

const prompt = (q) =>
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

const toKebabCase = (str) =>
    str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const toCamelCase = (str) =>
    str.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

async function fetchProblemMetadata(url) {
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

function extractTestCasesFromHTML(html) {
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

function generateTestBoilerplate(testCases) {
    return `

const tests = ${JSON.stringify(testCases, null, 2)};

import deepEqual from 'deep-eql';

for (const test of tests) {
    const result = merge(...Object.values(test.input));
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

async function main() {
    const url = await prompt('Enter LeetCode problem URL: ');
    const metadata = await fetchProblemMetadata(url);
    const kebabName = toKebabCase(metadata.title);
    const testCases = extractTestCasesFromHTML(metadata.descriptionHtml);

    console.dir(testCases, { depth: null });

    const categories = fs
        .readdirSync(BASE_PATH, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);

    console.log('\nAvailable Categories:');
    categories.forEach((cat, idx) => console.log(`${idx + 1}. ${cat}`));

    const categoryInput = await prompt('\nSelect category by number: ');
    const category = categories[parseInt(categoryInput) - 1];

    const targetDir = path.join(BASE_PATH, category, kebabName);
    const indexFile = path.join(targetDir, 'index.js');

    if (fs.existsSync(indexFile)) {
        console.error('❌ Problem already exists.');
        process.exit(1);
    }

    fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(indexFile, metadata.functionCode);
    fs.writeFileSync(indexFile, generateTestBoilerplate(testCases), {
        flag: 'a',
    });

    fs.writeFileSync(
        path.join(targetDir, 'README.md'),
        `# ${metadata.title}\n\nDifficulty: ${metadata.difficulty}\n\n## Description\n${metadata.descriptionHtml}`
    );

    console.log(`\n✅ Created:`);
    console.log(`- ${indexFile}`);
}

main();
