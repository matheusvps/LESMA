<template>
  <q-card flat class="q-pa-md">
    <q-card-section>
      <span class="text-bold">Mensagem Recebida</span>
      <p>{{ receivedMessage }}</p>
    </q-card-section>
    <q-card-section class="container">
      <span class="text-bold">Mensagem Decodificada</span>
      <p>{{ decodedMessageBinary }}</p>
    </q-card-section>
    <q-card-section>
      <span class="text-bold">Mensagem Descriptografada</span>
      <p>{{ decryptedMessage }}</p>
    </q-card-section>
    <q-card-section>
      <WaveformGraph :encodedMessage="decodedMessageBinary" />
    </q-card-section>
  </q-card>
</template>

<script>
import CryptoJS from 'crypto-js';
import WaveformGraph from './WaveformGraph.vue';

export default {
  components: {
    WaveformGraph,
  },
  data() {
    return {
      receivedMessage: '',
      decodedMessageBinary: '',
      decryptedMessage: '',
      decryptionKey: 'chave-secreta',
    };
  },
  created() {
    this.setupWebSocket();
  },
  methods: {
    setupWebSocket() {
      const url = new URL(window.location.href);
      const ip = url.hostname;
      const socket = new WebSocket(`ws://${ip}:5000`);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.receivedMessage = data.message;
        this.processMessage();
      };

      socket.onopen = () => {
        console.log('WebSocket connection established');
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
      };
    },
    processMessage() {
      this.decodedMessageBinary = this.manchesterDecode(this.receivedMessage);
      const decryptedBinaryMessage = this.fromBinaryToAscii(this.decodedMessageBinary);
      this.decryptedMessage = this.decryptMessage(decryptedBinaryMessage);
    },
    manchesterDecode(binaryStr) {
      const trimmed = binaryStr.replace(/\s+/g, '');

      let decoded = '';
      for (let i = 0; i < trimmed.length; i += 2) {
        const pair = trimmed.substring(i, i + 2);
        if (pair === '10') {
          decoded += '0';
        } else if (pair === '01') {
          decoded += '1';
        } else {
          throw new Error('A sequência de bits codificada contém um par inválido');
        }
      }
      return decoded;
    },
    fromBinaryToAscii(binaryStr) {
      return binaryStr.match(/.{8}/g)
        .map((byte) => String.fromCharCode(parseInt(byte, 2)))
        .join('');
    },
    decryptMessage(encryptedStr) {
      const bytes = CryptoJS.DES.decrypt(encryptedStr, this.decryptionKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
  },
};
</script>

<style scoped>
  .container {
    max-width: 100%;
    word-wrap: break-word;
}
</style>
