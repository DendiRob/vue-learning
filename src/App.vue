<template>
    <post-form 
    @create="createPost"
    />
    <post-list  
    :posts="posts"
    @remove='deletePost'
    />
</template>
<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
export default {
    components: {
        PostList,
        PostForm
    },
    data() {
        return {
            posts:  [
            { id: 1, title: "Заголовок новости 1", body: "Текст новости 1" },
            { id: 2, title: "Заголовок новости 2", body: "Текст новости 2" },
            { id: 3, title: "Заголовок новости 3", body: "Текст новости 3" },
            ],
        }
    },
    methods: {
        createPost(post){
            this.posts.push(post)
        },
        deletePost(deletedPost){
            this.posts= this.posts.filter(post => post !== deletedPost)

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