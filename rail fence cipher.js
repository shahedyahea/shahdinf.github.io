function encryptRailFence(text, rails) {
    text = text.replace(/[^A-Za-z]/g, '').toUpperCase();

    let fence = [];
    for (let i = 0; i < rails; i++) {
        fence.push([]);
    }

    let currentRail = 0;
    let goingDown = false;

    for (let i = 0; i < text.length; i++) {
        fence[currentRail].push(text[i]);

        if (currentRail === 0 || currentRail === rails - 1) {
            goingDown = !goingDown;
        }

        currentRail += goingDown ? 1 : -1;
    }

    let encryptedText = '';
    for (let i = 0; i < rails; i++) {
        encryptedText += fence[i].join('');
    }

    return encryptedText;
}
function decryptRailFence(ciphertext, rails) {
    let fence = [];
    for (let i = 0; i < rails; i++) {
        fence.push([]);
    }

    let currentRail = 0;
    let goingDown = false;

    let cipherIndex = 0;
    for (let i = 0; i < ciphertext.length; i++) {
        fence[currentRail].push(null);

        if (currentRail === 0 || currentRail === rails - 1) {
            goingDown = !goingDown;
        }

        currentRail += goingDown ? 1 : -1;
    }

    for (let i = 0; i < rails; i++) {
        for (let j = 0; j < fence[i].length; j++) {
            if (fence[i][j] === null) {
                fence[i][j] = ciphertext[cipherIndex++];
            }
        }
    }

    let decryptedText = '';
    currentRail = 0;
    goingDown = false;
    for (let i = 0; i < ciphertext.length; i++) {
        decryptedText += fence[currentRail].shift();

        if (currentRail === 0 || currentRail === rails - 1) {
            goingDown = !goingDown;
        }

        currentRail += goingDown ? 1 : -1;
    }

    return decryptedText;
}

document.getElementById("encryptBtn").addEventListener("click", function() {
    const currentText = document.getElementById("textInput").value;
    let input = parseInt(prompt("Enter the number of rails: "));
    const encryptedText = encryptRailFence(currentText, input);
    document.getElementById("outputArea").innerText = encryptedText;
});

document.getElementById("decryptBtn").addEventListener("click", function() {
    const currentText = document.getElementById("textInput").value;
    let input = parseInt(prompt("Enter the number of rails: "));
    const decryptedText = decryptRailFence(currentText, input);
    document.getElementById("outputArea").innerText = decryptedText;
});
