<template>
    <div id="app">
        <div class="nav-bar">
            <searchbar :search='search'  />
        </div>
        <div class="recomend">
            <recomendation :searchResult='searchResult' :getAllVidId='getAllVidId' :videoStats='videoStats' />
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
            videoStats: [],
            allVideoId: []
    }
},

  methods: {
    search(searchFor) {
    console.log(searchFor)
     axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${searchFor}&key=${this.key}`)
      .then(res => {
          if (this.searchResult.length >= 25){
            this.searchResult = [];
          }
        this.searchResult = [...res.data.items].sort(this.sortWithEtag);

         console.log('sr :' , this.searchResult);
      },[])
      

    },

// returns the statistics of every video
    getStats(){
  axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${[...this.allVideoId]}&key=${this.key}`)
        .then(res => {
        //      if (this.videoStats.length >= 25){
        //     this.videoStats = [];
        //   }
        this.videoStats = [...res.data.items].sort(this.sortWithEtag);
            
            console.log('alvid', this.videoStats)
        })
    },

// get the ids of all the videos when loaded
// pass as props to recomended component
     getAllVidId(videoId){
         if (this.allVideoId.length >= 25){
            this.allVideoId = [];
          }
            this.allVideoId.push(videoId);
            this.getStats()
        },

//  function to arrange the returned data
    sortWithEtag(a, b){
        const idA = a.id.videoId;
        const idB = b.id.videoId;

        if ( idA < idB){
            return -1;
        } else if (idA > idB){
            return 1;
        }
        return 0;
    },
    
 },

 created() {
//default search paramiter to mimick youtube video recomendation on start
     this.search('cars')
 },
 
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
