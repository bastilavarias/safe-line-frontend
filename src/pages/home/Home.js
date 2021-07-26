import HomeAppBar from '../../parts/app-bars/HomeAppBar';
import { Box } from '@material-ui/core';
import LandingSection from './components/LandingSection';
import Section1 from './components/Section1';

function Home() {
    return (
        <Box>
            <HomeAppBar />
            <LandingSection />
            <Section1 />
        </Box>
    );
}

export default Home;
