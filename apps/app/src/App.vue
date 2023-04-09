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

  h2 {
    margin : 2px;
    margin-left: 0.5em;
    font-size: 2em;
    font-weight: 400;
    width: min-content;
    flex: auto;
  }

  h1 {
    font-size: 3em;
    margin-left: 0.5em;
    font-weight: 600;
    display: flex;
    flex-direction: column;
  }

</style>
