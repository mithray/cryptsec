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
    //  log.info('Creating Key Pair')
    key = new TextEncoder('utf-8').encode(key)
    let pair = box.keyPair.fromSecretKey(key)
    return pair
}
async function getKeys(params) {
    //    log.info('Getting Keys')
    var keyPair = {}
    if (params.publicKey && params.secretKey) {
        keyPair.publicKey = params.publicKey
        keyPain.secretKey = params.secretKey
    } else {
        keyPair = await createKeyPair(params.hash)
    }
    return keyPair
}

async function decryptNacl(params) {
    // params can include ciphertext, publicKey, secretKey, hash
    ciphertextWithNonceUint8Array = decodeBase64(params.ciphertext)
    const keyPair = await getKeys(params)
    const nonce = ciphertextWithNonceUint8Array.slice(0, box.nonceLength)
    const message = ciphertextWithNonceUint8Array.slice(
        box.nonceLength,
        params.ciphertext.length
    )

    let decrypted = await nacl.box.open(
        message,
        nonce,
        keyPair.publicKey,
        keyPair.secretKey
    )
    decrypted = encodeUTF8(decrypted)
    return decrypted
}
module.exports = decryptNacl
