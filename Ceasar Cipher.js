const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function encrypt(text, shift) {
    return text
        .toUpperCase()
        .split("")
        .map(char => {
            const index = alphabet.indexOf(char);
            if (index !== -1) {
                return alphabet[(index + shift) % alphabet.length];
            } else {
                return char;
            }
        })
        .join("");
}
function decrypt(text, shift) {
    return text
        .toUpperCase()
        .split("")
        .map(char => {
            const index = alphabet.indexOf(char);
            if (index !== -1) {
                return alphabet[(index - shift + alphabet.length) % alphabet.length];
            } else {
                return char;
            }
        })
        .join("");
}

document.getElementById("encryptBtn").addEventListener("click", function() {
    const CurrentText = document.getElementById("textInput").value;
    let input = parseInt(prompt("Enter the shift value: "), 10);
    const encryptedText = encrypt(CurrentText, input);
    document.getElementById("outputArea").innerText = encryptedText;
})

document.getElementById("decryptBtn").addEventListener("click", function() {
    const CurrentText = document.getElementById("textInput").value;
    let input = parseInt(prompt("Enter the shift value: "), 10);
    const decryptedText = decrypt(CurrentText, input);
    document.getElementById("outputArea").innerText = decryptedText;
})