import Vue from "vue";
import Vuex from "vuex";
import authenticationModule from "@/store/modules/authentication";
import clinicModule from "@/store/modules/clinic";
import chatModule from  "@/store/modules/chat";
import interfaceModule from "@/store/modules/interfaceModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication: authenticationModule,
        clinic: clinicModule,
        chat: chatModule,
        interface: interfaceModule,
    },
});
