import { createStore } from "vuex";

export default createStore({
    state: {
        likes: 2
    },
    getters: {
        doubleLikes(state) {
            return state.likes * 2  
        }
    },
    mutations: {
        incLikes(state) {
            state.likes += 2
        },
        decLikes(state){
            state.likes -= 2
        }
    },
    actions: {

    },
    modules: {

    }
})