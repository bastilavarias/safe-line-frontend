import HomeAppBar from '../../parts/app-bars/HomeAppBar';
import { Box } from '@material-ui/core';
import LandingSection from './components/LandingSection';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';

function Home() {
    return (
        <Box>
            <HomeAppBar />
            <LandingSection />
            <Section1 />
            <Section2 />
            <Section3 />
        </Box>
    );
}

export default Home;
