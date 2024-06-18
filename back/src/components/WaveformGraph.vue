<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <h2>Gráfico de Forma de Onda</h2>
      <div class="container">
        <canvas ref="canvas" width="5000" height="200"></canvas>
      </div>
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
      ctx.beginPath();
      ctx.moveTo(0, 0);
      let x = 0;
      let y = 0;
      let lastBit = 0;
      binaryArray.forEach((byte, byteIndex) => {
        byte.split('').forEach((bit, bitIndex) => {
          if (byteIndex === 0 && bitIndex === 0 && bit === '0') {
            x -= 10;
          }
          if (bit !== lastBit) {
            y = y === 0 ? (canvas.height / 2) : 0;
            ctx.lineTo(x, y);
          }
          y = bit === '1' ? 0 : (canvas.height / 2);
          x = (byteIndex * 16 + bitIndex + 1) * 10;
          ctx.lineTo(x, y);
          lastBit = bit;
        });
      });

      ctx.stroke();
    },
  },
};
</script>

<style scoped>
  .container {
    max-width: 100%;
    overflow-x: auto;
  }
  .canvas {
    display: block;
  }
</style>
