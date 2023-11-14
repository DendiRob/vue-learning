<template>
    <my-input
    v-model="searchQuery"
    />
    <div v-if="!isPostsLoading">
        <div class="app__btns">
            <my-button
            @click="showDialog"
            >
            <h1>Create a post</h1>
            </my-button>
            <my-select 
            v-model="selectedSort"
            :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
            @create="createPost"
            />  
        </my-dialog>
        <post-list  
            :posts="sortedAndSearchPosts"  
            @remove='deletePost'
        />
    </div>
    <h1 v-else>Loading...</h1>
</template>
<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import axios from 'axios';

export default {
    components: {
        PostList,
        PostForm
    },
    data() {
        return {
            posts:  [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            sortOptions: [
                {value: 'title', name: 'by name'},
                {value: 'body', name: 'by body'},
                // {value: 'id', name: 'by id'}, доделать
                
            ]
        }
    },
    methods: {
        createPost(post){
            this.posts.push(post);
            this.dialogVisible = false
        },
        deletePost(deletedPost){
            this.posts= this.posts.filter(post => post !== deletedPost)

        },
        showDialog() {
            this.dialogVisible = true   
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                this.posts = response.data;
                
            } catch (error) {
                alert(error)   
            }finally{
                this.isPostsLoading = false
            }
        },
    },
    mounted() {
        this.fetchPosts()
    },
    computed:  {
        sortedPost() {
            return [...this.posts].sort((post1,post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchPosts(){
            return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    // watch: {
    //     selectedSort(newValue) {
    //         this.posts.sort((post1, post2) => {
    //             return post1[newValue]?.localeCompare(post2[newValue])
    //         })
    //     }
    // }
}
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #app {
        padding: 20px;
    }
    .app__btns {
        display: flex;
        justify-content: space-between;
    }
</style>