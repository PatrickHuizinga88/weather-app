import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'

// import { createMetaManager } from 'vue-meta'

library.add(fas)
// const metaManager = createMetaManager()

createApp(App)
        // .use(metaManager)
        .component('fa', FontAwesomeIcon)
        .mount('#app')