import { Typography, Box, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect } from 'react';
import psgcService from '../../../../../services/psgcService';

function AddressInfo() {
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);

    const handleRegionChange = async (_, newValue) => {
        const { code } = newValue;
        const cities = await psgcService.getCities(code);
        setCities(cities);
    };

    useEffect(() => {
        async function getRegions() {
            const regions = await psgcService.getRegions();
            setRegions(regions);
        }

        getRegions();
    }, []);

    return (
        <Box py={3}>
            <Box mb={4}>
                <Typography variant="h4">
                    <Box fontWeight="bold">Address Information</Box>
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        label="Street Address"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={regions}
                        getOptionLabel={(option) => option.regionName}
                        fullWidth
                        onChange={handleRegionChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Region"
                                variant="outlined"
                                autoComplete="off"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="City"
                                variant="outlined"
                                autoComplete="off"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Zip Code" variant="outlined" fullWidth />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddressInfo;
