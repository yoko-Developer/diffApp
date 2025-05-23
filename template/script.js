function compareTexts() {
    const linesA = document.getElementById("textA").value.trim().split("\n").map(l => l.trim());
    const linesB = document.getElementById("textB").value.trim().split("\n").map(l => l.trim());

    let result = "";
    let correct = 0;
    let wrong = 0;

    for (let i = 0; i < linesA.length; i++) {
        const lineA = linesA[i];
        let matched = false;

        for (let j = 0; j < linesB.length; j++) {
            const lineB = linesB[j];
            if (lineA.includes(lineB) && lineB !== "") {
                matched = true;
                break;
            }
        }

        if (matched) {
            result += `〇 ${lineA}\n`;
            correct++;
        } else {
            result += `☓ <span style="background-color:pink;">${lineA}</span>\n`;
            wrong++;
        }
    }

    const total = correct + wrong;

    const stats = `<div style="margin-top:10px; font-weight:bold;">
        ✅ 一致行: ${correct}　❌ 不一致行: ${wrong}　📄 全体: ${total}
    </div>`;

    document.getElementById("result").innerHTML = result.replace(/\n/g, "<br>") + stats;
}
