<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body{
    margin: 0;
    padding: 0;
    background-color: #EEE;
  }
  *{
    padding: 0;
    margin: 0;
  }
  .show-img{
    height: 26vh;
  }
  .show-img>img{
    width: 100%;
    height: 26vh;
  }
</style>
