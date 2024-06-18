<template>
  <q-page class="q-pa-md">
    <q-tabs v-model="activeTab" no-caps class="text-grey" shrink>
      <q-tab name="receiver" label="Receptor" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="activeTab" animated>
      <q-tab-panel name="receiver">
        <MessageReceiver/>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import MessageReceiver from '../components/MessageReceiver.vue';

export default {
  components: {
    MessageReceiver,
  },
  data() {
    return {
      message: '',
      encodedMessage: '',
      activeTab: 'receiver',
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
