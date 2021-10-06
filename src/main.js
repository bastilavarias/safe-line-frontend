import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import apiService from "@/services/api";

Vue.config.productionTip = false;

apiService.init();

Vue.use(VuetifyGoogleAutocomplete, {
    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    installComponents: true,
});

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
