<template>
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
</template>

<style scoped>
.map {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
}
</style>
