<template>
    <q-card flat class="q-pa-md">
      <q-card-section>
        <span class="text-bold">Mensagem Recebida</span>
        <p>{{ receivedMessage }}</p>
      </q-card-section>
      <q-card-section>
        <span class="text-bold">Mensagem Decodificada</span>
        <p>{{ decodedMessageBinary }}</p>
      </q-card-section>
      <q-card-section>
        <span class="text-bold">Mensagem Descriptografada</span>
        <p>{{ decryptedMessage }}</p>
      </q-card-section>
    </q-card>
  </template>

<script>
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      receivedMessage: '',
      decodedMessageBinary: '',
      decryptedMessage: '',
      decryptionKey: 'chave-secreta',
    };
  },
  created() {
    this.fetchMessage();
  },
  methods: {
    async fetchMessage() {
      try {
        const response = await fetch('http://localhost:5000/send-message');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        this.receivedMessage = data.message;
        this.processMessage();
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    },
    processMessage() {
      this.decodedMessageBinary = this.manchesterDecode(this.receivedMessage);
      this.decryptedMessage = this.fromBinaryToAscii(this.decodedMessageBinary);
      this.decryptedMessage = this.decryptMessage(this.decryptedMessage);
    },
    manchesterDecode(binaryStr) {
      return binaryStr.split(' ')
        .map((byte) => byte.match(/.{2}/g)
          .map((pair) => (pair === '01' ? '1' : '0'))
          .join(''))
        .join(' ');
    },
    fromBinaryToAscii(binaryStr) {
      return binaryStr.split(' ')
        .map((byte) => String.fromCharCode(parseInt(byte, 2)))
        .join('');
    },
    decryptMessage(encryptedStr) {
      const bytes = CryptoJS.AES.decrypt(encryptedStr, this.decryptionKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
  },
};
</script>

<style scoped>
.q-input {
  width: 100%;
}
.full-width {
  width: 100%;
}
</style>
