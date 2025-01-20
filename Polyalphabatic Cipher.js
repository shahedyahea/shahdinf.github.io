const Polyalphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateKey(text, key) {
    const adjustedKey = key.toUpperCase();
    let extendedKey = "";
    let keyIndex = 0;

    for (const char of text.toUpperCase()) {
        if (Polyalphabet.includes(char)) {
            extendedKey += adjustedKey[keyIndex % adjustedKey.length];
            keyIndex++;
        } else {
            extendedKey += char; // Non-alphabetic characters remain as-is
        }
    }

    return extendedKey;
}

function encrypt(text, key) {
    const extendedKey = generateKey(text, key);

    return text
        .toUpperCase()
        .split("")
        .map((char, index) => {
            const textIndex = Polyalphabet.indexOf(char);
            const keyIndex = Polyalphabet.indexOf(extendedKey[index]);

            if (textIndex !== -1) {
                return Polyalphabet[(textIndex + keyIndex) % Polyalphabet.length];
            } else {
                return char; // Non-alphabetic characters remain as-is
            }
        })
        .join("");
}

function decrypt(text, key) {
    const extendedKey = generateKey(text, key);

    return text
        .toUpperCase()
        .split("")
        .map((char, index) => {
            const textIndex = Polyalphabet.indexOf(char);
            const keyIndex = Polyalphabet.indexOf(extendedKey[index]);

            if (textIndex !== -1) {
                return Polyalphabet[(textIndex - keyIndex + Polyalphabet.length) % Polyalphabet.length];
            } else {
                return char; // Non-alphabetic characters remain as-is
            }
        })
        .join("");
}

document.getElementById("encryptBtn").addEventListener("click", function() {
    const CurrentText = document.getElementById("textInput").value;
    let input = prompt("Enter the key: ");
    const encryptedText = encrypt(CurrentText, input);
    document.getElementById("outputArea").innerText = encryptedText;
});

document.getElementById("decryptBtn").addEventListener("click", function() {
    const CurrentText = document.getElementById("textInput").value;
    let input = prompt("Enter the key: ");
    const decryptedText = decrypt(CurrentText, input);
    document.getElementById("outputArea").innerText = decryptedText;
});
