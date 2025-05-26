function compareTexts() {
    const correct = document.getElementById("textA").value;
    const input = document.getElementById("textB").value;

    const maxLength = Math.max(correct.length, input.length);
    let correctHighlighted = "";
    let inputHighlighted = "";
    let mismatchCount = 0;

    for (let i = 0; i < maxLength; i++) {
        const cChar = correct[i] || "";
        const iChar = input[i] || "";

        if (cChar === iChar) {
            correctHighlighted += escapeHtml(cChar);
            inputHighlighted += escapeHtml(iChar);
        } else {
            correctHighlighted += `<span class="mismatch">${escapeHtml(cChar)}</span>`;
            inputHighlighted += `<span class="mismatch">${escapeHtml(iChar)}</span>`;
            mismatchCount++;
        }
    }

    document.getElementById("resultBody").innerHTML = `
        <tr>
            <td>${inputHighlighted}</td>
            <td>${correctHighlighted}</td>
        </tr>
    `;

    // カウント表示
    document.getElementById("matchSummary").innerHTML = `
        <strong>全文字数：</strong> ${maxLength}
        <strong>間違いの数：</strong> ${mismatchCount}
    `;
}

// 安全なHTML表示用
function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
