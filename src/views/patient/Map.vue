<template>
    <section>
        <v-toolbar width="30rem" class="diagnose-toolbar">
            <v-text-field
                placeholder="Look for Clinics... "
                hide-details
                prepend-icon="mdi-doctor"
                single-line
                readonly
                outlined
                dense
                class="mr-2"
            ></v-text-field>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-toolbar>
        <GmapMap
            :center="{ lat: 14.6142909, lng: 120.9612243 }"
            :zoom="12"
            map-type-id="terrain"
            class="map"
        >
            <!--        <GmapMarker-->
            <!--            :key="index"-->
            <!--            v-for="(m, index) in markers"-->
            <!--            :position="m.position"-->
            <!--            :clickable="true"-->
            <!--            :draggable="true"-->
            <!--            @click="center = m.position"-->
            <!--        />-->
        </GmapMap>
    </section>
</template>

<style scoped>
.map {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 1;
}

.diagnose-toolbar {
    position: fixed;
    top: 3%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}
</style>
