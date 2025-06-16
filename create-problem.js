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

    $('strong').each((_, el) => {
        const text = $(el).text();
        if (/example/i.test(text)) {
            const block = $(el).parent().text();
            const inputs = [];
            const outputs = [];

            const matches = block.match(
                /Input:\s*([^\n]+)\n?.*?Output:\s*([^\n]+)/i
            );
            if (matches) {
                inputs.push(matches[1].trim());
                outputs.push(matches[2].trim());
                testCases.push({
                    input: inputs.join(','),
                    expected: outputs.join(','),
                });
            }
        }
    });

    return testCases;
}

function formatTestFile(functionName, cases) {
    return `const { ${functionName} } = require('./index');

describe('${functionName}', () => {
${cases
    .map(
        (c, i) => `  it('Example ${i + 1}', () => {
    expect(${functionName}(${c.input})).toEqual(${c.expected});
  });`
    )
    .join('\n')}
});
`;
}

async function main() {
    const url = await prompt('Enter LeetCode problem URL: ');
    const metadata = await fetchProblemMetadata(url);
    const kebabName = toKebabCase(metadata.title);
    const camelName = toCamelCase(metadata.title);
    const testCases = extractTestCasesFromHTML(metadata.descriptionHtml);

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
    const testFile = path.join(targetDir, 'test.js');

    if (fs.existsSync(indexFile)) {
        console.error('❌ Problem already exists.');
        process.exit(1);
    }

    fs.mkdirSync(targetDir, { recursive: true });

    fs.writeFileSync(indexFile, metadata.functionCode);
    fs.writeFileSync(testFile, formatTestFile(camelName, testCases));

    console.log(`\n✅ Created:`);
    console.log(`- ${indexFile}`);
    console.log(`- ${testFile}`);
}

main();
