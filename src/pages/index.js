import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <a href="https://sites.google.com/view/coinseminar21/home">COINS 2021</a>,
    imageUrl: "img/eco_wifi_pollution.svg",
    description: (
      <>
        This platform was established in the context of the MIT, University of
        Cologne, University of Bamberg, HSLU Collaborative Innovation Networks
        seminar. This page serves as a platform for documentation and to
        exchange knowledge.
      </>
    ),
  },
  {
    title: <a href="docs/doc3">Knowledge</a>,
    imageUrl: "img/eco_green_house.svg",
    description: (
      <>
        We want to provide a platform for documentation and exchange on how to
        work on the topic of plants as biosensors. Everyone is welcome to
        contribute or use the gathered information.
      </>
    ),
  },
  {
    title: <a href="docs/doc2">Plant Spikerbox</a>,
    imageUrl: "img/eco_plant_green_icon.svg",
    description: (
      <>
        For our experiments we use the Plant SpikerBox by BackyardBrains. It
        makes it possible to measure the plant's electric responses to different
        stimuli. We show how to use the box and gather useful information about
        the box and its usage.
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/doc1")}
            >
              About our Project
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
