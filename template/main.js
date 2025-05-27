function compareTexts() {
    const correctText = document.getElementById("textA").value;
    const inputText = document.getElementById("textB").value;

    // 行ごとに分割し、空行は除去
    const correctLines = correctText.split(/\r?\n+/).map(l => l.trim()).filter(l => l !== "");
    const inputLines = inputText.split(/\r?\n+/).map(l => l.trim()).filter(l => l !== "");

    const maxLines = Math.max(correctLines.length, inputLines.length);

    let correctLineCount = 0;
    let resultHtml = "";

    for (let i = 0; i < maxLines; i++) {
        const inputLine = normalizeLine(inputLines[i] || "");
        const correctLine = normalizeLine(correctLines[i] || "");

        const isMatch = inputLine === correctLine;
        if (isMatch) correctLineCount++;

        resultHtml += `
            <tr class="${isMatch ? 'match-row' : 'mismatch-row'}">
                <td>${escapeHtml(inputLines[i] || "")}</td>
                <td>${escapeHtml(correctLines[i] || "")}</td>
                <td style="text-align:center;">${isMatch ? "〇" : "×"}</td>
            </tr>
        `;
    }

    document.getElementById("resultBody").innerHTML = resultHtml;
    document.getElementById("matchSummary").innerHTML = `
        <strong>一致行数：</strong> ${correctLineCount} / ${maxLines}
        <strong>一致率：</strong> ${(correctLineCount / maxLines * 100).toFixed(1)}%
    `;
}

function normalizeLine(text) {
    return text
        .replace(/　/g, "")     // 全角スペースを削除
        .replace(/\s+/g, "")    // 半角スペース・改行・タブなどを全て削除
        .trim();
}

function escapeHtml(str) {
    if (!str) return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
