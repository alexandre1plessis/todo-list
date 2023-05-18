<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
<style>

  body {
    color: #333333;
  }

  h1 {
    font-size: 3em;
    margin-left: 0.5em;
    font-weight: 600;
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin : 2px;
    margin-left: 0.5em;
    font-size: 2em;
    font-weight: 400;
    flex: auto;
  }

  h3 {
    font-size: 1.6em;
    font-weight: 500;
    text-align: center;
  }

  h5 {
    font-size: 1.6em;
    color: #646464;
  }

  aside {
    width: 90%;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: #FFFFFF;
    z-index: 100;
    overflow-y: auto;
  }

  .error {
    color : red;
  }
</style>
