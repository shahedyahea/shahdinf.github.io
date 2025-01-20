//Generated it suing chat gpt because it's diffucult to replicate. 

const P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
const P8 = [6, 3, 7, 4, 8, 5, 10, 9];
const P4 = [2, 4, 3, 1];
const IP = [2, 6, 3, 1, 4, 8, 5, 7];
const IP_INV = [4, 1, 3, 5, 7, 2, 8, 6];
const EP = [4, 1, 2, 3, 2, 3, 4, 1];

const S0 = [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 3, 2]
];
const S1 = [
    [0, 1, 2, 3],
    [2, 0, 1, 3],
    [3, 0, 1, 0],
    [2, 1, 0, 3]
];

function permute(input, table) {
    return table.map(pos => input[pos - 1]).join('');
}

function leftShift(bits, n) {
    return bits.slice(n) + bits.slice(0, n);
}

function xor(bits1, bits2) {
    return bits1.split('').map((bit, i) => (bit === bits2[i] ? '0' : '1')).join('');
}

function sBox(input, sbox) {
    const row = parseInt(input[0] + input[3], 2);
    const col = parseInt(input[1] + input[2], 2);
    const value = sbox[row][col];
    return value.toString(2).padStart(2, '0');
}

function generateKeys(key) {
    const p10Key = permute(key, P10);
    const left = p10Key.slice(0, 5);
    const right = p10Key.slice(5);

    const left1 = leftShift(left, 1);
    const right1 = leftShift(right, 1);
    const k1 = permute(left1 + right1, P8);

    const left2 = leftShift(left1, 2);
    const right2 = leftShift(right1, 2);
    const k2 = permute(left2 + right2, P8);

    return { k1, k2 };
}

function fK(bits, subKey) {
    const left = bits.slice(0, 4);
    const right = bits.slice(4);

    const epBits = permute(right, EP);
    const xored = xor(epBits, subKey);

    const leftSBox = sBox(xored.slice(0, 4), S0);
    const rightSBox = sBox(xored.slice(4), S1);

    const p4Bits = permute(leftSBox + rightSBox, P4);
    const leftXored = xor(left, p4Bits);

    return leftXored + right;
}

function switchHalves(bits) {
    return bits.slice(4) + bits.slice(0, 4);
}

function encryptSDes(plaintext, key) {
    const keys = generateKeys(key);
    const ipBits = permute(plaintext, IP);

    const round1 = fK(ipBits, keys.k1);
    const switched = switchHalves(round1);

    const round2 = fK(switched, keys.k2);
    const ciphertext = permute(round2, IP_INV);

    return ciphertext;
}

function decryptSDes(ciphertext, key) {
    const keys = generateKeys(key);
    const ipBits = permute(ciphertext, IP);

    const round1 = fK(ipBits, keys.k2);
    const switched = switchHalves(round1);

    const round2 = fK(switched, keys.k1);
    const plaintext = permute(round2, IP_INV);

    return plaintext;
}

document.getElementById("encryptBtn").addEventListener("click", function () {
    const plaintext = prompt("Enter 8-bit plaintext: ");
    const key = prompt("Enter 10-bit key: ");
    const ciphertext = encryptSDes(plaintext, key);
    document.getElementById("outputArea").innerText = `Ciphertext: ${ciphertext}`;
});

document.getElementById("decryptBtn").addEventListener("click", function () {
    const ciphertext = prompt("Enter 8-bit ciphertext: ");
    const key = prompt("Enter 10-bit key: ");
    const plaintext = decryptSDes(ciphertext, key);
    document.getElementById("outputArea").innerText = `Plaintext: ${plaintext}`;
});
