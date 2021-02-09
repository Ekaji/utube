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
            // videoIDs: [],
            mergedData: [],
            // durationAndStats: []
    }
},
   

  methods: {
    search(searchFor) {
    console.log(searchFor);
     axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${searchFor}&key=${this.key}`)
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

        // this.getStats(videoIDs);
        this.getStatsAndDuration(videoIDs)
      },[])
},

 getStatsAndDuration(IDs){
        let getstats = axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${IDs}&key=${this.key}`);
        let getDuration = axios.get(`https://youtube.googleapis.com/youtube/v3/videos?id=${IDs}&part=contentDetails&key=${this.key}`);
        
        axios.all([getstats, getDuration])
        .then( axios.spread( (stats, duration) => {
          this.mergedData = this.mergeArrayObjects([...stats.data.items], [...duration.data.items]);
          console.log(this.mergedData)
        },
    ),
)

  },

// returns the statistics of every video

//   getStats(ids){
//      axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${this.key}`)
//         .then(res => {
// //returns video statistics
//         let Stats = [...res.data.items];

// //video statistics with specific values extracted
//         this.videoStats = Stats.map(stats => ({
//             id : stats.id , comment: stats.statistics.commentCount, dislike: stats.statistics.dislikeCount, like: stats.statistics.likeCount,
//             views: stats.statistics.viewCount
//             }
//         )
//     );

// //calling the mergeArrayObjects merges the videoStats and searchResult
//         this.mergeArrayObjects(this.videoStats, this.searchResult);
//         },
//     )
// },


//function to merge two Object of arrays
  mergeArrayObjects(arr1, arr2){
    // this.mergedData = 
    return arr1.map((item, i) => {
        if (item.id === arr2[i].id) {
         //merging two objects
            return Object.assign({}, item, arr2[i])
        }

    }
);
    // console.log(this.mergedData)

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