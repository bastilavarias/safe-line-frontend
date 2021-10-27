import Vue from "vue";
import Vuex from "vuex";
import authenticationModule from "@/store/modules/authentication";
import clinicModule from "@/store/modules/clinic";
import interfaceModule from "@/store/modules/interfaceModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication: authenticationModule,
        clinic: clinicModule,
        interface: interfaceModule,
    },
});
