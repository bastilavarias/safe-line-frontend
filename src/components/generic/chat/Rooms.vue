<template>
    <div class="rooms">
        <v-row no-gutters class="rooms__sticky-content">
            <v-col cols="12" class="rooms__sticky-content__toolbar">
                <v-card flat tile>
                    <v-card-title>Messages</v-card-title>
                    <v-card-text>
                        <v-text-field
                            outlined
                            placeholder="Search"
                            dense
                            prepend-inner-icon="mdi-magnify"
                            hide-details
                        ></v-text-field>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card flat>
                    <v-card-subtitle>
                        <v-icon>mdi-chevron-down</v-icon>
                        <span class="font-weight-bold">
                            Clinic Name Chats
                        </span>
                    </v-card-subtitle>
                    <v-list rounded v-model="list1">
                        <v-list-item two-line>
                            <v-list-item-avatar :size="50">
                                <v-img
                                    :src="
                                        require('@/assets/placeholder/clinic-information.png')
                                    "
                                ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="font-weight-bold"
                                    >Clinic Name</v-list-item-title
                                >
                                <v-list-item-subtitle
                                    >You: Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Asperiores,
                                    quaerat?</v-list-item-subtitle
                                >
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card flat>
                    <v-card-subtitle>
                        <v-icon>mdi-chevron-down</v-icon>
                        <span class="font-weight-bold"> Patients </span>
                    </v-card-subtitle>
                    <v-list rounded v-model="list1">
                        <template v-for="n in 10">
                            <v-list-item two-line :key="n">
                                <v-list-item-avatar :size="50">
                                    <v-img
                                        :src="
                                            require('@/assets/placeholder/clinic-information.png')
                                        "
                                    ></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-bold"
                                        >Patient Name</v-list-item-title
                                    >
                                    <v-list-item-subtitle
                                        >You: Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit.
                                        Asperiores,
                                        quaerat?</v-list-item-subtitle
                                    >
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "generic-chat-rooms",

    data() {
        return {
            list1: 1,
        };
    },
};
</script>

<style lang="scss">
.rooms {
    height: 100vh;
    border-right: 1px solid #b0b0b0;
    overflow: auto;

    &__sticky-content {
        height: 100%;

        &__toolbar {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 1;
        }
    }
}
</style>
