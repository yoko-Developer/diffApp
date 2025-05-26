function compareTexts() {
    const textA = document.getElementById("textA").value.trim();
    const textB = document.getElementById("textB").value.trim();
    const resultBody = document.getElementById("resultBody");
    resultBody.innerHTML = "";

    const wordsA = textA.split(/\s+/); // 空白で単語分割
    const wordsB = textB.split(/\s+/);

    let matchCount = 0;
    const totalWords = wordsB.length;

    // 正解リストをコピー（使われたら削除）
    const copyWordsA = [...wordsA];

    const markedWords = wordsB.map(word => {
        const matchIndex = copyWordsA.indexOf(word);
        if (matchIndex !== -1) {
            matchCount++;
            copyWordsA.splice(matchIndex, 1); // 使った単語は削除
            return word;
        } else {
            return `<span class="highlight">${word}</span>`;
        }
    });

    // 表示部分
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${markedWords.join(" ")}</td>
        <td>${textA}</td>
    `;
    resultBody.appendChild(tr);

    // 集計表示
    const resultBox = document.getElementById("matchSummary");
    resultBox.innerHTML = `一致単語数: <strong>${matchCount}</strong> / ${totalWords}`;
}
