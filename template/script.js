function compareTexts() {
    const correct = document.getElementById("textA").value;
    const input = document.getElementById("textB").value;

    const maxLength = Math.max(correct.length, input.length);
    let correctHighlighted = "";
    let inputHighlighted = "";

    for (let i = 0; i < maxLength; i++) {
        const cChar = correct[i] || "";
        const iChar = input[i] || "";

        if (cChar === iChar) {
            correctHighlighted += escapeHtml(cChar);
            inputHighlighted += escapeHtml(iChar);
        } else {
            correctHighlighted += `<span class="mismatch">${escapeHtml(cChar)}</span>`;
            inputHighlighted += `<span class="mismatch">${escapeHtml(iChar)}</span>`;
        }
    }

    document.getElementById("resultBody").innerHTML = `
        <tr>
            <td>${inputHighlighted}</td>
            <td>${correctHighlighted}</td>
        </tr>
    `;
}

// 安全なHTML表示用
function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
