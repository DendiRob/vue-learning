<template>
    <h1>{{ likes }}</h1>
    <button @click="setLikes" class="add__likes">add</button>
    <!-- <my-input
    :model-value="searchQuery"
    @update:model-value="setSearchQuery"
    />
    <div v-if="!isPostsLoading">
        <div class="app__btns">
            <my-button
            @click="showDialog"
            >
            <h1>Create a post</h1>
            </my-button>
            <my-select 
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
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
    <div class="page__wrapper">
        <div 
        v-for="(pageNumber) in totalPage" 
        :key="pageNumber"
        class="page"
        @click="switchPage(pageNumber)"
        :class="{
            'current-page': page === pageNumber
        }"
        >{{ pageNumber }}</div>
    </div>
    <div v-intersection="loadMorePosts" class="observer">При пересечений происходит вызов функций</div> -->
</template>
<script>
import PostList from '@/components/PostList.vue';
import PostForm from '@/components/PostForm.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { ref } from 'vue';

export default {
    components: {
        PostList,
        PostForm
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    setup(props) {
        const likes = ref(0);

        const setLikes = () => {
            likes.value += 1
        }

        return{
            likes,
            setLikes
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
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
    },
    computed:  {
        ...mapState({
            posts:  state => state.post.posts ,
            isPostsLoading: state => state.post.isPostsLoading ,
            selectedSort: state => state.post.selectedSort ,
            searchQuery: state => state.post.searchQuery ,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPage: state => state.post.totalPage,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchPosts: 'post/sortedAndSearchPosts'
        })
        
    },
}
</script>
<style>
    .app__btns {
        display: flex;
        justify-content: space-between;
    }
    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }
    .page {
        border: 1px solid black;
        padding: 10px;
        cursor: pointer;
    }
    .current-page {
        border: 2px solid teal;
    }
    .observer {
        height: 30px;
        background-color: teal;

    }
</style>