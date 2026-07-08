import type { JSX } from 'react';
import Image from 'next/image';
import type { DeliveryProfile } from '../../types/profile';
import styles from './DeliveryTemplate.module.css';

const BANNER_SRC = '/images/branding/banner.png';

interface DeliveryTemplateProps {
  profile: DeliveryProfile;
}

export function DeliveryTemplate({ profile }: DeliveryTemplateProps): JSX.Element {
  const { personal, about, metrics, domains, deliveries, experience, certifications, education, languages } = profile;

  return (
    <div className={styles.wrapper}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="del-name">
        <div className={styles.heroInner}>
          <div className={styles.heroBody}>

            {/* Banner — spans both columns */}
            <div className={styles.brandBanner} aria-hidden="true">
              <Image src={BANNER_SRC} alt="" width={1416} height={124} className={styles.brandBannerImg} priority />
            </div>

            <div className={styles.heroLeft}>
              <div className={styles.avatar} aria-hidden="true">
                {personal.photo ? (
                  <Image
                    src={personal.photo}
                    alt={personal.displayName}
                    width={80}
                    height={80}
                    className={styles.avatarImg}
                  />
                ) : (
                  <span className={styles.avatarInitials}>
                    {personal.firstName[0]}{personal.lastName[0]}
                  </span>
                )}
              </div>
              <span className={styles.heroEyebrow}>{personal.role}</span>
              <h1 id="del-name" className={styles.heroName}>{personal.displayName}</h1>
              <p className={styles.heroBio}>{about.callout ?? about.paragraphs[0]}</p>
              <p className={styles.heroLocation}>{personal.location} · {personal.yearsExperience}+ years</p>
              <a href={`mailto:${personal.email}`} className={styles.heroEmail}>{personal.email}</a>
            </div>

            <div className={styles.heroRight} aria-label="Key metrics">
              {metrics.map((m) => (
                <div key={m.label} className={styles.heroMetric}>
                  <span className={styles.heroMetricValue}>{m.value}</span>
                  <span className={styles.heroMetricLabel}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOMAINS ───────────────────────────────────────────────────────── */}
      {domains.length > 0 && (
        <div className={styles.domainsStrip} aria-label="Domains">
          <div className={styles.domainsInner}>
            <span className={styles.domainsLabel}>Domain expertise</span>
            <ul className={styles.domainsList}>
              {domains.map((d) => (
                <li key={d} className={styles.domainItem}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── DELIVERIES ────────────────────────────────────────────────────── */}
      {deliveries.length > 0 && (
        <section className={styles.deliveriesSection} aria-labelledby="del-deliveries">
          <div className={styles.deliveriesInner}>
            <span className={styles.eyebrow} id="del-deliveries">Selected deliveries</span>
            <div className={styles.deliveriesGrid}>
              {deliveries.map((d, i) => (
                <article key={i} className={styles.deliveryCard}>
                  <div className={styles.deliveryHeader}>
                    <h3 className={styles.deliveryName}>{d.name}</h3>
                    <span className={styles.deliveryTech}>{d.tech}</span>
                  </div>
                  <p className={styles.deliveryScope}>{d.scope}</p>
                  <div className={styles.deliveryOutcomeRow}>
                    <span className={styles.deliveryOutcomeLabel}>Result</span>
                    <p className={styles.deliveryOutcome}>{d.outcome}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXPERIENCE ────────────────────────────────────────────────────── */}
      {experience.length > 0 && (
        <section className={styles.experienceSection} aria-labelledby="del-exp">
          <div className={styles.experienceInner}>
            <span className={styles.eyebrow} id="del-exp">Career</span>
            <div className={styles.timeline}>
              {experience.map((item) => (
                <div key={`${item.company}-${item.dates}`} className={styles.timelineItem}>
                  <span className={styles.timelineDates}>{item.dates}</span>
                  <div className={styles.timelineBody}>
                    <h4 className={styles.timelineTitle}>{item.title}</h4>
                    <span className={styles.timelineCompany}>{item.company} · {item.location}</span>
                    {item.bullets.length > 0 && (
                      <ul className={styles.timelineBullets}>
                        {item.bullets.map((b, idx) => (
                          <li key={idx} className={styles.timelineBullet}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CREDENTIALS ───────────────────────────────────────────────────── */}
      <section className={styles.credSection} aria-label="Credentials">
        <div className={styles.credInner}>
          <div className={styles.credGrid}>
            <div>
              <h3 className={styles.credLabel}>Certifications</h3>
              <ul className={styles.certList}>
                {certifications.map((c) => (
                  <li key={c.name} className={styles.certItem}>
                    <span className={styles.certName}>{c.name}</span>
                    <span className={styles.certMeta}>{c.issuer} · {c.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {education.map((e) => e.degree && (
                <div key={e.degree} className={styles.eduBlock}>
                  <h3 className={styles.credLabel}>Education</h3>
                  <span className={styles.eduDegree}>{e.degree}</span>
                  <span className={styles.eduInst}>
                    {e.institution}{e.years ? ` · ${e.years}` : ''}{e.grade ? ` · ${e.grade}` : ''}
                  </span>
                </div>
              ))}
              {languages.length > 0 && (
                <>
                  <h3 className={styles.credLabel}>Languages</h3>
                  {languages.map((l) => (
                    <div key={l.name} className={styles.langRow}>
                      <span className={styles.langName}>{l.name}</span>
                      <span className={styles.langLevel}>{l.level}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
