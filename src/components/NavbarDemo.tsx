import { useEffect, useState } from 'react'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarLogo,
  NavItems,
} from './ui/resizable-navbar'
import { HoverBorderGradient } from './ui/hover-border-gradient'

export function NavbarDemo() {
  const navItems = [
    { name: 'Projects', link: '#projects' },
    { name: 'About', link: '#about' },
    { name: 'Contact', link: '#contact' },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`rs-wrap ${isScrolled ? 'is-scrolled' : ''}`.trim()}>
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="rs-nav-actions">
            <HoverBorderGradient
              variant="primary"
              containerClassName="hbg-container"
              className="hbg-inner hbg-inner--sm"
            >
              Book a call
            </HoverBorderGradient>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rs-mobile-link"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="rs-mobile-actions">
              <HoverBorderGradient
                variant="primary"
                containerClassName="hbg-container hbg-full"
                className="hbg-inner hbg-inner--sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a call
              </HoverBorderGradient>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}
