/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  function getTemplates(word) {
    const result = [];
    for (let i = 0; i < word.length; i++) {
      result.push(`${word.slice(0, i)}*${word.slice(i + 1)}`);
    }
    return result;
  }

  const wordToTemplateMap = new Map();
  const templateToWordsMap = new Map();

  function processWord(word) {
    const templates = getTemplates(word);
    wordToTemplateMap.set(word, templates);

    for (const template of templates) {
      const words = templateToWordsMap.get(template) || new Set();
      words.add(word);
      templateToWordsMap.set(template, words);
    }
  }

  processWord(beginWord);
  for (const word of wordList) {
    processWord(word);
  }

  let result = 1;
  const visited = new Set();

  function bfs(level) {
    if (level.size === 0) {
      return 0;
    }

    const nextLevel = new Set();

    for (const node of level) {
      visited.add(node);
      const templates = wordToTemplateMap.get(node);

      for (const template of templates) {
        const nextWords = templateToWordsMap.get(template);
        for (const nextWord of nextWords) {
          if (nextWord === endWord) {
            return result + 1;
          }

          if (visited.has(nextWord)) {
            continue;
          }

          nextLevel.add(nextWord);
        }
      }
    }

    result++;
    return bfs(nextLevel);
  }

  return bfs(new Set([beginWord]));
};

const tests = [
  {
    beginWord: "hit",
    endWord: "cog",
    wordList: ["hot", "dot", "dog", "lot", "log", "cog"],
    output: 5,
  },
];

for (const { beginWord, endWord, wordList, output } of tests) {
  const result = ladderLength(beginWord, endWord, wordList);

  console.warn({ beginWord, endWord, wordList, result, output });
}
