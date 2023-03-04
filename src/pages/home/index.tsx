import React from "react";

import { Section } from "../../features/components";
import Search from "../../features/search/Search";
import NowPlaying from "./NowPlaying";
import TopRated from "./TopRated";
import { useDocumentTitle } from "../../app/helpers";

/**
 * Renders homepage with movies search
 */
const Home: React.FC = () => {
  useDocumentTitle();

  return (
    <>
      <Section>
        <Search />
      </Section>
      <Section spacing="large" fullwidth darkBg>
        <NowPlaying />
      </Section>
      <Section spacing="large">
        <TopRated />
      </Section>
    </>
  );
};

export default Home;
