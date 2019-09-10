let encrypt = require('./lib/hashTest.js')
let decrypt = require('./lib/decrypt.js')
let hashTest = require('./lib/hashTest.js')
let getHash = require('./lib/getHash.js')
let padString = require('./lib/padString.js')

module.exports = { encrypt, decrypt, hashTest, getHash, padString }

hashTest()
