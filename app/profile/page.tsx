import type { JSX } from 'react';
import type { Metadata } from 'next';
import { PageHero } from '../../components/organisms/PageHero';
import { Panel } from '../../components/atoms/Panel';
import { CardRows, CardRow } from '../../components/atoms/CardRows';
import { ServiceCard } from '../../components/molecules/ServiceCard';
import { TeamCardGrid } from '../../components/organisms/TeamCardGrid';
import type { TeamMember } from '../../components/organisms/TeamCardGrid';
import { getAllProfiles } from '../../lib/profile';
import styles from './profile.module.css';

export const metadata: Metadata = {
  title: 'Team',
  description: "A small, distributed team of senior practitioners. No hierarchy for hierarchy's sake — just people who ship.",
};

const PHILOSOPHY_POINTS = [
  'Each person owns their domain end-to-end and operates without hand-holding.',
  'Outcomes over process. We optimise for shipped, not busy.',
  'Small and distributed is a feature, not a constraint.',
  'We leave codebases, teams, and systems better than we found them.',
] as const;

const HOW_WE_WORK = [
  {
    title: 'Remote-first',
    description: "Async by default. We show up when it matters and disappear when it doesn't.",
  },
  {
    title: 'One accountable engineer',
    description: 'Each engagement has a single point of ownership from discovery to ship. No diffusion of responsibility.',
  },
  {
    title: 'Direct communication',
    description: "No status theatre. If there's a problem, you'll hear it from us before it's a crisis.",
  },
  {
    title: 'Engineering discipline',
    description: 'Tests, documented decisions, and systems that can survive the author leaving.',
  },
] as const;

const PLACEHOLDER_TOTAL = 16;

function shuffledRange(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = tmp;
  }
  return arr;
}

function buildMembers(): TeamMember[] {
  const profiles = getAllProfiles();
  const slots = shuffledRange(PLACEHOLDER_TOTAL);
  let si = 0;

  const realMembers: TeamMember[] = profiles.map((p) => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    role: p.role,
    statement: p.statement,
    photo: p.photo,
    github: p.github,
    linkedin: p.linkedin,
    // profiles with a real photo don't consume a slot
    placeholderIndex: p.photo ? 1 : (slots[si++] ?? 1),
  }));

  // All remaining placeholder photos become anonymous HEADLESS ENGINEER slots
  const heMembers: TeamMember[] = slots.slice(si).map((idx) => ({
    id: '',
    firstName: 'Headless',
    lastName: 'Engineer',
    role: '',
    statement: '',
    photo: null,
    github: null,
    linkedin: null,
    placeholderIndex: idx,
  }));

  return [...realMembers, ...heMembers];
}

export default function TeamPage(): JSX.Element {
  const members = buildMembers();

  return (
    <>
      <PageHero
        eyebrow="Team"
        title="The people behind the work."
        description="A small, distributed team of senior practitioners. No hierarchy for hierarchy's sake — just people who ship."
      />

      {/* Philosophy — Panel grid (reuses existing Panel component) */}
      <section className={styles.philosophy} aria-labelledby="philosophy-heading">
        <div className={styles.hwwContainer}>
          <Panel grid>
            <div>
              <span className={styles.eyebrow}>Philosophy</span>
              <h2 id="philosophy-heading" className={styles.panelHeading}>
                We are a small, distributed team of senior practitioners.
              </h2>
            </div>
            <ul className={styles.philosophyList} role="list">
              {PHILOSOPHY_POINTS.map((point) => (
                <li key={point} className={styles.philosophyItem}>
                  <span className={styles.philosophyMarker} aria-hidden="true">—</span>
                  <p className={styles.philosophyText}>{point}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>

      {/* How We Work — ServiceCard rows (same pattern as Principles / Expertise / CoreServices) */}
      <section className={styles.howWeWork} aria-labelledby="how-we-work-heading">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>How we work</span>
            <h2 id="how-we-work-heading" className={styles.heading}>
              Remote-first. Outcome-oriented. No theatre.
            </h2>
          </div>
          <CardRows>
            <CardRow cols={2}>
              <ServiceCard title={HOW_WE_WORK[0].title} description={HOW_WE_WORK[0].description} />
              <ServiceCard title={HOW_WE_WORK[1].title} description={HOW_WE_WORK[1].description} />
            </CardRow>
            <CardRow cols={2}>
              <ServiceCard title={HOW_WE_WORK[2].title} description={HOW_WE_WORK[2].description} />
              <ServiceCard title={HOW_WE_WORK[3].title} description={HOW_WE_WORK[3].description} />
            </CardRow>
          </CardRows>
        </div>
      </section>

      {/* Team — Cinema card grid */}
      <section className={styles.teamSection} aria-labelledby="team-heading">
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>The Team</span>
            <h2 id="team-heading" className={styles.heading}>Built to ship.</h2>
          </div>
          <div className={styles.teamGrid}>
            <TeamCardGrid members={members} variant={4} />
          </div>
        </div>
      </section>
    </>
  );
}
