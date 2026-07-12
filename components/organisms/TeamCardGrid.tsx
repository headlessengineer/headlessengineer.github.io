'use client';

import { useState } from 'react';
import type { JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../atoms/Button';
import styles from './TeamCardGrid.module.css';

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  statement: string;
  photo: string | null;
  github: string | null;
  linkedin: string | null;
  placeholderIndex: number;
}

export type CardVariant = 1 | 2 | 3 | 4 | 5;

interface TeamCardGridProps {
  members: TeamMember[];
  variant: CardVariant;
}

const INITIAL_COUNT = 3;

function resolvePhoto(photo: string | null, placeholderIndex: number): string {
  return photo ?? `/images/people/placeholders/${placeholderIndex}.png`;
}

function toExternalHref(url: string | null): string {
  if (!url) return '#';
  return url.startsWith('http') ? url : `https://${url}`;
}

function GitHubIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CTACard({ newIndex }: { newIndex: number }): JSX.Element {
  return (
    <article
      className={`${styles.card} ${styles.ctaCard} ${styles.cardReveal}`}
      data-variant="4"
      style={{ animationDelay: `${newIndex * 60}ms` }}
    >
      {/* Wordmark watermark — decorative, not a link */}
      <div className={styles.ctaWatermark} aria-hidden="true">
        <span className={styles.ctaWordHead}>HEADLESS</span>
        <span className={styles.ctaWordTail}>ENGINEER</span>
      </div>
      {/* Reuse Cinema overlay styles */}
      <div className={styles.overlay}>
        <p className={styles.role}>Are you a</p>
        <p className={styles.name}>
          HEADLESS{' '}
          <span className={styles.ctaNameTail}>ENGINEER</span>
        </p>
        <p className={styles.statement}>
          Senior practitioners who solve first, then choose the stack.
        </p>
      </div>
      <Link
        href="/contact"
        className={styles.cardLink}
        aria-label="Join headlessengineer — get in touch"
      />
    </article>
  );
}

interface TeamCardProps {
  member: TeamMember;
  variant: CardVariant;
  isNew: boolean;
  newIndex: number;
}

