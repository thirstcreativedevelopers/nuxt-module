import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
    if(!process.env.GA) {
        return
    }
    Vue.use(
        VueGtag,
        {
            config: { id: process.env.GA },
        },
        app.router
    )
}
