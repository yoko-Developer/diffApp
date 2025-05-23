function compareTexts() {
    const textA = document.getElementById("textA").value.split("\n");
    const textB = document.getElementById("textB").value.split("\n");
    const maxLines = Math.max(textA.length, textB.length);
    let result = "";
    let correct = 0;
    let wrong = 0;

    for (let i = 0; i < maxLines; i++) {
        const lineA = textA[i] || "";
        const lineB = textB[i] || "";

        if (lineA === lineB) {
            result += `〇 ${lineB}\n`;
            correct++;
        } else {
            result += `☓ <span style="background-color:pink;">${lineB}</span>\n`;
            wrong++;
        }
    }

    const stats = `<div style="margin-top:10px; font-weight:bold;">
        ✅ 一致行: ${correct}　❌ 不一致行: ${wrong}
    </div>`;

    // innerHTML にするため、改行を <br> に変換
    document.getElementById("result").innerHTML = result.replace(/\n/g, "<br>") + stats;
}
