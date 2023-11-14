<template>
    <div>{{ $store.state.likes }}</div>
    <div>
        <my-button
        @click="$store.commit('decLikes')"
        >-
        </my-button>
        <my-button
        @click="$store.commit('incLikes')"
        >
            +
        </my-button>
    </div>
    <my-input
    v-model="searchQuery"
    />
    <div v-if="!isPostsLoading">
        <div class="app__btns">
            <my-button
            @click="showDialog"
            >
            <h1>Create a post</h1>
            </my-button>
            <my-select 
            v-model="selectedSort"
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
    <div v-intersection="loadMorePosts" class="observer">При пересечений происходит вызов функций</div>
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
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            sortOptions: [
                {value: 'title', name: 'by name'},
                {value: 'body', name: 'by body'},
                // {value: 'id', name: 'by id'}, доделать
                
            ]
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
        switchPage(pageNumber){
            this.page = pageNumber;
            this.fetchPosts()
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data;
                
            } catch (error) {
                alert(error)   
            }finally{
                this.isPostsLoading = false
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts,...response.data];
                
            } catch (error) {
                alert(error)   
            }
        },
    },
    mounted() {
        this.fetchPosts();
    },
    computed:  {
        sortedPost() {
            return [...this.posts].sort((post1,post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchPosts(){
            return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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