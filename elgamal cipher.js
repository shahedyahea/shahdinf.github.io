function generateKeys(p, g) {
    const privateKey = Math.floor(Math.random() * (p - 2)) + 1;
    const publicKey = modExp(g, privateKey, p);

    return { privateKey, publicKey, p, g };
}

function encryptElGamal(message, publicKey, g, p) {
    // Generate random integer k
    const k = Math.floor(Math.random() * (p - 2)) + 1;
    const c1 = modExp(g, k, p);
    const sharedSecret = modExp(publicKey, k, p);
    const c2 = (message * sharedSecret) % p;

    return { c1, c2 };
}

function decryptElGamal(cipher, privateKey, p) {
    const { c1, c2 } = cipher;
    const sharedSecret = modExp(c1, privateKey, p);
    const sharedSecretInverse = modInverse(sharedSecret, p);
    const decryptedMessage = (c2 * sharedSecretInverse) % p;

    return decryptedMessage;
}

function modExp(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

function modInverse(a, m) {
    const m0 = m;
    let y = 0, x = 1;

    if (m === 1) return 0;

    while (a > 1) {
        const q = Math.floor(a / m);
        let t = m;

        m = a % m;
        a = t;
        t = y;

        y = x - q * y;
        x = t;
    }

    if (x < 0) x += m0;

    return x;
}




document.getElementById("encryptBtn").addEventListener("click", function () {
    const publicKey = parseInt(prompt("Enter the public key: "), 10);
    const g = parseInt(prompt("Enter g: "), 10);
    const p = parseInt(prompt("Enter p: "), 10);
    const message = parseInt(prompt("Enter the message (as a number): "), 10);

    const cipher = encryptElGamal(message, publicKey, g, p);
    document.getElementById("outputArea").innerText = `Cipher: c1 = ${cipher.c1}, c2 = ${cipher.c2}`;
});

document.getElementById("decryptBtn").addEventListener("click", function () {
    const c1 = parseInt(prompt("Enter c1: "), 10);
    const c2 = parseInt(prompt("Enter c2: "), 10);
    const privateKey = parseInt(prompt("Enter the private key: "), 10);
    const p = parseInt(prompt("Enter p: "), 10);

    const message = decryptElGamal({ c1, c2 }, privateKey, p);
    document.getElementById("outputArea").innerText = `Decrypted Message: ${message}`;
});
