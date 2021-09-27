import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#4F48EC",
                secondary: "#38D6EB",
                dark: "#100E34",
            },
        },
    },
});
