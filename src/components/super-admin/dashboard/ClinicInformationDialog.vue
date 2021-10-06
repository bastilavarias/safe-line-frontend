<template>
    <v-dialog v-model="isOpenLocal" width="800">
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-list-item two-line>
                <v-list-item-avatar :size="150">
                    <v-img
                        :src="
                            require('@/assets/placeholder/clinic-information.png')
                        "
                    ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="display-1 font-weight-bold">{{
                        information.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                        <div>
                            <v-row dense>
                                <v-col cols="6">
                                    <v-list-item two-line>
                                        <v-list-item-icon>
                                            <v-icon color="primary"
                                                >mdi-clock-outline</v-icon
                                            >
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                class="
                                                    success--text
                                                    mb-2
                                                    font-weight-bold
                                                "
                                                >Opens at:
                                                {{
                                                    formatSimpleTime(
                                                        information.opening_time
                                                    )
                                                }}</v-list-item-title
                                            >
                                            <v-list-item-title
                                                class="
                                                    error--text
                                                    mb-2
                                                    font-weight-bold
                                                "
                                                >Closes at:
                                                {{
                                                    formatSimpleTime(
                                                        information.closing_time
                                                    )
                                                }}</v-list-item-title
                                            >
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="6"></v-col>
                            </v-row>
                        </div>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-dialog>
</template>

<script>
import timeMixin from "@/mixins/timeMixin";

export default {
    name: "super-admin-dashboard-clinic-information-dialog",

    props: {
        isOpen: Boolean,
        information: Object,
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
        };
    },

    mixins: [timeMixin],

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },
    },
};
</script>
