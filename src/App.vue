<template>
    <div id="app">
        <div class="nav-bar">
            <searchbar :search='search'  />
        </div>
        <div class="recomend">
            <recomendation :searchResult='searchResult' />
        </div>
    </div> 
</template>

<script>
import axios from 'axios'
import searchbar from './components/searchBar/SearchBar'
import Recomendation from './components/recomendations/Recomendation'

export default {
    name: 'app',
    components: {
        searchbar,
        Recomendation
    },

    data() {
        return {
            key: process.env.VUE_APP_YOUTUBE_CLONE_API_KEY ,
            searchResult: [],
            result: [],

    }
},

  methods: {
    search(searchFor){
    console.log(searchFor)
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${searchFor}&key=${this.key}`)
      .then(res => {
         this.searchResult = res.data.items
         console.log(res.data.items)
      },[])
    },
//some videos are without id this removes them
    filteredData(){
        this.searchResult.filter(data => {
            data.items.id.videoId == null
        } )
    },
 },

 mounted() {
//default search paramiter to mimick youtube video recomendation on start
     this.search('cars')
 }
  
}

    
</script>

<style scoped>

html, body {
  margin: 0px !important;
  padding: 0px !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: -8px;
}
.nav-bar{
    position: sticky;
    top: 0;
    margin-bottom: 30px;
    width: 100%;
}

</style>
