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

        const [displayCorrect, displayInput] = isMatch
            ? [escapeHtml(correctLines[i] || ""), escapeHtml(inputLines[i] || "")]
            : diffLine(correctLines[i] || "", inputLines[i] || "");

        resultHtml += `
            <tr class="${isMatch ? 'match-row' : 'mismatch-row'}">
                <td>${displayCorrect}</td>  <!-- 左列：正解 -->
                <td>${displayInput}</td>    <!-- 右列：読取 -->
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

function diffLine(a, b) {
    const aChars = [...a];
    const bChars = [...b];
    const m = aChars.length;
    const n = bChars.length;

    // DPテーブルを作成
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (aChars[i] === bChars[j]) {
                dp[i + 1][j + 1] = dp[i][j] + 1;
            } else {
                dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
            }
        }
    }

    // 後ろから復元しながら差分判定
    let i = m, j = n;
    let resultA = "";
    let resultB = "";

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && aChars[i - 1] === bChars[j - 1]) {
            const c = escapeHtml(aChars[i - 1]);
            resultA = c + resultA;
            resultB = c + resultB;
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            resultA = `<span class="diff-highlight"></span>` + resultA;
            resultB = `<span class="diff-highlight">${escapeHtml(bChars[j - 1])}</span>` + resultB;
            j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
            resultA = `<span class="diff-highlight">${escapeHtml(aChars[i - 1])}</span>` + resultA;
            resultB = `<span class="diff-highlight"></span>` + resultB;
            i--;
        }
    }

    return [resultA, resultB];
}
