#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
    extractTestCasesFromHTML,
    fetchProblemMetadata,
    parseFunctionName,
    toKebabCase,
    prompt,
    generateTestBoilerplate,
    createProblemFolderAndFiles,
} from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_PATH = path.join(__dirname, '../neetcode');

async function main() {
    const url = await prompt('Enter LeetCode problem URL: ');
    const metadata = await fetchProblemMetadata(url);
    const kebabName = toKebabCase(metadata.title);
    const testCases = extractTestCasesFromHTML(metadata.descriptionHtml);
    const functionName = parseFunctionName(metadata.functionCode);
    if (!functionName) {
        console.error('❌ Could not parse function name from code snippet.');
    }

    const categories = fs
        .readdirSync(BASE_PATH, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);

    console.log('\nAvailable Categories:');
    categories.forEach((cat, idx) => console.log(`${idx + 1}. ${cat}`));

    const categoryInput = await prompt('\nSelect category by number: ');
    const category = categories[parseInt(categoryInput) - 1];

    const targetDir = path.join(BASE_PATH, category, kebabName);

    const indexFileContent =
        metadata.functionCode +
        generateTestBoilerplate(testCases, functionName);

    const readmeFileContent = `# ${metadata.title}\n\nDifficulty: ${metadata.difficulty}\n\n## Description\n${metadata.descriptionHtml}`;

    createProblemFolderAndFiles({
        targetDir,
        indexFileContent,
        readmeFileContent,
    });
}

main();
