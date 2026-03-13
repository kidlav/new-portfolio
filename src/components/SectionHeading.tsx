type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 data-word-reveal>{title}</h2>
      <p className="section-description" data-word-reveal>
        {description}
      </p>
    </div>
  )
}