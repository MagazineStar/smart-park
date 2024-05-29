import { loginAPI } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  // 模块内的命名空间，命名空间可以防止命名冲突
  namespaced: true,
  // 模块内的state写法： 推荐是个函数写法、但是写对象也行
  state: {
    token: getToken() || ''
  },
  mutations: {
    // mutations中方法 只有一种调用方式 store.commit('mutations方法名') 并没有 方法名() 这种调用方式
    setToken(state, newToken) {
      state.token = newToken
      setToken(newToken)
    },
    removeToken(state) {
      // 清空Vuex中的token
      state.token = ''
      // 清空cookie中的token
      removeToken()
    }
  },
  actions: {
    async loginAction(store, data) {
      const res = await loginAPI(data)
      // console.log(res.data.token)
      store.commit('setToken', res.data.token)
    }
  },
  getters: {

  }

}
// 使用语法 ： 如何在组件中使用子模块的各个数据和方法
// 1.使用state中的数据
// 使用场景 ： 如果组件中移除使用了state中的数据就可以直接使用$store方法获取数据
//            如果组件中多处使用state中的数据，可以使用辅助函数
// $store方法: this.$store.state.user.XXX
// 辅助函数： import { mapState } from 'vuex'
//           computed: {
//              ..mapState('模块名',['属性1','属性2',...])
//           }

// 2.使用getters中的数据
// this.$store.getters['user/getters方法名']
// import { mapGetters } from 'vuex'
// computed: {
//   ...mapGetters('模块名',['getters方法名1'...])
// }

// 3.使用mutations的方法
// this.$store.commit('模块名/方法名',参数) 参数只能传一个
// import { mapMutations } from 'vuex'
// methods: {
//   ...mapMutations('模块名',['方法名1',...])
// }

// 4.使用actions的方法
// this.$store.dispatch('模块名/方法名',参数) 参数只能传一个
// import { mapActions } from 'vuex'
// methods: {
//   ...mapActions('模块名',['方法名1',...])

// }
