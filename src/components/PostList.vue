<template>
    <div>
        <div v-show="posts.length > 0">
            <transition-group name="post-list">
                <post-item  
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @remove="$emit('remove', post)"
                />
            </transition-group>
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
    .post-list-item{
        display: inline-block;
        margin-right: 10px;
    }
    .post-list-enter-active,
    .post-list-leave-active {
        transition: all .4s ease;
    }
    .post-list-enter-from,
    .post-list-leave-to {
        opacity: 0;
        transform: translateX(130px)
    }
    .post-list-move {
        transition: transform 0.4s ease;
    }
</style>