Vue.component('filter-el', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `
    <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <button class="btn-search" type="submit"><img src="img_index/search.svg" alt="search">
        </button>
        <input type="text" class="search-field" v-model="userSearch">
    </form>
    `
})