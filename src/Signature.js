const nacl = require('libsodium-wrappers')

beforeAll(async () => {
    await nacl.ready
})

let publicKey, privateKey;

module.exports = {
    verifyingKey: async function () {
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


