import { Box, Typography } from '@material-ui/core';
import {
    ButtonBack,
    ButtonNext,
    CarouselProvider,
    Slider,
    Slide as PRCSlide,
} from 'pure-react-carousel';
import { ChevronLeftRounded, ChevronRightRounded } from '@material-ui/icons';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './slider.scss';

const doctors = [
    {
        name: 'Dr. John Doe',
        service: 'Dentist',
    },
];

function Doctor() {
    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={50}
            visibleSlides={3}
            totalSlides={doctors.length}
            dragEnabled={false}
            step={3}
        >
            <Box className="slider-container">
                <Slider>
                    {doctors.map((doctor, index) => (
                        <PRCSlide index={index}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Box
                                    width="3rem"
                                    height="3rem"
                                    borderRadius="50%"
                                    bgcolor="primary.main"
                                    mb={1}
                                />
                                <Typography variant="subtitle2" display="block">
                                    {doctor.name}
                                </Typography>
                                <Typography variant="caption">
                                    {doctor.service}
                                </Typography>
                            </Box>
                        </PRCSlide>
                    ))}
                </Slider>
                <ButtonBack className="slider-button slider-button__back">
                    <ChevronLeftRounded fontSize="medium" />
                </ButtonBack>
                <ButtonNext className="slider-button slider-button__next">
                    <ChevronRightRounded fontSize="medium" />
                </ButtonNext>
            </Box>
        </CarouselProvider>
    );
}

export default Doctor;
