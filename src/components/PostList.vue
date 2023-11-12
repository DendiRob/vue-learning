<template>
    <div>
        <post-item  
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
        />
    </div>
</template>
<script>
import PostItem from './PostItem.vue'
export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    data() {
        return {

        }
    },
}
</script>
<style scoped>
    
</style>