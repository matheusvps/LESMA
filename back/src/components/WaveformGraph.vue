<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <h2>Gráfico de Forma de Onda</h2>
      <canvas ref="canvas" width="1500" height="200"></canvas>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['encodedMessage'],
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
      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');
      ctx.reset();
      const binaryArray = this.encodedMessage.split(' ');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.debug(binaryArray, 'socorro');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      let x;
      let y;
      binaryArray.forEach((byte, byteIndex) => {
        byte.split('').forEach((bit, bitIndex) => {
          if (bitIndex > 1 && bit !== byte[bitIndex - 1]) {
            y = y === (canvas.height / 2) ? 0 : (canvas.height / 2);
            ctx.lineTo(x, y);
          }
          y = bit === '1' ? (canvas.height / 2) : 0;
          x = (byteIndex * 16 + bitIndex) * 10;
          ctx.lineTo(x, y);
        });
      });

      ctx.stroke();
    },
  },
};
</script>
