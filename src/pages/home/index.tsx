import React from 'react';

import { ContentWrapper, PageWrapper, Section } from '../../features/components';
import { useOnLoadScroll } from '../../app/helpers';
import Search from '../../features/search/Search';
import NowPlaying from './NowPlaying';
import TopRated from './TopRated';
import Header from '../Header';
import Footer from '../Footer';


/**
 * Renders homepage with movies search
 */
const Home: React.FC = () => {
  useOnLoadScroll();
  return (
    <PageWrapper>
      <Header hideHome />
      <ContentWrapper>
        <Section>
          <Search />
        </Section>
        <Section spacing="large" fullwidth darkBg>
          <NowPlaying />
        </Section>
        <Section spacing="large">
          <TopRated />
        </Section>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  )
}

export default Home;