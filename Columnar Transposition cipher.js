function encryptColumnar(text, key) {
    const sanitizedText = text.replace(/\s+/g, "").toUpperCase();
    const sanitizedKey = key.toUpperCase();
    const keyLength = sanitizedKey.length;
    const columns = Array.from({ length: keyLength }, () => []);
    for (let i = 0; i < sanitizedText.length; i++) {
        columns[i % keyLength].push(sanitizedText[i]);
    }
    const sortedKeyOrder = sanitizedKey
        .split("")
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(({ index }) => index);
    let encryptedText = "";
    for (const colIndex of sortedKeyOrder) {
        encryptedText += columns[colIndex].join("");
    }

    return encryptedText;
}

function decryptColumnar(text, key) {
    const sanitizedKey = key.toUpperCase();
    const keyLength = sanitizedKey.length;
    const numRows = Math.ceil(text.length / keyLength);
    const columns = Array.from({ length: keyLength }, () => []);
    const columnLengths = Array(keyLength).fill(numRows);
    const remainder = text.length % keyLength;
    for (let i = remainder; i < keyLength; i++) {
        columnLengths[i]--;
    }
    const sortedKeyOrder = sanitizedKey
        .split("")
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(({ index }) => index);
    let textIndex = 0;
    for (const colIndex of sortedKeyOrder) {
        for (let j = 0; j < columnLengths[colIndex]; j++) {
            columns[colIndex].push(text[textIndex++]);
        }
    }
    let decryptedText = "";
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < keyLength; j++) {
            if (columns[j][i]) {
                decryptedText += columns[j][i];
            }
        }
    }

    return decryptedText;
}

document.getElementById("encryptBtn").addEventListener("click", function () {
    const CurrentText = document.getElementById("textInput").value;
    let input = prompt("Enter the key: ");
    const encryptedText = encryptColumnar(CurrentText, input);
    document.getElementById("outputArea").innerText = encryptedText;
});

document.getElementById("decryptBtn").addEventListener("click", function () {
    const CurrentText = document.getElementById("textInput").value;
    let input = prompt("Enter the key: ");
    const decryptedText = decryptColumnar(CurrentText, input);
    document.getElementById("outputArea").innerText = decryptedText;
});
