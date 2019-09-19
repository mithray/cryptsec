const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')
const getHash = require('./getHash.js')
const box = nacl.box
const randomBytes = nacl.randomBytes
const decodeUTF8 = nacl.util.decodeUTF8
const encodeUTF8 = nacl.util.encodeUTF8
const encodeBase64 = nacl.util.encodeBase64
const decodeBase64 = nacl.util.decodeBase64

function newNonce() {
    return randomBytes(box.nonceLength)
}
async function createKeyPair(key) {
    key = new TextEncoder('utf-8').encode(key)
    let pair = box.keyPair.fromSecretKey(key)
    return pair
}
async function getKeys(params) {
    var keyPair = {}
    if (params.publicKey && params.secretKey) {
        keyPair.publicKey = params.publicKey
        keyPain.secretKey = params.secretKey
    } else {
        keyPair = await createKeyPair(params.hash)
    }
    return keyPair
}
async function encryptNacl(params) {
    // params can contain plaintext, publicKey, secretKey, hash
    const nonce = newNonce()
    const keyPair = await getKeys(params)
    if (!params.plaintext) {
        console.error('must include plaintext!')
        return
    }
    let plaintextUint8 = decodeUTF8(params.plaintext)

    let ciphertext = nacl.box(
        plaintextUint8,
        nonce,
        keyPair.publicKey,
        keyPair.secretKey
    )
    const fullMessage = new Uint8Array(nonce.length + ciphertext.length)
    fullMessage.set(nonce)
    fullMessage.set(ciphertext, nonce.length)

    ciphertext64 = encodeBase64(fullMessage)
    return ciphertext64
}
module.exports = encryptNacl
