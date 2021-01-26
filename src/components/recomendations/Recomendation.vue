<template>
    <div id="recomended">
        <div class='thumbnail' v-bind:class='{playing : isPlaying}' @click='isPlaying = !isPlaying' v-for='item in searchResult' :key='item' >
            <div >
                <iframe :src='`https://www.youtube.com/embed/${item.id.videoId}`'> </iframe>
            </div>
            <div class="discription">
                <h4>{{item.snippet.description}}</h4>
                <p>{{item.snippet.channelTitle}}</p>
            </div>
        </div>
       
    </div>
</template>

<script>
// import axios from 'axios'


export default {
    name: 'recomended',

    props: {
        searchResult: {type: Object}
    },

    data(){
        return{
            videoimage: {},
            key: process.env.VUE_APP_YOUTUBE_CLONE_API_KEY,
            ytData: [],
            isPlaying: false
        }
    },

    mounted(){
        
    }
}

    
</script>

<style scoped>
#recomended{
    display: grid;
    grid-template-columns: repeat(4, auto);
    margin-top: 50px;
    /* width: 100%; */
}
.playing{
    /* display: grid; */
    grid-row: 1 / span 2;
    grid-column: 1 / span 2;
}
.discription > h4{
    display: -webkit-box;   
   -webkit-line-clamp: 1;   
   -webkit-box-orient: vertical;     
   overflow: hidden;
}

</style>