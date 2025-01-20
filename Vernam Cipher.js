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
    return text
        .toUpperCase()
        .split("")
        .map((char, index) => {
            const textIndex = alphabet.indexOf(char);
            const keyIndex = alphabet.indexOf(key[index]);

            if (textIndex !== -1 && keyIndex !== -1) {
                return alphabet[(textIndex + keyIndex) % alphabet.length];
            } else {
                return char;
            }
        })
        .join("");
}
function decrypt(text, key) {
    return text
        .toUpperCase()
        .split("")
        .map((char, index) => {
            const textIndex = alphabet.indexOf(char);
            const keyIndex = alphabet.indexOf(key[index]);

            if (textIndex !== -1 && keyIndex !== -1) {
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