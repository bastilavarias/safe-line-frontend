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

const services = [
    'Oral Prophylaxis',
    'Restoration',
    'Extraction',
    'Dentures',
    'Crowns',
];

function ServicesSlider() {
    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={50}
            visibleSlides={3}
            totalSlides={services.length}
            dragEnabled={false}
            step={3}
        >
            <Box className="slider-container">
                <Slider>
                    {services.map((service, index) => (
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
                                <Typography variant="caption">
                                    {service}
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

export default ServicesSlider;
