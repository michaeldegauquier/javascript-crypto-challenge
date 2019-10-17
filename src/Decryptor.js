const nacl = require('libsodium-wrappers')

async function init() {
    await nacl.ready
}

var cryptedKey

module.exports = {
    decrypt: async function (ciphertext, nonce) {
        await init()
        var decryptedKey

        if (cryptedKey == null) {
            throw "no key"
        }
        else {
            decryptedKey = nacl.crypto_secretbox_open_easy(ciphertext, nonce, cryptedKey)
        }

        return decryptedKey
    },

    setKey: async function (key) {
        cryptedKey = key
    }
}