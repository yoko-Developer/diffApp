function compareTexts() {
    const textA = document.getElementById("textA").value.trim().split("\n");
    const textB = document.getElementById("textB").value.trim().split("\n");
    const resultBody = document.getElementById("resultBody");
    resultBody.innerHTML = "";

    const keywords = ["200%", "250%"];
    const maxLength = Math.max(textA.length, textB.length);

    for (let i = 0; i < maxLength; i++) {
        const a = textA[i] || "";
        const b = textB[i] || "";

        const isMatch = keywords.some(keyword =>
            a.includes(keyword) && b.includes(keyword)
        );

        const mark = isMatch ? "〇" : "☓";

        const escapeHTML = str =>
            str.replace(/[&<>"']/g, m => ({
                "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
            }[m]));

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="${isMatch ? 'match' : 'mismatch'}">${escapeHTML(b)}</td>
            <td>${mark} ${escapeHTML(a)}</td>
        `;
        resultBody.appendChild(tr);
    }
}
