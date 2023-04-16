import { createStore } from 'vuex'

const store = createStore({
  state: {
      userId:null
  },
  mutations: {
    setUserId(state, num) {
      localStorage.setItem('userId',num);
      state.userId = num
    }
  },
  // getters :{
  //   getUserId: (state) => {
  //     state.userId = localStorage.getItem('userId');
  //     return state.userId;
  //   }
  // }
})

export default store

// import { createStore } from 'vuex'
// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })

// export default createStore({
//   state: {
//     userId:0
//   },
//   mutations: {},
//   actions: {},
//   plugins: [vuexLocal.plugin]
// })