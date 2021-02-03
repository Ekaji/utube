<template>
    <div id="app">
        <div class="nav-bar">
            <searchbar :search='search'  />
        </div>
        <div class="recomend">
            <recomendation :searchResult='searchResult' :getAllVidId='getAllVidId' />
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
    search(searchFor){
    console.log(searchFor)
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${searchFor}&key=${this.key}`)
      .then(res => {
        this.searchResult = res.data.items;

        this.searchResult.sort(this.sortWithEtag)
        //  console.log(this.searchResult);
      },[]);
    },
// returns the statistics of every video
    getStats(){
        axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${[...this.allVideoId]}&key=${this.key}`)
        .then(res => {
            //try res.data.items
            this.videoStats = res.data;
            // error?
        this.videoStats.sort(this.sortWithEtag)
            console.log(this.videoStats)
        })
    },
// get the ids of all the videos when loaded
// pass as props to recomended component
     getAllVidId(videoId){
            this.allVideoId.push(videoId);
            this.getStats()
        },
 //function to arrange the returned data
    sortWithEtag(a,b){
        const etagA = a.etag;
        const etagB = b.etag;

        let compare = 0;
        if ( etagA > etagB){
            compare = 1;
        } else if (etagA < etagB){
            compare = -1;
        }
        return compare;
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
