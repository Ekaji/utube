<template>
    <div id="recomended">
        <div class='recomended' v-for='items in mergedData' :key='items'>
         <router-link to='/video' href='#' target="blank" >
            <div  classs='video__wraper'>
                <img :src='items.image' >
                <p>{{items.contentDetails.duration.substr(2).replace('M', ' : ').replace(/S|D/g, '')}}</p>
            </div>
            <div class="recomended__info">
                <div class="recomended__title">{{items.title}}</div>
                <!-- <div class="recomended-channel-name">{}</div> -->
                <div class="recomended__views">{{items.statistics.viewCount}} views</div>
            </div>
         </router-link> 
        </div>
        <!-- <router-view/> -->
            
    </div>
</template>

<script>

export default {
    name: 'recomended',
    props:{
        mergedData: { required: true, type: Object},
    },

    data(){
        return{
            key: process.env.VUE_APP_YOUTUBE_CLONE_API_KEY,
          
        }
    },

    methods: {

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

.recomended > a {
    color: black;
}

.video{
    height: 280px;
    margin-bottom: 20px;
}

.video__wrapper__tumbnail{
    width: 300px;
    height: 200px;
}

.recomended__title{
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