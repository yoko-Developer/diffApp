function compareTexts() {
    const textA = document.getElementById("textA").value;
    const textB = document.getElementById("textB").value;
    const maxLength = Math.max(textA.length, textB.length);
    let result = "";

    for (let i = 0; i < maxLength; i++) {
        const charA = textA[i] || "";
        const charB = textB[i] || "";

        if (charA === charB) {
            result += charA;
        } else {
            result += `<span style="background-color:pink;">${charB || " "}</span>`;
        }
    }

    document.getElementById("result").innerHTML = result;
}
