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
  props: ['message', 'encodedMessage'],
  watch: {
    encodedMessage() {
      this.drawWaveform();
    },
  },
  mounted() {
    this.drawWaveform();
  },
  methods: {
    drawWaveform() {
      console.debug('entrei draw');
      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');

      ctx.reset();

      const binaryArray = this.encodedMessage.split(' ');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      binaryArray.forEach((byte, byteIndex) => {
        byte.split('').forEach((bit, bitIndex) => {
          const x = (byteIndex * 8 + bitIndex) * 10;
          const y = bit === '1' ? 50 : 150;
          ctx.lineTo(x, y);
        });
      });

      ctx.stroke();
    },
  },
};
</script>
