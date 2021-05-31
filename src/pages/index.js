import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Documentation</>,
    imageUrl: 'img/eco_green_house.svg',
    description: (
      <>
        The page serves as a plattform for documentation and to exchange knowledge.
        Everyone is welcome to contribute or use the information we gather.
      </>
    ),
  },
  {
    title: <>Plants Spikerbox</>,
    imageUrl: 'img/eco_plant_green_icon.svg',
    description: (
      <>
        For mesuring reactions of plants we use the "Plant Spikerbox" from backyardbrains. 
        On this plattform we also show how to use this box and gather all information about the box and the usage.
      </>
    ),
  },
  {
    title: <>COINs 2021</>,
    imageUrl: 'img/eco_wifi_pollution.svg',
    description: (
      <>
        The group of this project was formed in the COINs seminar 2021 and the plattform was also designed for usage in future COIN seminar.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
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
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/doc1')}>
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
