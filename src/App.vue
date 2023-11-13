<template>
    <div v-if="!isPostsLoading">
        <div class="app__btns">
            <my-button
            @click="showDialog"
            >
            <h1>Create a post</h1>
            </my-button>
            <my-select 
            v-model="selectedSort" 
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
            @create="createPost"
            />  
        </my-dialog>
        <post-list  
            :posts="posts"  
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
            selectedSort: ''
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