const secretbox = require('tweetnacl').secretbox
const randomBytes = require('tweetnacl').randomBytes
const decodeUTF8 = require('tweetnacl-util').decodeUTF8
const encodeUTF8 = require('tweetnacl-util').encodeUTF8
const encodeBase64 = require('tweetnacl-util').encodeBase64
const decodeBase64 = require('tweetnacl-util').decodeBase64

const newNonce = () => randomBytes(box.nonceLength)
const generateKeyPair = () => box.keyPair()

function encrypt(secretOrSharedKey Uint8Array, json: any, key?: Uint8Array) {
    const nonce = newNonce()
    const messageUint8 = decodeUTF8(JSON.stringify(json))
    const encrypted = key
        ? box(messageUint8, nonce, key, secretOrSharedKey)
        : box.after(messageUint8, nonce, secretOrSharedKey)

    const fullMessage = new Uint8Array(nonce.length + encrypted.length)
    fullMessage.set(nonce)
    fullMessage.set(encrypted, nonce.length)

    const base64FullMessage = encodeBase64(fullMessage)
    return base64FullMessage
}

function decrypt(
    secretOrSharedKey: Uint8Array,
    messageWithNonce: string,
    key?: Uint8Array
) {
    const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce)
    const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength)
    const message = messageWithNonceAsUint8Array.slice(
        box.nonceLength,
        messageWithNonce.length
    )

    const decrypted = key
        ? box.open(message, nonce, key, secretOrSharedKey)
        : box.open.after(message, nonce, secretOrSharedKey)

    if (!decrypted) {
        throw new Error('Could not decrypt message')
    }

    const base64DecryptedMessage = encodeUTF8(decrypted)
    return JSON.parse(base64DecryptedMessage)
}

const obj = { hello: 'world' }
const pairA = generateKeyPair()
const pairB = generateKeyPair()
const sharedA = box.before(pairB.publicKey, pairA.secretKey)
const sharedB = box.before(pairA.publicKey, pairB.secretKey)
const encrypted = encrypt(sharedA, obj)
const decrypted = decrypt(sharedB, encrypted)
console.log(obj, encrypted, decrypted)
