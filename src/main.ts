// Base
import camelCase from "lodash/camelCase";

// Utilities
import upperFirst from "lodash/upperFirst";
import {createApp} from 'vue';
import App from './App.vue';

// Created
import "./css/main.scss";
import router from './router';

// Other
import AuthService from "./auth/AuthService";

//fontawesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {faTimes, faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'


const app = createApp(App);

library.add(faAngleDown, faTimes);
app.component("font-awesome-icon", FontAwesomeIcon);

// ============================================================================
const requireComponent = require.context(
  "./components/form-components/",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )

  app.component(componentName, componentConfig.default || componentConfig)
})

//auth ========================================================================
let auth = new AuthService();
app.config.globalProperties.auth = auth;



app.use(router);
app.mount('#app');
export default auth;
