<template>
  <q-page class="q-pa-md">
    <q-tabs v-model="activeTab" no-caps class="text-grey" shrink>
      <q-tab name="message" label="Mensagem" />
      <q-tab name="graph" label="Gráfico" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="activeTab" animated>
      <q-tab-panel name="message">
        <MessageComponent @message-updated="updateMessage" :message="message"/>
      </q-tab-panel>
      <q-tab-panel name="graph">
        <WaveformGraph :message="message" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import MessageComponent from '../components/MessageComponent.vue';
import WaveformGraph from '../components/WaveformGraph.vue';

export default {
  components: {
    MessageComponent,
    WaveformGraph,
  },
  data() {
    return {
      message: '',
      activeTab: 'message',
    };
  },
  methods: {
    updateMessage(newMessage) {
      this.message = newMessage;
    },
  },
};
</script>
