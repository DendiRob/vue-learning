<template>
    <form @submit.prevent>
        <h4>Create a post</h4>
        <my-input 
        v-model="post.title" 
        @input="post.title = $event.target.value"
        placeholder="name"
        />
        <my-input 
        v-model="post.body" 
        @input="post.body = $event.target.value"
        placeholder="describe" />
        <my-button
        :text="Create"
        @click='createPost'
        >Create</my-button>
    </form>
</template>
<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost(){
            this.post.id = Date.now();  
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: '',
            }
            this.title = ''
            this.body = ''
        }
    }
}
</script>
<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }
</style>