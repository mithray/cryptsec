const crypto = require('crypto')
const padString = require('./padString.js')
const nacl = require('tweetnacl')
//const encryptAes = require('./encryptAes.js')
const encryptNacl = require('./encryptNacl.js')

async function encrypt(plaintext, key, algorithm = 'tweetnacl') {
    let ciphertext = ''
    ///    if (algorithm === 'aes-256-xts') ciphertext = encryptAes(plaintext, key)
    if (algorithm === 'tweetnacl')
        ciphertext = await encryptNacl({ plaintext, hash: key })
    return ciphertext
}

module.exports = encrypt
