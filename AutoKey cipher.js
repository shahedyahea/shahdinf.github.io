const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateRandomKey(length) {
    let key = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        key += alphabet[randomIndex];
    }
    return key;
}

function encrypt(text, key) {
    text = text.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    
    let cipherText = "";
    let extendedKey = key + text; 
    
    for (let i = 0; i < text.length; i++) {
        const textIndex = alphabet.indexOf(text[i]);
        const keyIndex = alphabet.indexOf(extendedKey[i]);

        if (textIndex !== -1 && keyIndex !== -1) {
            cipherText += alphabet[(textIndex + keyIndex) % alphabet.length];
        } else {
            cipherText += text[i];
        }
    }

    return cipherText;
}

function decrypt(text, key) {
    text = text.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    let decryptedText = "";
    let extendedKey = key;

    for (let i = 0; i < text.length; i++) {
        const textIndex = alphabet.indexOf(text[i]);
        const keyIndex = alphabet.indexOf(extendedKey[i]);

        if (textIndex !== -1 && keyIndex !== -1) {
            decryptedText += alphabet[(textIndex - keyIndex + alphabet.length) % alphabet.length];
            extendedKey += decryptedText[i];
        } else {
            decryptedText += text[i];
        }
    }

    return decryptedText;
}

document.getElementById("encryptBtn").addEventListener("click", function() {
    const currentText = document.getElementById("textInput").value;
    let input = prompt("Enter the Key value: ");
    const encryptedText = encrypt(currentText, input);
    document.getElementById("outputArea").innerText = encryptedText;
});

document.getElementById("decryptBtn").addEventListener("click", function() {
    const currentText = document.getElementById("textInput").value;
    let input = prompt("Enter the Key value: ");
    const decryptedText = decrypt(currentText, input);
    document.getElementById("outputArea").innerText = decryptedText;
});
