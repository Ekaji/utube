<template>
    <div id="app">
        <div class="nav-bar">
            <searchbar :search='search'  />
        </div>
        <div class="recomend">
            <recomendation :mergedData='mergedData' />
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
        Recomendation,
    },

    data() {
        return {
            key: process.env.VUE_APP_YOUTUBE_CLONE_API_KEY ,
            searchResut: [],
            videoStats: [],
            mergedData: [],
            baseURI: 'https://youtube.googleapis.com/youtube/v3/'
    }
}, 

  methods: {
    search(searchFor) {
    console.log(searchFor);
     axios.get(`${this.baseURI}search?part=snippet&maxResults=25&order=relevance&q=${searchFor}&key=${this.key}`)
      .then(res => {
//complete search response
        let searchResponse = [...res.data.items];

//search response with sellected values extracted
        this.searchResult = searchResponse.map(result => ({
            id : result.id.videoId , title : result.snippet.description , image : result.snippet.thumbnails.medium.url 
        }),
    );

//search with ids extracted
      let videoIDs = this.searchResult.map(result => {
            return result.id
        },
    );

//calling the getstats function with video ids passed as parameters

        this.getStatsAndDuration(videoIDs)
      },[])
},

//method to get video statistics and duration and also merge them
 getStatsAndDuration(IDs){
        let getstats = axios.get(`${this.baseURI}videos?part=statistics&id=${IDs}&key=${this.key}`);
        let getDuration = axios.get(`${this.baseURI}videos?id=${IDs}&part=contentDetails&key=${this.key}`);
        
       axios.all([getstats, getDuration])
        .then( axios.spread( (stats, duration) => {
            //merge stats and duration
          let merged = this.mergeArrayObjects([...stats.data.items], [...duration.data.items]);
          //also merge search result
          this.mergedData = this.mergeArrayObjects(this.searchResult, [...merged]);
          console.log(this.mergedData)
        },
    ),
)

  },


//function to merge two Object of arrays
  mergeArrayObjects(arr1, arr2){
    return arr1.map((item, i) => {
        if (item.id === arr2[i].id ) {
            return Object.assign({}, item, arr2[i])
        }

    }
);

},

 


},


 mounted() {
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
.nav-bar {
    position: sticky;
    top: 0;
    margin-bottom: 30px;
    width: 100%;
}

</style>