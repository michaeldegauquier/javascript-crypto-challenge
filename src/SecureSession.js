const nacl = require('libsodium-wrappers')

async function ready() {
    await nacl.ready
}

let key, serverPublicKey, serverPrivateKey
let rx, tx

module.exports = {
    setClientPublicKey: function (clientPublicKey) {
        if (key != null && key !== clientPublicKey) {
            throw "client public key already set"
        } else {
            key = clientPublicKey
        }
    },

    serverPublicKey: async function () {
        await ready()
        const keyPair = nacl.crypto_kx_keypair()
        serverPrivateKey = keyPair.privateKey
        serverPublicKey = keyPair.publicKey

        const sharedKeys = nacl.crypto_kx_server_session_keys(
            serverPublicKey,
            serverPrivateKey,
            key
        )
        rx = sharedKeys.sharedRx
        tx = sharedKeys.sharedTx

        return serverPublicKey
    },

    decrypt: async function (ciphertext, nonce) {
        await ready()
        return nacl.crypto_secretbox_open_easy(ciphertext, nonce, rx)
    },

    encrypt: async function (msg) {
        await ready()
        let nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES)
        let ciphertext = nacl.crypto_secretbox_easy(msg, nonce, tx)
        return {ciphertext, nonce}
    }
}