import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        count: 123
    },
    getters: {
        countreturn(state)
        {
            return state.count
        }
    }
});


