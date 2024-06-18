<template>
  <q-card flat class="q-pa-md">
    <q-card-section>
      <span class="text-bold" v-html="'Entrada de Mensagem'" />
      <q-input
        v-model="currentMessage"
        dense
        label="Mensagem"
        @input="updateMessage"
        :disable="isSent"
      />
    </q-card-section>
    <div class="row full-width">
      <q-card-section v-if="currentMessage" class="col-5">
        <span class="text-bold" v-html="'Mensagem Original'" />
        <p>{{ originalMessageBinary }}</p>
      </q-card-section>
      <q-separator vertical />
      <q-card-section v-if="currentMessage" class="col-5">
        <span class="text-bold" v-html="'Mensagem Criptografada'" />
        <p>{{ encryptedMessageBinary }}</p>
      </q-card-section>
    </div>
    <q-card-actions align="right">
      <q-btn
        label="Enviar"
        @click="sendMessage"
        :disable="isSent"
        color="primary"
      />
      <q-btn
        label="Reiniciar"
        @click="resetMessage"
        v-if="isSent"
        color="negative"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  props: {
    message: String,
  },
  data() {
    return {
      currentMessage: this.message || '',
      encryptionKey: 'chave-secreta',
      isSent: false,
    };
  },
  watch: {
    encryptedMessage() {
      this.$emit('message-updated', this.currentMessage);
      this.$emit('encrypted-message-updated', this.manchesterCode(this.encryptedMessageBinary));
    },
  },
  computed: {
    originalMessageBinary() {
      return this.toBinary(this.currentMessage);
    },
    encryptedMessage() {
      return CryptoJS.AES.encrypt(this.currentMessage, this.encryptionKey).toString();
    },
    encryptedMessageBinary() {
      return this.toBinary(this.encryptedMessage);
    },
  },
  methods: {
    updateMessage() {
      this.$emit('message-updated', this.currentMessage);
    },
    toBinary(str) {
      return str.split('').map((char) => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    },
    manchesterCode(binaryStr) {
      return binaryStr.split(' ')
        .map((byte) => byte.split('')
          .map((bit) => (bit === '1' ? '01' : '10'))
          .join(''))
        .join(' ');
    },
    async sendMessage() {
      this.isSent = true;
      const encodedMessage = this.manchesterCode(this.encryptedMessageBinary);
      await this.sendMessageToServer(encodedMessage);
    },
    resetMessage() {
      this.currentMessage = '';
      this.isSent = false;
      this.$emit('message-updated', this.currentMessage);
      this.$emit('encrypted-message-updated', '');
    },
    async sendMessageToServer(message) {
      try {
        const response = await fetch('http://localhost:5000/receive-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
      }
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
