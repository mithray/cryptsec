const crypto = require('crypto')
const argon2 = require('argon2')
const inquirer = require('inquirer')

const decryptNacl = require('./decryptNacl.js')

async function decrypt(ciphertext, key) {
    let decrypted = await decryptNacl({ ciphertext, hash: key })
    return decrypted
}

module.exports = decrypt
