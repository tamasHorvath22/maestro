<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {

    }
  },
  methods: {
    
  },
  components: {
  }
}
</script>

<style scoped>
#game {
  width: 60%;
  background-color: rgb(43, 38, 38);
  color: white;
  margin: auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: white;
  background-color: rgb(43, 38, 38);
  height: 100vh;
}

#logo {
  height: 200px;
  width: 200px;
  margin: auto;
  text-align: center;
}
</style>
