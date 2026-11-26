import CallToAction from 'src/Components/CallToAction/CallToAction';
import Showcase from 'src/Components/Showcase/Showcase';
import SiteHeader from 'src/Components/SiteHeader/SiteHeader';
import SkipLink from 'src/Components/SkipLink/SkipLink';
import { happyFlow } from 'src/Content/happyFlow';

export default function App() {
    return (
        <div id='top'>
            <SkipLink />
            <SiteHeader />
            <main id='main' tabIndex={-1} className='outline-none'>
                <Showcase steps={happyFlow} />
                {/* Met de footer erin: de roze boog onderaan draagt de store-knoppen en de footer. */}
                <CallToAction />
            </main>
        </div>
    );
}
