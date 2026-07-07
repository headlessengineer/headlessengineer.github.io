import Link from 'next/link';
import { StatsCard } from '../molecules/StatsCard';
import type { Project } from '../../lib/schemas/project';
import styles from './StatsGrid.module.css';

interface StatsGridProps {
  project: Project;
}

export function StatsGrid({ project }: StatsGridProps) {
  return (
    <div className={styles.infoGrid}>
      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.label}>Status</span>
          <span className={styles.value} data-status={project.status}>{project.status}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>License</span>
          <span className={styles.value}>{project.license}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Last commit</span>
          <span className={styles.value}>{project.lastCommit}</span>
        </div>
        {project.stats?.version && (
          <div className={styles.row}>
            <span className={styles.label}>Version</span>
            <span className={styles.value}>{project.stats.version}</span>
          </div>
        )}
        {project.stats?.buildStatus && (
          <div className={styles.row}>
            <span className={styles.label}>Build</span>
            <span className={styles.value}>{project.stats.buildStatus}</span>
          </div>
        )}
      </div>

      {project.stats && (
        <div className={styles.stats}>
          {project.stats.stars != null && (
            <StatsCard label="stars" value={project.stats.stars} />
          )}
          {project.stats.forks != null && (
            <StatsCard label="forks" value={project.stats.forks} />
          )}
          {project.stats.contributors != null && (
            <StatsCard label="contributors" value={project.stats.contributors} />
          )}
        </div>
      )}

      {project.links && (
        <div className={styles.links}>
          {project.links.github && (
            <Link href={project.links.github} className={styles.link} target="_blank" rel="noopener noreferrer">
              → GitHub
            </Link>
          )}
          {project.links.demo && (
            <Link href={project.links.demo} className={styles.link} target="_blank" rel="noopener noreferrer">
              → Live Demo
            </Link>
          )}
          {project.links.docs && (
            <Link href={project.links.docs} className={styles.link} target="_blank" rel="noopener noreferrer">
              → Docs
            </Link>
          )}
          {project.links.npm && (
            <Link href={project.links.npm} className={styles.link} target="_blank" rel="noopener noreferrer">
              → npm
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
