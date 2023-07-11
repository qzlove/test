import { createStore } from 'vuex'

export default createStore({
    // 全局状态初始值
    state: {
        list: [
            {
                title: '吃饭',
                complete: false
            },
            {
                title: '睡觉',
                complete: false
            },
            {
                title: '洗澡',
                complete: true
            }
        ]
    },
    // 实时获取state对应的值，在其它组件中，用getters.定义好的方法名来使用getters里面定义好的方法，如果是调用modules里面的模块里面的对应getters里面的方法，则用getters["模块名/定义好的方法名"]
    getters: {
        getList(state) {
            return state.list
        }
    },
    // 更新状态的方法。在其它组件中，用commit触发mutations里面定义好的方法
    mutations: {
    },
    // 可以异步操作，可以返回promise，在其它组件中，用dispatch触发actions里面定义好的方法，然后这里面的方法又通过第一个参数ctx调用commit触发mutations里面定义好的方法，如果是调用modules里面的模块里面的对应actions里面的方法，dispatch第一个参数需要'模块名/定义好的方法名'
    actions: {
    },
    // state数据比较多的时候，分模块，即存在多个自定义store.js，格式例如下
    // export default{
    //   namespaced: true,// 使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接
    // state: {
    // },
    // getters: {
    // },
    // ...
    // }
    // 本文件引入
    // import xx from "自定义store.js"
    // modules: {
    //   xx
    // }
    modules: {
    },
})
