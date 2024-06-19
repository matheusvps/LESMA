<template>
  <div id="q-app">
    <q-layout view="hHh lpR fFf">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title class="row">
            <q-avatar size="60px" square class="q-ma-md shake-hover">
              <img src="/slug.png" alt="Slug" />
            </q-avatar>
           <p
            class="text-h3 q-mt-lg"
            v-html="'LESMA'"
           />
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.shake-hover:hover {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

</style>
