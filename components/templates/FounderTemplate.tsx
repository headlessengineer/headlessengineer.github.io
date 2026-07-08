import type { JSX } from 'react';
import Image from 'next/image';
import type { FounderProfile } from '../../types/profile';
import styles from './FounderTemplate.module.css';


interface FounderTemplateProps {
  profile: FounderProfile;
}

export function FounderTemplate({ profile }: FounderTemplateProps): JSX.Element {
  const { personal, about, metrics, philosophy, capabilities, work, experience, certifications, education, languages } = profile;

  return (
    <div className={styles.wrapper}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="founder-name">

        <div className={styles.heroInner}>

          {/* Photo — right edge of heroInner container */}
          {personal.photo && (
            <div className={styles.heroPhotoWrap} aria-hidden="true">
              <Image
                src={personal.photo}
                alt=""
                fill
                className={styles.heroPhoto}
                priority
              />
            </div>
          )}

          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>{personal.role}</span>
            <h1 id="founder-name" className={styles.heroName}>
              <span>{personal.firstName}</span>
              <span>{personal.lastName}</span>
            </h1>
            <p className={styles.heroCallout}>{about.callout}</p>
            <p className={styles.heroLead}>{about.paragraphs[0]}</p>
            <div className={styles.heroMeta}>
              <span>{personal.location}</span>
              <span aria-hidden="true">·</span>
              <span>{personal.yearsExperience}+ years</span>
              {personal.github && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{personal.github}</span>
                </>
              )}
            </div>
            <a href={`mailto:${personal.email}`} className={styles.heroEmail}>
              {personal.email}
            </a>
          </div>
        </div>
      </section>

      {/* ── METRICS ──────────────────────────────────────────────────────── */}
      {metrics.length > 0 && (
        <div className={styles.metricsStrip} aria-label="Key metrics">
          <div className={styles.metricsInner}>
            {metrics.map((m) => (
              <div key={m.label} className={styles.metricItem}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PHILOSOPHY ───────────────────────────────────────────────────── */}
      {philosophy.length > 0 && (
        <section className={styles.philosophy} aria-label="Engineering philosophy">
          <div className={styles.philosophyInner}>
            <span className={styles.sectionEyebrow}>Principles</span>
            <ol className={styles.principlesList}>
              {philosophy.map((p, i) => (
                <li key={i} className={styles.principleItem}>
                  <span className={styles.principleNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.principleText}>{p}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      {capabilities.length > 0 && (
        <section className={styles.capabilities} aria-labelledby="founder-caps">
          <div className={styles.capabilitiesInner}>
            <span className={styles.sectionEyebrow} id="founder-caps">What I do</span>
            <div className={styles.capGrid}>
              {capabilities.map((cap) => (
                <div key={cap.area} className={styles.capCard}>
                  <h3 className={styles.capArea}>{cap.area}</h3>
                  <ul className={styles.capList}>
                    {cap.items.map((item) => (
                      <li key={item} className={styles.capItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SELECTED WORK ────────────────────────────────────────────────── */}
      {work.length > 0 && (
        <section className={styles.work} aria-labelledby="founder-work">
          <div className={styles.workInner}>
            <span className={styles.sectionEyebrow} id="founder-work">Selected work</span>
            <div className={styles.workList}>
              {work.map((item, i) => (
                <div key={item.name} className={styles.workItem}>
                  <span className={styles.workNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.workBody}>
                    <h3 className={styles.workName}>{item.name}</h3>
                    <span className={styles.workStack}>{item.stack}</span>
                    <p className={styles.workContext}>{item.context}</p>
                  </div>
                  <div className={styles.workOutcome}>
                    <span className={styles.workOutcomeLabel}>outcome</span>
                    <p className={styles.workOutcomeText}>{item.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      {experience.length > 0 && (
        <section className={styles.historySection} aria-labelledby="founder-history">
          <div className={styles.historyInner}>
            <span className={styles.sectionEyebrow} id="founder-history">History</span>
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

      {/* ── CREDENTIALS ──────────────────────────────────────────────────── */}
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
                <div className={styles.langBlock}>
                  <h3 className={styles.credLabel}>Languages</h3>
                  {languages.map((l) => (
                    <div key={l.name} className={styles.langRow}>
                      <span className={styles.langName}>{l.name}</span>
                      <span className={styles.langLevel}>{l.level}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
