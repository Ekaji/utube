<template>
    <div id="recomended">
        <div  >
         <a href='#'  target="blank">
            <div  classs='video__wraper'>
                <img  >
            </div>
         </a> 
        </div>
            
    </div>
</template>

<script>

export default {
    name: 'recomended',

    data(){
        return{
            key: process.env.VUE_APP_YOUTUBE_CLONE_API_KEY,
            currentVideoUri: [],
            player: '',
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