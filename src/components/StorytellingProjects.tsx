import type { Project } from '../data/projects'

type StorytellingProjectsProps = {
  projects: Project[]
}

export function StorytellingProjects({ projects }: StorytellingProjectsProps) {
  return (
    <div className="story-sequence">
      {projects.map((project, index) => {
        const isReverse = index % 2 === 1

        return (
          <section
            key={project.title}
            className={`story-section ${isReverse ? 'reverse' : ''} ${index === 0 ? 'first-story' : ''}`.trim()}
            data-reveal-section
          >
            <div className="story-fixed-container">
              <div
                className="story-image-wrap"
                data-reveal-item
              >
                <div className="story-image">
                  <div className="story-image-header" />
                  <div className="story-image-lines">
                    <span />
                    <span className="short" />
                  </div>
                  <div className="story-image-grid">
                    <div />
                    <div />
                  </div>
                </div>
              </div>

              <article className="story-text" data-reveal-item>
                <span className="story-kicker">Featured project</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="story-stack">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={`${project.title}-${tag}`}>{tag}</span>
                  ))}
                </div>
              </article>
            </div>
          </section>
        )
      })}
    </div>
  )
}
