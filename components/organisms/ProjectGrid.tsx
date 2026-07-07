import { ProjectCard } from '../molecules/ProjectCard';
import { CardGrid } from '../molecules/CardGrid';
import { Pagination } from '../atoms/Pagination';
import type { Project } from '../../lib/schemas/project';
import styles from './ProjectGrid.module.css';

interface ProjectGridProps {
  projects: Project[];
  fullHeight?: boolean;
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
  backLink?: React.ReactNode;
}

export function ProjectGrid({ projects, fullHeight = false, currentPage, totalPages, basePath, backLink }: ProjectGridProps) {
  return (
    <section className={fullHeight ? styles.sectionFullHeight : styles.section}>
      <div className={styles.container}>
        <CardGrid count={projects.length}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </CardGrid>
        {currentPage && totalPages && basePath && (
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
        )}
        {backLink && <div className={styles.backLink}>{backLink}</div>}
      </div>
    </section>
  );
}
