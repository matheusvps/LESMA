<template>
  <q-card flat class="q-pa-md">
    <q-card-section>
      <span class="text-bold" v-html="'Entrada de Mensagem'" />
      <q-input
        v-model="currentMessage"
        dense
        label="Mensagem"
        @input="updateMessage"
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
    };
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
