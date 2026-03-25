import { useParams, Link } from 'react-router-dom'
import { caseStudies } from '../data/caseStudies'
import { CaseStudyPage } from '../components/CaseStudyPage'

export function CaseStudyRouter() {
  const { slug } = useParams<{ slug: string }>()
  const data = caseStudies.find((cs) => cs.slug === slug)

  if (!data) {
    return (
      <main style={{ padding: '160px 0 80px', textAlign: 'center' }}>
        <div className="container">
          <p className="section-eyebrow">404</p>
          <h1 className="section-title" style={{ marginTop: 16 }}>Project not found</h1>
          <Link to="/projects" className="btn btn-secondary" style={{ marginTop: 32, display: 'inline-flex' }}>
            ← Back to projects
          </Link>
        </div>
      </main>
    )
  }

  return <CaseStudyPage data={data} />
}
