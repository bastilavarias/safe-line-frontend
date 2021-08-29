import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100vh',
    },
}));

const position = [14.5995, 120.9842];

function ClinicLocator() {
    const classes = useStyles();

    return (
        <MapContainer
            center={position}
            zoom={25}
            scrollWheelZoom={false}
            className={classes.root}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default ClinicLocator;
