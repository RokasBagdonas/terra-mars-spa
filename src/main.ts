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

const app = createApp(App);

//Glboal properties
app.config.globalProperties.auth = new AuthService();

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

app.use(router);
app.mount('#app');
