/*
const nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')
const getHash = require('./index.js').getHash
const box = nacl.box
const randomBytes = nacl.randomBytes
const decodeUTF8 = nacl.util.decodeUTF8
const encodeUTF8 = nacl.util.encodeUTF8
const encodeBase64 = nacl.util.encodeBase64
const decodeBase64 = nacl.util.decodeBase64
const log = require('../logger')
const log = Log()
function newNonce() {
    return randomBytes(box.nonceLength)
}
async function createKeyPair(key) {
    log.info('Creating Key Pair')
    key = new TextEncoder('utf-8').encode(key)
    let pair = box.keyPair.fromSecretKey(key)
    return pair
}
async function getKeys(params) {
    log.info('Getting Keys')
    var keyPair = {}
    if (params.publicKey && params.secretKey) {
        keyPair.publicKey = params.publicKey
        keyPain.secretKey = params.secretKey
    } else {
        keyPair = await createKeyPair(params.hash)
    }
    return keyPair
}
async function encrypt(params) {
    // params can contain plaintext, publicKey, secretKey, hash
    log.info('Encrypting...')
    const nonce = newNonce()
    const keyPair = await getKeys(params)
    if (!plaintext) {
        console.log('must include plaintext!')
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
async function decrypt(params) {
    // params can include ciphertext, publicKey, secretKey, hash
    log.info('Decrypting...')
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
async function encryptDecrypt(plaintext) {
    log.info('Starting encryptDecrypt')
    log.info('Hashing password')
    let key = await getHash(password)
    log.info('Password Hashed')
    log.info(`Hash is **${key}**`)
    log.verbose(`some probably unimportant information about **cats** lol`)
    let ciphertext = await encrypt({ plaintext, hash: key })
    log.success('ciphertext')
    log.info(ciphertext)
    let decrypted = await decrypt({ ciphertext, hash: key })

    return decrypted
}

let password = 'abc'
let key = ''
let plaintext = 'message hereu'

encryptDecrypt(plaintext).then(res => {
    console.log(res)
})
*/