function TeamCard({ member, variant, isNew, newIndex }: TeamCardProps): JSX.Element {
  const photoSrc = resolvePhoto(member.photo, member.placeholderIndex);
  const githubHref = toExternalHref(member.github);
  const linkedinHref = toExternalHref(member.linkedin);
  const hasSocials = member.github || member.linkedin;
  const revealClass = isNew ? styles.cardReveal : '';
  const revealDelay = isNew ? { animationDelay: `${newIndex * 60}ms` } : undefined;

  if (variant === 4) {
    return (
      <article
        className={`${styles.card} ${revealClass}`}
        data-variant="4"
        style={revealDelay}
      >
        <div className={styles.photoWrap}>
          <Image
            src={photoSrc}
            alt={`${member.firstName} ${member.lastName}`}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            className={styles.photo}
          />
        </div>
        {/* overlay: no z-index so it doesn't create a stacking context —
            socials at z-index:2 (base) then correctly beat cardLink at z-index:1 */}
        <div className={styles.overlay}>
          <p className={styles.role}>{member.role}</p>
          <p className={styles.name}>{member.firstName} {member.lastName}</p>
          <p className={styles.statement}>{member.statement}</p>
          {hasSocials && (
            <div className={styles.socials}>
              {member.github && (
                <a href={githubHref} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`${member.firstName} on GitHub`}>
                  <GitHubIcon />
                </a>
              )}
              {member.linkedin && (
                <a href={linkedinHref} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`${member.firstName} on LinkedIn`}>
                  <LinkedInIcon />
                </a>
              )}
            </div>
          )}
        </div>
        {member.id && (
          <Link
            href={`/profile/${member.id}`}
            className={styles.cardLink}
            aria-label={`View ${member.firstName} ${member.lastName}'s profile`}
          />
        )}
      </article>
    );
  }

  if (variant === 2) {
    return (
      <article className={`${styles.card} ${revealClass}`} data-variant="2" style={revealDelay}>
        <div className={styles.accentBar} aria-hidden="true" />
        <div className={styles.photoWrap}>
          <Image src={photoSrc} alt={`${member.firstName} ${member.lastName}`} fill sizes="280px" className={styles.photo} />
        </div>
        <div className={styles.content}>
          <p className={styles.role}>{member.role}</p>
          <p className={styles.name}>{member.firstName} {member.lastName}</p>
          <blockquote className={styles.statement}>{member.statement}</blockquote>
          {hasSocials && (
            <div className={styles.socials}>
              {member.github && (
                <a href={githubHref} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`${member.firstName} on GitHub`}>
                  <GitHubIcon />
                </a>
              )}
              {member.linkedin && (
                <a href={linkedinHref} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`${member.firstName} on LinkedIn`}>
                  <LinkedInIcon />
                </a>
              )}
            </div>
          )}
        </div>
        {member.id && (
          <Link href={`/profile/${member.id}`} className={styles.cardLink} aria-label={`View ${member.firstName} ${member.lastName}'s profile`} />
        )}
      </article>
    );
  }

  if (variant === 5) {
    return (
      <article className={`${styles.card} ${revealClass}`} data-variant="5" style={revealDelay}>
        <div className={styles.termHeader} aria-hidden="true">
          <div className={styles.termDots}>
            <span className={styles.termDot} />
            <span className={styles.termDot} />
            <span className={styles.termDot} />
          </div>
          <span className={styles.termTitle}>profile.exec</span>
        </div>
        <div className={styles.termBody}>
          <div className={styles.photoWrap}>
            <Image src={photoSrc} alt={`${member.firstName} ${member.lastName}`} width={64} height={64} className={styles.photo} />
          </div>
          <p className={styles.prompt}>{'>'} identify</p>
          <p className={styles.name}>{member.firstName}_{member.lastName}</p>
          <p className={styles.role}>[{member.role}]</p>
          <p className={styles.statement}>{member.statement}</p>
          {hasSocials && (
            <div className={styles.socials}>
              {member.github && (
                <a href={githubHref} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`${member.firstName} on GitHub`}>
                  <GitHubIcon />
                </a>
              )}
              {member.linkedin && (
                <a href={linkedinHref} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`${member.firstName} on LinkedIn`}>
                  <LinkedInIcon />
                </a>
              )}
            </div>
          )}
        </div>
        {member.id && (
          <Link href={`/profile/${member.id}`} className={styles.cardLink} aria-label={`View ${member.firstName} ${member.lastName}'s profile`} />
        )}
      </article>
    );
  }

  /* Variants 1 and 3 */
  return (
    <article className={`${styles.card} ${revealClass}`} data-variant={String(variant)} style={revealDelay}>
      <div className={styles.photoWrap}>
        <Image src={photoSrc} alt={`${member.firstName} ${member.lastName}`} width={96} height={96} className={styles.photo} />
      </div>
      <p className={styles.name}>{member.firstName} {member.lastName}</p>
      <p className={styles.role}>{member.role}</p>
      {variant === 1 && <div className={styles.divider} aria-hidden="true" />}
      <p className={styles.statement}>{member.statement}</p>
      {hasSocials && (
        <div className={styles.socials}>
          {member.github && (
            <a href={githubHref} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`${member.firstName} on GitHub`}>
              <GitHubIcon />
            </a>
          )}
          {member.linkedin && (
            <a href={linkedinHref} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label={`${member.firstName} on LinkedIn`}>
              <LinkedInIcon />
            </a>
          )}
        </div>
      )}
      {member.id && (
        <Link href={`/profile/${member.id}`} className={styles.cardLink} aria-label={`View ${member.firstName} ${member.lastName}'s profile`} />
      )}
    </article>
  );
}

export function TeamCardGrid({ members, variant }: TeamCardGridProps): JSX.Element {
  const [showAll, setShowAll] = useState(false);

  const paginated = members.length > INITIAL_COUNT;
  const visibleMembers = showAll ? members : members.slice(0, INITIAL_COUNT);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} data-variant={String(variant)}>
        {visibleMembers.map((member, i) => (
          <TeamCard
            key={member.id || `placeholder-${member.placeholderIndex}`}
            member={member}
            variant={variant}
            isNew={showAll && i >= INITIAL_COUNT}
            newIndex={showAll && i >= INITIAL_COUNT ? i - INITIAL_COUNT : 0}
          />
        ))}
        {showAll && <CTACard newIndex={members.length - INITIAL_COUNT} />}
      </div>
      {paginated && (
        <div className={styles.viewMoreWrap}>
          {showAll ? (
            <Button variant="secondary" onClick={() => setShowAll(false)}>
              Show less
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setShowAll(true)}>
              View more
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
