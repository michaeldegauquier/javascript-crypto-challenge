const nacl = require('libsodium-wrappers')

async function init() {
    await nacl.ready
}

let publicKey, privateKey;

module.exports = {
    verifyingKey: async function () {
        await init()
        if (privateKey == null) {
            let keyPair = nacl.crypto_sign_keypair()

            privateKey = keyPair.privateKey
            publicKey = keyPair.publicKey
        }
        return publicKey
    },

    sign: async function (msg) {
        return nacl.crypto_sign(msg, privateKey)
    }
}


