<template>
  <q-page class="q-pa-md">
    <q-tabs v-model="activeTab" no-caps class="text-grey" shrink>
      <q-tab name="message" label="Mensagem" />
      <q-tab name="graph" label="Gráfico" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="activeTab" animated>
      <q-tab-panel name="message">
        <MessageSender
          :message="message"
          @message-updated="updateMessage"
          @encrypted-message-updated="updateEncodedMessage"
        />
      </q-tab-panel>
      <q-tab-panel name="graph">
        <WaveformGraph :encodedMessage="encodedMessage" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import MessageSender from '../components/MessageSender.vue';
import WaveformGraph from '../components/WaveformGraph.vue';

export default {
  components: {
    MessageSender,
    WaveformGraph,
  },
  data() {
    return {
      message: '',
      encodedMessage: '',
      activeTab: 'message',
    };
  },
  methods: {
    updateMessage(newMessage) {
      this.message = newMessage;
    },
    updateEncodedMessage(newEncodedMessage) {
      this.encodedMessage = newEncodedMessage;
    },
  },
};
</script>
