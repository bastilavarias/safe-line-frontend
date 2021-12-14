import { gmapApi, MapElementFactory } from "vue2-google-maps";

const props = {
    options: {
        type: Object,
        twoWay: false,
        default: () => {},
    },
    data: {
        type: Array,
        twoWay: true,
    },
};

const events = [];

export default MapElementFactory({
    name: "heatmap",
    ctr: () => gmapApi().maps.visualization.HeatmapLayer,
    events: events,
    mappedProps: props,
});
