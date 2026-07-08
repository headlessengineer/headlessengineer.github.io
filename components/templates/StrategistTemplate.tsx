import type { JSX } from 'react';
import Image from 'next/image';
import type { StrategistProfile } from '../../types/profile';
import { Tag } from '../atoms/Tag';
import styles from './StrategistTemplate.module.css';

const BANNER_SRC = '/images/branding/banner.png';

interface StrategistTemplateProps {
  profile: StrategistProfile;
}

export function StrategistTemplate({ profile }: StrategistTemplateProps): JSX.Element {
  const { personal, about, metrics, expertise, sectors, engagements, perspective, certifications, education, languages } = profile;

  return (
    <div className={styles.wrapper}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="str-name">
        <div className={styles.heroInner}>
          <div className={styles.brandBanner} aria-hidden="true">
            <Image src={BANNER_SRC} alt="" width={1416} height={124} className={styles.brandBannerImg} priority />
          </div>
          <div className={styles.heroBody}>
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
            <div className={styles.heroHead}>
              <span className={styles.heroRole}>{personal.role}</span>
              <span className={styles.heroYears}>{personal.yearsExperience}+ years</span>
            </div>
            <h1 id="str-name" className={styles.heroName}>{personal.displayName}</h1>
            <p className={styles.heroStatement}>{about.callout}</p>
            <span className={styles.heroLocation}>{personal.location}</span>
            <a href={`mailto:${personal.email}`} className={styles.heroEmail}>{personal.email}</a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section className={styles.aboutSection} aria-labelledby="str-about">
        <div className={styles.aboutInner}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <span className={styles.eyebrow} id="str-about">About</span>
              {about.paragraphs.map((p, i) => (
                <p key={i} className={styles.aboutPara}>{p}</p>
              ))}
            </div>
            <div className={styles.aboutSide}>
              {metrics.length > 0 && metrics.map((m) => (
                <div key={m.label} className={styles.metricItem}>
                  <span className={styles.metricValue}>{m.value}</span>
                  <span className={styles.metricLabel}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ─────────────────────────────────────────────────────── */}
      <section className={styles.expertiseSection} aria-labelledby="str-expertise">
        <div className={styles.expertiseInner}>
          <span className={styles.eyebrow} id="str-expertise">Expertise</span>
          <ol className={styles.expertiseList}>
            {expertise.map((item, i) => (
              <li key={i} className={styles.expertiseItem}>
                <span className={styles.expertiseNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.expertiseText}>{item}</span>
              </li>
            ))}
          </ol>
          {sectors.length > 0 && (
            <div className={styles.sectorsRow}>
              <span className={styles.sectorsLabel}>Sectors</span>
              <div className={styles.sectorsTags}>
                {sectors.map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── ENGAGEMENTS ───────────────────────────────────────────────────── */}
      {engagements.length > 0 && (
        <section className={styles.engagementsSection} aria-labelledby="str-engagements">
          <div className={styles.engagementsInner}>
            <span className={styles.eyebrow} id="str-engagements">Selected engagements</span>
            <div className={styles.engagementsGrid}>
              {engagements.map((e, i) => (
                <article key={i} className={styles.engagementCard}>
                  <p className={styles.engContext}>{e.context}</p>
                  <div className={styles.engChallenge}>
                    <span className={styles.engLabel}>Challenge</span>
                    <p className={styles.engText}>{e.challenge}</p>
                  </div>
                  <div className={styles.engOutcome}>
                    <span className={styles.engLabel}>Outcome</span>
                    <p className={styles.engText}>{e.outcome}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PERSPECTIVE ───────────────────────────────────────────────────── */}
      {perspective && (
        <section className={styles.perspectiveSection} aria-label="Point of view">
          <div className={styles.perspectiveInner}>
            <span className={styles.eyebrow}>Point of view</span>
            <blockquote className={styles.perspectiveQuote}>{perspective}</blockquote>
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
