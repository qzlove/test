import Com from './src/main.vue'

Com.install = Vue => {
    Vue.component(Com.name, Com)
}

export default Com
