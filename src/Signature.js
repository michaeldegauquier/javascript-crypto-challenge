const nacl = require('libsodium-wrappers')

async function ready() {
    await nacl.ready
}

let publicKey, privateKey;

module.exports = {
    verifyingKey: async function () {
        await ready()
        if (privateKey == null) {
            let keyPair = nacl.crypto_sign_keypair()

            privateKey = keyPair.privateKey
            publicKey = keyPair.publicKey
        }
        return publicKey
    },

    sign: async function (msg) {
        await ready()
        return nacl.crypto_sign(msg, privateKey)
    }
}


