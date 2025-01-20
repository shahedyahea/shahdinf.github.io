const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function createMatrix(key, size) {
    const matrix = [];
    let keyIndex = 0;

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const char = key[keyIndex++ % key.length].toUpperCase();
            row.push(alphabet.indexOf(char));
        }
        matrix.push(row);
    }

    return matrix;
}

function encrypt(text, key) {
    const size = Math.sqrt(key.length);
    if (!Number.isInteger(size)) {
        throw new Error("Key length must be a perfect square.");
    }

    const matrix = createMatrix(key, size);
    const paddedText = text.toUpperCase().replace(/[^A-Z]/g, '').padEnd(Math.ceil(text.length / size) * size, 'X');

    const encryptedText = [];

    for (let i = 0; i < paddedText.length; i += size) {
        const vector = paddedText.slice(i, i + size).split("").map(char => alphabet.indexOf(char));

        const encryptedVector = matrix.map(row => {
            return row.reduce((sum, value, index) => sum + value * vector[index], 0) % alphabet.length;
        });

        encryptedVector.forEach(index => {
            encryptedText.push(alphabet[index]);
        });
    }

    return encryptedText.join("");
}

function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    throw new Error("Modular inverse does not exist.");
}

function decrypt(text, key) {
    const size = Math.sqrt(key.length);
    if (!Number.isInteger(size)) {
        throw new Error("Key length must be a perfect square.");
    }

    const matrix = createMatrix(key, size);

    const determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    const determinantMod = ((determinant % alphabet.length) + alphabet.length) % alphabet.length;
    const inverseDeterminant = modInverse(determinantMod, alphabet.length);
    const adjugate = [
        [matrix[1][1], -matrix[0][1]],
        [-matrix[1][0], matrix[0][0]]
    ];
    const inverseMatrix = adjugate.map(row => row.map(value => ((value * inverseDeterminant % alphabet.length) + alphabet.length) % alphabet.length));

    const decryptedText = [];

    for (let i = 0; i < text.length; i += size) {
        const vector = text.slice(i, i + size).split("").map(char => alphabet.indexOf(char));

        const decryptedVector = inverseMatrix.map(row => {
            return row.reduce((sum, value, index) => sum + value * vector[index], 0) % alphabet.length;
        });

        decryptedVector.forEach(index => {
            decryptedText.push(alphabet[index]);
        });
    }

    return decryptedText.join("");
}

// Example UI interaction for encrypting and decrypting
document.getElementById("encryptBtn").addEventListener("click", function () {
    const CurrentText = document.getElementById("textInput").value;
    let input = prompt("Enter the Key value (length must be a perfect square): ");
    try {
        const encryptedText = encrypt(CurrentText, input);
        document.getElementById("outputArea").innerText = encryptedText;
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById("decryptBtn").addEventListener("click", function () {
    const CurrentText = document.getElementById("textInput").value;
    let input = prompt("Enter the Key value (length must be a perfect square): ");
    try {
        const decryptedText = decrypt(CurrentText, input);
        document.getElementById("outputArea").innerText = decryptedText;
    } catch (error) {
        alert(error.message);
    }
});
