import Demo from './demo'

const components = {
    Demo,
}

const install = function (Vue) {
    if (install.installed) return
    Object.keys(components).forEach(key => {
        Vue.component(components[key].name, components[key])
    })
}

export {
    install,
    Demo,
}

export default {
    install,
    ...components,
}
