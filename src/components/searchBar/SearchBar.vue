<template>
    <div class="search-bar">
        <img class='youtube-icon' src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg' alt="utube" />
        <div class="search-area">
            <input class="search"  @keyup="testing" v-model="searchFor"  type="text" placeholder="Search">
                    <h2>{{searchFor}}</h2>
            <input type="submit" v-on:click='search' value="search">
        </div>  
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'searchBar',

    data: function() {
        return {
            searchFor: 'food',
            searchResult: '',
    }
},
    methods: {
    search(){
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${this.searchFor}&key=AIzaSyCK3hkn02Q7YhLAvfls1Wdisv4We-D4bRo`)
      .then(res => {
         this.searchResult = res.data
         console.log(res.data)
      },[])
    }
}
}

</script>

<style scoped>
.search-bar{
    display: flex;
    width: 100%
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