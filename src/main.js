import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyGoogleAutocomplete from "vuetify-google-autocomplete";
import * as VueGoogleMaps from "vue2-google-maps";
import apiService from "@/services/api";
import pusherService from "@/services/pusher";

Vue.config.productionTip = false;

apiService.init();
pusherService.init();

Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_API_KEY,
        libraries: "places",
    },
});

Vue.use(VuetifyGoogleAutocomplete, {
    vueGoogleMapsCompatibility: true,
});

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
