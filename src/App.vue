<template>
    <div>
        <my-button
        @click="fetchPosts"
        style="display: block;
        margin-bottom: 10px;"
        >Fetch posts</my-button>
        <my-button
        @click="showDialog"
        >
        <h1>Create a post</h1>
        </my-button>
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
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                this.posts = response.data;
            } catch (error) {
                alert(error)   
            }
            
        }
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
</style>