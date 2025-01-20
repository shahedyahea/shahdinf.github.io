const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function generateKey(text, key) {
    const adjustedKey = key.toUpperCase();
    let extendedKey = "";
    let keyIndex = 0;

    for (const char of text.toUpperCase()) {
        if (alphabet.includes(char)) {
            extendedKey += adjustedKey[keyIndex % adjustedKey.length];
            keyIndex++;
        } else {
            extendedKey += char;
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
            const textIndex = alphabet.indexOf(char);
            const keyIndex = alphabet.indexOf(extendedKey[index]);

            if (textIndex !== -1) {
                return alphabet[(textIndex + keyIndex) % alphabet.length];
            } else {
                return char;
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
            const textIndex = alphabet.indexOf(char);
            const keyIndex = alphabet.indexOf(extendedKey[index]);

            if (textIndex !== -1) {
                return alphabet[(textIndex - keyIndex + alphabet.length) % alphabet.length];
            } else {
                return char;
            }
        })
        .join("");
}

document.getElementById("encryptBtn").addEventListener("click", function() {
    const CurrentText = document.getElementById("textInput").value;
    let input = prompt("Enter the Key value: ");
    const encryptedText = encrypt(CurrentText, input);
    document.getElementById("outputArea").innerText = encryptedText;
  })

  
document.getElementById("decryptBtn").addEventListener("click", function() {
    const CurrentText = document.getElementById("textInput").value;
    let input = prompt("Enter the Key value: ");
    const decryptedText = decrypt(CurrentText, input);
    document.getElementById("outputArea").innerText = decryptedText;
  })