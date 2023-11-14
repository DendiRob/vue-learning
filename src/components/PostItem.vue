<template>
    <div class="post">
        <div><strong>Название:</strong>{{post.title}}</div>
        <div class="post__descr"><strong>Описание:</strong>{{post.body}}</div>
        <div class="post__btns">
            <my-button
            @click="$router.push(`/posts/${post.id}`)"
            >
                Open
            </my-button>
            <my-button
            @click="$emit('remove', post)"
            >Delete</my-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        post: {
            type:Object,
            required: true,
        }
    }
}
</script>
<style scoped>
    .post {
        padding: 15px;
        border: 2px solid teal;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .post__descr {
        width: 500px;
    }
    .post__btns {
        display: flex;
        width: 140px;
        justify-content: space-between;
    }
</style>