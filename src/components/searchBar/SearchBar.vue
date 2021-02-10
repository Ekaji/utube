<template>
        <div class="search-bar">
            <img class='youtube-icon' src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg' alt="utube" />
            <div class="search-area">
                <input v-model="searchFor" class="search" type="text" placeholder="Search">
                <input type="submit" @click='search(searchFor)' value="search">
            </div>  
        </div>
   
    <div class="search-results">

    </div>
</template>

 <script>
export default {
    name: 'searchBar',
    props: {
        search: { reqired: true, type: Function}
    },

    data(){
        return{
        key: process.env.VUE_APP_YOUTUBE_CLONE_API_KEY ,
        searchFor: '',
        }
    },
}
</script>

 <style scoped>
.search-bar{
    padding-top: 40px;
    display: flex;
    width: 100vw;
}
.youtube-icon{
    width: 70px;
}
.search-area{
    width: 100%;
    margin-left: -70px;
}
.search-area > input {
    height: 40px;
}
.search{
    width: 60vw;
    border-radius: 30px;
    outline: none;
    border: 1px solid black;
}
input[type='submit']{
    border: none;
}
</style>