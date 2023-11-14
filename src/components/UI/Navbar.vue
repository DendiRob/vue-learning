<template>
    <div class="navbar">
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">
                posts
            </my-button>
            <my-button @click="$router.push('/about')">
                About
            </my-button>
            <my-button @click="$router.push('/')">
                main
            </my-button>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
    .navbar {
        height: 50px;
        background-color: rgb(210, 235, 209);
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
    }
</style>