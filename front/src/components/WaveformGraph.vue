<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <!-- <h2 id="title_graph">Forma de Onda</h2> -->
      <div id="title_graph" class="wave">
        <span style="--i:1">F</span>
        <span style="--i:2">o</span>
        <span style="--i:3">r</span>
        <span style="--i:4">m</span>
        <span style="--i:5">a</span>
        <span style="--i:6">&nbsp;</span>
        <span style="--i:7">d</span>
        <span style="--i:8">e</span>
        <span style="--i:9">&nbsp;</span>
        <span style="--i:10">O</span>
        <span style="--i:11">n</span>
        <span style="--i:12">d</span>
        <span style="--i:13">a</span>
      </div>
      <div class="container">
        <canvas ref="canvas" :width="canvasWidth" height="200"></canvas>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ['encodedMessage'],
  data() {
    return {
      canvasWidth: 100,
    };
  },
  watch: {
    encodedMessage() {
      this.drawWaveform();
    },
  },
  mounted() {
    this.drawWaveform();
  },
  methods: {
    manchesterCode(binaryStr) {
      return binaryStr.split(' ')
        .map((byte) => byte.split('')
          .map((bit) => (bit === '1' ? '01' : '10'))
          .join(''))
        .join(' ');
    },

    drawWaveform() {
      console.debug(this.encodedMessage, 'o q chega no draw');
      const manchester = this.manchesterCode(this.encodedMessage);
      const trimmed = manchester.replace(/\s+/g, '');
      const binaryArray = trimmed.split(' ');
      // Calculate the required canvas width based on the encoded message
      const numBits = binaryArray.reduce((sum, byte) => sum + byte.length, 0);
      this.canvasWidth = (numBits + binaryArray.length * 16) * 10; // Adjusting for spacing and bits

      // Ensure the canvas width is updated before drawing
      this.$nextTick(() => {
        const { canvas } = this.$refs;
        const ctx = canvas.getContext('2d');
        ctx.reset();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        let x = 0;
        let y = 0;
        let lastBit = 0;
        binaryArray.forEach((byte, byteIndex) => {
          byte.split('').forEach((bit, bitIndex) => {
            if (byteIndex === 0 && bitIndex === 0) {
              x -= 10;
              if (bit === '1') {
                y = canvas.height;
              }
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
      });
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
  #title_graph {
    text-align: center;
    color: #162730;
    font-family: 'Arial', sans-serif;
    text-shadow: 2px 2px 1px #2c3e50;
    -webkit-text-fill-color: transparent;
    font-size: 4em;
    margin-top: 0px;
    margin-bottom: 20px;
  }
  .wave {
    position: relative;
  }
  .wave:hover span {
    position: relative;
    display: inline-block;
    animation: animate 1s ease-in-out infinite;
    animation-delay: calc(0.076s * var(--i));
  }
  @keyframes animate {
    0% {
      transform: translateY(0px);
    }
    20% {
      transform: translateY(-10px);
    }
    40%,100% {
      transform: translateY(0px);
    }
  }
</style>
