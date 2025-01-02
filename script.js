// Caesar Cipher Function
function caesarCipher(text, shift, mode) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let char of text) {
        const lowerChar = char.toLowerCase();
        if (alphabet.includes(lowerChar)) {
            const oldIndex = alphabet.indexOf(lowerChar);
            const newIndex = mode === 'encrypt'
                ? (oldIndex + shift) % 26
                : (oldIndex - shift + 26) % 26;
            result += char === lowerChar
                ? alphabet[newIndex]
                : alphabet[newIndex].toUpperCase();
        } else {
            result += char;
        }
    }
    return result;
}

// Vernam Cipher Function
function vernamCipher(text, key, mode) {
    if (text.length !== key.length) {
        return 'Key must be the same length as the text!';
    }
    let result = '';
    for (let i = 0; i < text.length; i++) {
        const textChar = text.charCodeAt(i);
        const keyChar = key.charCodeAt(i);
        const xorChar = textChar ^ keyChar; // XOR operation
        result += String.fromCharCode(xorChar);
    }
    return result;
}

// Vigenere Cipher Function
function vigenereCipher(text, key, mode) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    key = key.toLowerCase();
    let keyIndex = 0;

    for (let char of text) {
        const lowerChar = char.toLowerCase();
        if (alphabet.includes(lowerChar)) {
            const textIndex = alphabet.indexOf(lowerChar);
            const keyShift = alphabet.indexOf(key[keyIndex]);
            const newIndex = mode === 'encrypt'
                ? (textIndex + keyShift) % 26
                : (textIndex - keyShift + 26) % 26;
            result += char === lowerChar
                ? alphabet[newIndex]
                : alphabet[newIndex].toUpperCase();
            keyIndex = (keyIndex + 1) % key.length;
        } else {
            result += char;
        }
    }
    return result;
}

// DOM Elements
const textInput = document.getElementById('textInput');
const algorithmSelect = document.getElementById('algorithm');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const outputArea = document.getElementById('outputArea');

// Event Listeners
encryptBtn.addEventListener('click', () => {
    const text = textInput.value;
    const algorithm = algorithmSelect.value;

    if (algorithm === 'caesar') {
        outputArea.textContent = caesarCipher(text, 3, 'encrypt');
    } else if (algorithm === 'vernam') {
        const key = prompt('Enter a key of the same length as the text:');
        outputArea.textContent = vernamCipher(text, key, 'encrypt');
    } else if (algorithm === 'vigenere') {
        const key = prompt('Enter a key (text):');
        outputArea.textContent = vigenereCipher(text, key, 'encrypt');
    } else {
        outputArea.textContent = 'Unsupported algorithm!';
    }
});

decryptBtn.addEventListener('click', () => {
    const text = textInput.value;
    const algorithm = algorithmSelect.value;

    if (algorithm === 'caesar') {
        outputArea.textContent = caesarCipher(text, 3, 'decrypt');
    } else if (algorithm === 'vernam') {
        const key = prompt('Enter the key used for encryption:');
        outputArea.textContent = vernamCipher(text, key, 'decrypt');
    } else if (algorithm === 'vigenere') {
        const key = prompt('Enter the key used for encryption:');
        outputArea.textContent = vigenereCipher(text, key, 'decrypt');
    } else {
        outputArea.textContent = 'Unsupported algorithm!';
    }
});
