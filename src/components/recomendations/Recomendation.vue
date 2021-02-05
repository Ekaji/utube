<template>
    <div id="recomended">
        <div :id='item.id.videoId' class='video' @click="getVidId($event)" v-for='(item, index) in searchResult' :key='index' >
         <a href='#'  target="blank">
            <div  classs='video__wraper'>
                <img :id='item' class='video__wrapper__tumbnail' @load="getAllVidId(item.id.videoId)" :src='item.snippet.thumbnails.medium.url' >
            </div>
            <div class="video__info">
                <h4 class='video__info__description'>{{item.snippet.description}}</h4>
                <h6 class='video__info__title'>{{item.snippet.channelTitle}}</h6>
            </div>
            <div v-for='stats in videoStats' :key='stats'>
                <span>{{stats.statistics.likeCount}}</span>
            </div>
         </a> 
        </div>
            
    </div>
</template>

<script>

export default {
    name: 'recomended',

    props: {
        searchResult: {type: Object},
        getAllVidId: {type: Function},
        videoStats: {type: Object}
    },

    data(){
        return{
            key: process.env.VUE_APP_YOUTUBE_CLONE_API_KEY,
            currentVideoUri: [],
            player: '',
        }
    },

    methods: {
// get the video id of clicked video
        getVidId($event){
            let getattributeid = $event.currentTarget.getAttribute('id');
            this.currentVideoUri = getattributeid;
            console.log('current video uri :' + this.currentVideoUri)
        },
// get the ids of all the videos when loaded
        // getAllVidId(videoId){
        //     this.allVideoId.push(videoId);
        //     console.log('all video uri :' + this.allVideoId)
        // },

    },

}
 
</script>
 
<style scoped>
#recomended{
    display: grid;
    grid-template-columns: repeat(4, auto);
    margin-top: 50px;
    grid-gap: 0px 30px;
}

.video{
    height: 280px;
    margin-bottom: 20px;
}

.video__wrapper__tumbnail{
    width: 300px;
    height: 200px;
}

.video__info__description,
.video__info__title{
    display: -webkit-box;   
   -webkit-line-clamp: 1;   
   -webkit-box-orient: vertical;     
   overflow: hidden;
}
.play-window > iframe{
    width: 65vw;
    height: 65vh;
    border: none;
}
</style>