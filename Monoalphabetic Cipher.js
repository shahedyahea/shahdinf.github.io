const Monoalphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MonosubstitutionKey = "QWERTYUIOPLKJHGFDSAZXCVBNM";
function encrypt(text) {
    return text
        .toUpperCase()
        .split("")
        .map(char => {
            const index = Monoalphabet.indexOf(char);
            return index !== -1 ? MonosubstitutionKey[index] : char;
        })
        .join("");
}
function decrypt(text) {
    return text
        .toUpperCase()
        .split("")
        .map(char => {
            const index = MonosubstitutionKey.indexOf(char);
            return index !== -1 ? Monoalphabet[index] : char;
        })
        .join("");
}

document.getElementById("encryptBtn").addEventListener("click", function() {
    const CurrentText = document.getElementById("textInput").value;
    const encryptedText = encrypt(CurrentText);
    document.getElementById("outputArea").innerText = encryptedText;
  })

  
document.getElementById("decryptBtn").addEventListener("click", function() {
    const CurrentText = document.getElementById("textInput").value;
    const decryptedText = decrypt(CurrentText);
    document.getElementById("outputArea").innerText = decryptedText;
  })