<template>
    <div id="app">
        <div class="nav-bar">
            <searchbar :search='search'  />
        </div>
        <div class="recomend">
            <recomendation  />
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
            videoIDs: [],
            videoStats: [],
            mergedData: [],
            allVideoId: []
    }
},
   

  methods: {
    search(searchFor) {
    console.log(searchFor);
     axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${searchFor}&key=${this.key}`)
      .then(res => {
        let searchResponse = [...res.data.items];
        this.searchResult = searchResponse.map(result => ({
            id : result.id.videoId , title : result.snippet.description , image : result.snippet.thumbnails.medium.url 
        }),
    );

      this.videoIDs = this.searchResult.map(result => {
            return result.id
        },
    );
        console.log('sr ', this.searchResult, 'ids ', this.videoIDs);
        this.getStats(this.videoIDs);
      },[])
    },

// returns the statistics of every video
  getStats(ids){
     axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${this.key}`)
        .then(res => {
        let Stats = [...res.data.items];

        this.videoStats = Stats.map(stats => ({
            id : stats.id , comment: stats.statistics.commentCount, dislike: stats.statistics.dislikeCount, like: stats.statistics.likeCount,
            views: stats.statistics.viewCount
        })
    );

        console.log('vidstats ', this.videoStats)

        this.mergeArrayObjects(this.videoStats, this.searchResult);
        // console.log(this.mergeArrayObjects(this.videoStats, this.searchResult));

        },
        
        )

  },

  mergeArrayObjects(arr1,arr2){
  this.mergedData = arr1.map((item,i)=>{
     if(item.id === arr2[i].id){
         //merging two objects
       return Object.assign({}, item, arr2[i])
     }
  }
  
  );
  console.log(this.mergedData)
}

 
//     mergedById(a1, a2){
//    this.mergedData = a1.map(itm => ({
//         ...a2.find((item) => (item.id === itm.id) && item),
//         ...itm
//         }
//     ),
//     console.log('merged ', this.mergedData)
// );

// },
  

//   mergedResponse(){
//     //   thi mergedData = [];
//       for(let i=0; i < this.searchResut.length; i++) {
//         this.mergedData.push({
//          ...this.searchResut[i],
//          ...(this.videoStats.find((itmInner) => itmInner.id === this.searchResut[i].id))
//          },

//   );
//   console.log('merged ', this.mergedData)
// console.log('response')

// }

//   },


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