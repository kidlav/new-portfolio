import { Menu, X } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react'

type NavItem = {
  name: string
  link: string
}

type NavbarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

type MobileNavMenuProps = PropsWithChildren<{
  isOpen: boolean
  onClose: () => void
}>

export function Navbar({ children }: PropsWithChildren) {
  return <header className="rs-navbar">{children}</header>
}

export function NavBody({ children }: PropsWithChildren) {
  return <div className="rs-nav-body">{children}</div>
}

export function NavItems({ items }: { items: NavItem[] }) {
  return (
    <nav className="rs-nav-items">
      {items.map((item) => (
        <a key={item.link} href={item.link}>
          {item.name}
        </a>
      ))}
    </nav>
  )
}

export function MobileNav({ children }: PropsWithChildren) {
  return <div className="rs-mobile-nav">{children}</div>
}

export function NavbarLogo(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className="rs-logo" href="#hero" {...props}>
      Vladislav / Portfolio
    </a>
  )
}

export function NavbarButton({ variant = 'primary', className, ...props }: NavbarButtonProps) {
  return (
    <button
      className={`rs-btn rs-btn-${variant} ${className ?? ''}`.trim()}
      {...props}
    />
  )
}

export function MobileNavHeader({ children }: PropsWithChildren) {
  return <div className="rs-mobile-header">{children}</div>
}

export function MobileNavToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="rs-mobile-toggle"
      onClick={onClick}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? <X size={18} /> : <Menu size={18} />}
    </button>
  )
}

export function MobileNavMenu({ isOpen, onClose, children }: MobileNavMenuProps) {
  return (
    <div className={`rs-mobile-menu ${isOpen ? 'open' : ''}`.trim()}>
      <button
        type="button"
        className="rs-mobile-backdrop"
        onClick={onClose}
        aria-label="Close menu backdrop"
      />
      <div className="rs-mobile-panel">{children}</div>
    </div>
  )
}
