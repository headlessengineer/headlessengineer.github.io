import type { JSX } from 'react';
import type { Metadata } from 'next';
import { getConfig } from '../../lib/config-cache';
import { safeHref } from '../../lib/safeHref';
import { CoreServices } from '../../components/organisms/CoreServices';
import { TechMarquee } from '../../components/organisms/TechMarquee';
import { Expertise } from '../../components/organisms/Expertise';
import { Principles } from '../../components/organisms/Principles';
import { Certifications } from '../../components/organisms/Certifications';
import { CTA } from '../../components/organisms/CTA';
import { Panel } from '../../components/atoms/Panel';
import styles from './about.module.css';

export function generateMetadata(): Metadata {
  const { about } = getConfig();
  return {
    title: 'About',
    description: about.metadata.description,
    openGraph: {
      title: 'About',
      description: about.metadata.description,
    },
  };
}

export default function AboutPage(): JSX.Element {
  const { about } = getConfig();

  return (
    <>
      {about.sections.hero.visible && (
        <section className={styles.pageHero}>
          <div className={styles.heroContainer}>
            <span className={styles.eyebrow}>About</span>
            <h1 className={styles.heroTitle}>{about.hero.title}</h1>
            <p className={styles.heroBody}>{about.hero.subtitle}</p>
          </div>
        </section>
      )}

      {about.sections.coreServices.visible && <CoreServices coreServices={about.coreServices} />}

      {about.sections.howWeWork.visible && (
        <section className={styles.howWeWork}>
          <div className={styles.hwwContainer}>
            <Panel grid>
              <div>
                <span className={styles.eyebrow}>{about.howWeWork.title}</span>
                <h2 className={styles.panelHeading}>{about.howWeWork.description}</h2>
              </div>
              <p className={styles.panelBody}>{about.howWeWork.content}</p>
            </Panel>
          </div>
        </section>
      )}

      <TechMarquee />
      {about.sections.expertise.visible && <Expertise expertise={about.expertise} />}
      {about.sections.principles.visible && <Principles principles={about.principles} />}

      {about.sections.founder.visible && (
        <section className={styles.founderSection} aria-label="Behind the Company">
          <div className={styles.founderContainer}>
            <Panel grid>
              <div>
                <span className={styles.eyebrow}>Behind the Company</span>
                <div className={styles.founderName}>{about.founder.name}</div>
                <div className={styles.founderRole}>{about.founder.role}</div>
              </div>
              <div>
                <p className={styles.founderBio}>{about.founder.bio}</p>
                <a
                  href={safeHref(about.founder.href)}
                  className={styles.founderLink}
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn →
                </a>
              </div>
            </Panel>
          </div>
        </section>
      )}

      {about.sections.certifications.visible && <Certifications certifications={about.certifications} />}
      {about.sections.cta.visible && <CTA cta={about.cta} />}
    </>
  );
}
