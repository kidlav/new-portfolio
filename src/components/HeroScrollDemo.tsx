import { ContainerScroll } from './ui/container-scroll-animation'

export function HeroScrollDemo() {
  return (
    <div className="hero-scroll-demo">
      <ContainerScroll
        titleComponent={(
          <>
            <h1 className="hero-scroll-title">
              Unleash the power of <br />
              <span>Scroll Animations</span>
            </h1>
          </>
        )}
      >
        <div className="hero-scroll-image" aria-hidden="true">
          <div className="hero-scroll-image-main" />
          <div className="hero-scroll-image-grid">
            <div />
            <div />
            <div />
          </div>
        </div>
      </ContainerScroll>
    </div>
  )
}
