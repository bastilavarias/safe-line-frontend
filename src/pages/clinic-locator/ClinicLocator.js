import { makeStyles } from '@material-ui/core/styles';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import SearchTextField from './SearchTextField';

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
    },

    mapContainer: {
        width: '100%',
        height: '100vh',
        position: 'relative',
    },
}));

function ClinicLocator() {
    const classes = useStyles();
    const [positions, setPositions] = useState([14.5386, 121.0574]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPositions([position.coords.latitude, position.coords.longitude]);
        });
    });

    return (
        <Box className={classes.root}>
            <MapContainer
                center={positions}
                zoom={25}
                scrollWheelZoom={true}
                className={classes.mapContainer}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={positions}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            <SearchTextField />
        </Box>
    );
}

export default ClinicLocator;
