<template>
    <div>
        <div v-show="posts.length > 0">
            <post-item  
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @remove="$emit('remove', post)"
            />
        </div>
        <h2 v-show="posts.length == 0" style="color: red">
            List is empty
        </h2>
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