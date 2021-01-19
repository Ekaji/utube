<template>
    <div id="app">
        <searchbar />
    </div>
</template>

<script>
import axios from 'axios'
import searchbar from './components/searchBar/SearchBar'

window.axios = axios

export default {
    name: 'app',

    components: {
        searchbar,
    },
  
}
  
    
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
