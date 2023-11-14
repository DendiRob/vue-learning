import axios from "axios";

const postModule = {
    state: () => ({
        posts:  [],
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPage: 0,
        sortOptions: [
            {value: 'title', name: 'by name'},
            {value: 'body', name: 'by body'},
        ]
    }),
    getters: {
        sortedPost(state) {
            return [...state.posts].sort((post1,post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchPosts(state,getters){
            return getters.sortedPost.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {   
            state.posts = posts;
        },
        setLoading(state, bool){
            state.isPostsLoading = bool
        },
        setPage(state, page){
            state.page = page
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort;
        },
        setTotalPage(state, totalPage){ 
            state.totalPage = totalPage;
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery
        }
    },
    actions: {
        async fetchPosts({state,commit}) {
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
                
            } catch (error) {
                console.log(error)  
            }finally{
                commit('setLoading', false)
            }
        },
        async loadMorePosts({state,commit}) {
            try {
            commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page:state.page,
                        _limit:state.limit,
                    }
                });
            commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit))
            commit('setPosts', [...state.posts,...response.data])
                
            } catch (error) {
                console.log(error)  

            }
        },
    },
    namespaced: true
}
export default postModule