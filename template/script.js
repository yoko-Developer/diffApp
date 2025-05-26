function compareTexts() {
    const correct = document.getElementById("textA").value.split("\n");
    const submitted = document.getElementById("textB").value.split("\n");
    const maxLines = Math.max(correct.length, submitted.length);

    let resultHtml = "";
    let matchCount = 0;

    for (let i = 0; i < maxLines; i++) {
        const aLine = correct[i] || "";
        const bLine = submitted[i] || "";

        let aClass = "", bClass = "";

        if (aLine === bLine) {
            aClass = bClass = "match";
            matchCount++;
        } else {
            aClass = bClass = "mismatch";
        }

        resultHtml += `
            <tr>
                <td class="${bClass}">${escapeHtml(bLine)}</td>
                <td class="${aClass}">${escapeHtml(aLine)}</td>
            </tr>
        `;
    }

    document.getElementById("resultBody").innerHTML = resultHtml;
    document.getElementById("matchSummary").textContent = `一致した行: ${matchCount} / ${maxLines}`;
}

// 安全なHTML表示用
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
