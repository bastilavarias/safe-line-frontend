import Vue from "vue";
import Vuex from "vuex";
import authenticationModule from "@/store/modules/authentication";
import clinicModule from "@/store/modules/clinic";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication: authenticationModule,
        clinic: clinicModule,
    },
});
