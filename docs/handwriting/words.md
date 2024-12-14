# 出现频率最多的单词

```javascript
function findMostFrequentWord(text) {
  // 小写
  text = text.toLowerCase();

  // 正则将文本拆分成单词
  const words = text.match(/\b\w+\b/g);

  const wordCount = {};

  words.forEach((word) => {
    if (wordCount[word]) {
      wordCount[word] += 1;
    } else {
      wordCount[word] = 1;
    }
  });

  let maxCount = 0;
  let mostFrequentWord = "";

  for (const word in wordCount) {
    if (wordCount[word] > maxCount) {
      maxCount = wordCount[word];
      mostFrequentWord = word;
    }
  }

  return mostFrequentWord;
}
```
