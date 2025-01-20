const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

function createPlayfairMatrix(key) {
    key = key.toUpperCase().replace(/[^A-Z]/g, '').split('');
    let matrix = [];

    for (let char of key) {
        if (matrix.indexOf(char) === -1) {
            matrix.push(char);
        }
    }

    for (let char of alphabet) {
        if (matrix.indexOf(char) === -1) {
            matrix.push(char);
        }
    }

    let matrix2D = [];
    for (let i = 0; i < 5; i++) {
        matrix2D.push(matrix.slice(i * 5, i * 5 + 5));
    }

    return matrix2D;
}

function findPosition(char, matrix) {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === char) {
                return { row: i, col: j };
            }
        }
    }
    return null;
}

function prepareText(text) {
    text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');

    if (text.length % 2 !== 0) {
        text += 'X';
    }

    let pairs = [];
    for (let i = 0; i < text.length; i += 2) {
        pairs.push(text[i] + text[i + 1]);
    }

    return pairs;
}

function encrypt(text, key) {
    const matrix = createPlayfairMatrix(key);
    const pairs = prepareText(text);
    let encryptedText = '';

    for (let pair of pairs) {
        const first = pair[0];
        const second = pair[1];

        const firstPos = findPosition(first, matrix);
        const secondPos = findPosition(second, matrix);

        if (firstPos.row === secondPos.row) {
            encryptedText += matrix[firstPos.row][(firstPos.col + 1) % 5];
            encryptedText += matrix[secondPos.row][(secondPos.col + 1) % 5];
        }
        else if (firstPos.col === secondPos.col) {
            encryptedText += matrix[(firstPos.row + 1) % 5][firstPos.col];
            encryptedText += matrix[(secondPos.row + 1) % 5][secondPos.col];
        }
        else {
            encryptedText += matrix[firstPos.row][secondPos.col];
            encryptedText += matrix[secondPos.row][firstPos.col];
        }
    }

    return encryptedText;
}

function decrypt(text, key) {
    const matrix = createPlayfairMatrix(key);
    const pairs = prepareText(text);
    let decryptedText = '';

    for (let pair of pairs) {
        const first = pair[0];
        const second = pair[1];

        const firstPos = findPosition(first, matrix);
        const secondPos = findPosition(second, matrix);

        if (firstPos.row === secondPos.row) {
            decryptedText += matrix[firstPos.row][(firstPos.col - 1 + 5) % 5];
            decryptedText += matrix[secondPos.row][(secondPos.col - 1 + 5) % 5];
        }
        else if (firstPos.col === secondPos.col) {
            decryptedText += matrix[(firstPos.row - 1 + 5) % 5][firstPos.col];
            decryptedText += matrix[(secondPos.row - 1 + 5) % 5][secondPos.col];
        }
        else {
            decryptedText += matrix[firstPos.row][secondPos.col];
            decryptedText += matrix[secondPos.row][firstPos.col];
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
