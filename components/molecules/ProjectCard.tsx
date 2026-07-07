import type { Project } from '../../lib/schemas/project';
import { Card } from '../atoms/Card';
import { Tag } from '../atoms/Tag';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      href={`/projects/${project.slug}`}
      title={project.featured ? `FEATURED · ${project.category}` : project.category}
      className={project.featured ? styles.featured : ''}
    >
      <div className={styles.header}>
        <span className={styles.name}>{project.title}</span>
        <span className={`${styles.status} ${styles[project.status]}`}>
          {project.status === 'active' && '● Active'}
          {project.status === 'beta' && '◐ Beta'}
          {project.status === 'stable' && '● Stable'}
          {project.status === 'archived' && '○ Archived'}
        </span>
      </div>
      <p className={styles.excerpt}>{project.excerpt}</p>
      <div className={styles.tags}>
        {project.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
      <div className={styles.meta}>
        {project.stats?.stars !== undefined && (
          <>
            <span className={styles.stars}>★ {project.stats.stars.toLocaleString()}</span>
            <span className={styles.separator}>·</span>
          </>
        )}
        <span>{project.license}</span>
        <span className={styles.separator}>·</span>
        <span>{project.lastCommit}</span>
      </div>
    </Card>
  );
}
