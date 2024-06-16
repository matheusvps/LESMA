<template>
    <q-card class="q-pa-md">
      <q-card-section>
        <h2>Gráfico de Forma de Onda</h2>
        <canvas ref="canvas" width="600" height="200"></canvas>
      </q-card-section>
    </q-card>
  </template>

<script>
export default {
  props: ['message'],
  computed: {
    binaryMessage() {
      return this.message.split('').map((char) => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    },
  },
  watch: {
    message() {
      this.drawWaveform();
    },
  },
  mounted() {
    this.drawWaveform();
  },
  methods: {
    drawWaveform() {
      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');
      const binaryArray = this.binaryMessage.split(' ');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      binaryArray.forEach((bit, index) => {
        const x = index * 10;
        const y = bit === '1' ? 50 : 150;
        ctx.lineTo(x, y);
      });

      ctx.stroke();
    },
  },
};
</script>
