import type { JSX } from 'react';
import Image from 'next/image';
import type { EngineerProfile } from '../../types/profile';
import { Tag } from '../atoms/Tag';
import styles from './EngineerTemplate.module.css';

const BANNER_SRC = '/images/branding/banner.png';

interface EngineerTemplateProps {
  profile: EngineerProfile;
}

export function EngineerTemplate({ profile }: EngineerTemplateProps): JSX.Element {
  const { personal, about, metrics, stack, practices, projects, experience, certifications, education, languages } = profile;

  return (
    <div className={styles.wrapper}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="eng-name">
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
            <span className={styles.heroTag} aria-hidden="true">
              {`{ id: "${personal.firstName.toLowerCase()}.${personal.lastName.toLowerCase()}" }`}
            </span>
            <h1 id="eng-name" className={styles.heroName}>{personal.displayName}</h1>
            <p className={styles.heroRole}>{personal.role}</p>
            <p className={styles.heroBio}>{about.callout ?? about.paragraphs[0]}</p>
            <div className={styles.heroMeta}>
              <span>{personal.location}</span>
              <span aria-hidden="true">·</span>
              <span>{personal.yearsExperience}+ yrs</span>
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

      {/* ── METRICS BAR ──────────────────────────────────────────────────── */}
      {metrics.length > 0 && (
        <div className={styles.metricsBar} aria-label="Key metrics">
          <div className={styles.metricsBarInner}>
            {metrics.map((m) => (
              <div key={m.label} className={styles.metricItem}>
                <span className={styles.metricValue}>{m.value}</span>
                <span className={styles.metricLabel}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── STACK ─────────────────────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="eng-stack">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Stack</span>
            <h2 id="eng-stack" className={styles.sectionTitle}>Technology</h2>
          </div>
          <div className={styles.stackMatrix}>
            {stack.map((group) => (
              <div key={group.group} className={styles.stackCol}>
                <div className={styles.stackBar} aria-hidden="true" />
                <div className={styles.stackBody}>
                  <h3 className={styles.stackGroupLabel}>{group.group}</h3>
                  <ul className={styles.stackList}>
                    {group.chips.map((chip) => (
                      <li key={chip} className={styles.stackChip}>{chip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {practices.length > 0 && (
            <div className={styles.practicesRow}>
              <span className={styles.practicesLabel}>Practices</span>
              <div className={styles.practicesTags}>
                {practices.map((p) => (
                  <Tag key={p} label={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="eng-projects">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Work</span>
            <h2 id="eng-projects" className={styles.sectionTitle}>Projects</h2>
          </div>
          <div className={styles.projectsGrid}>
            {projects.map((p) => (
              <article key={p.name} className={styles.projectCard}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectName}>{p.name}</h3>
                  <span className={styles.projectRole}>{p.role}</span>
                </div>
                <span className={styles.projectStack}>{p.stack}</span>
                <p className={styles.projectDesc}>{p.description}</p>
                <span className={styles.projectOutcome}>{p.outcome}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────────────── */}
      <section className={styles.section} aria-labelledby="eng-exp">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>History</span>
            <h2 id="eng-exp" className={styles.sectionTitle}>Experience</h2>
          </div>
          <div className={styles.timeline}>
            {experience.map((item) => (
              <div key={`${item.company}-${item.dates}`} className={styles.timelineItem}>
                <span className={styles.timelineDates}>{item.dates}</span>
                <div className={styles.timelineBody}>
                  <h4 className={styles.timelineTitle}>{item.title}</h4>
                  <span className={styles.timelineCompany}>{item.company} · {item.location}</span>
                  {item.bullets.length > 0 && (
                    <ul className={styles.timelineBullets}>
                      {item.bullets.map((b, i) => (
                        <li key={i} className={styles.timelineBullet}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDENTIALS ───────────────────────────────────────────────────── */}
      <section className={styles.section} aria-label="Credentials">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionEyebrow}>Credentials</span>
            <h2 className={styles.sectionTitle}>Credentials</h2>
          </div>
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
