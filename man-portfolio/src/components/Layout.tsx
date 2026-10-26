import * as React from "react"
import { Link } from "gatsby"
import { FiMenu, FiX, FiDownload } from "react-icons/fi"
import ThemeToggle from "./ThemeToggle"
import SocialIcon from "./SocialIcon"
import { profile, socials } from "../data/content"

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
]

/** Id of the home-page section currently in the middle of the viewport (for nav highlighting). */
const useActiveSection = () => {
  const [active, setActive] = React.useState<string | null>(null)
  React.useEffect(() => {
    const ids = navLinks.map(l => l.href.split("#")[1])
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
    if (!sections.length || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])
  return active
}

const ScrollProgress = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return (
    <div
      ref={ref}
      data-testid="scroll-progress"
      aria-hidden
      className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-accent via-amber-300 to-accent2"
      style={{ transform: "scaleX(0)" }}
    />
  )
}

/** One listener drives the cursor spotlight on every `.spotlight` card. */
const useSpotlight = () => {
  React.useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(
        ".spotlight",
      ) as HTMLElement | null
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty("--mx", `${e.clientX - r.left}px`)
      card.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    document.addEventListener("pointermove", onMove, { passive: true })
    return () => document.removeEventListener("pointermove", onMove)
  }, [])
}

const Nav = () => {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const active = useActiveSection()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        open
          ? "border-b border-line bg-bg"
          : scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent"
      }`}
    >
      <ScrollProgress />
      <nav
        className="container-x flex h-16 items-center justify-between"
        aria-label="Main"
      >
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          mancha<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map(l => {
            const isActive = active === l.href.split("#")[1]
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative py-1 text-sm font-medium transition hover:text-ink ${
                    isActive ? "text-ink" : "text-muted"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="nav-indicator absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent"
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={profile.resume}
            className="btn-primary hidden !px-4 !py-2 sm:inline-flex"
            download
          >
            <FiDownload aria-hidden /> Résumé
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FiX aria-hidden /> : <FiMenu aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="container-x pb-5 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-medium text-muted hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={profile.resume} className="btn-primary mt-3 w-full" download>
            <FiDownload aria-hidden /> Download résumé
          </a>
        </div>
      )}
    </header>
  )
}

const Footer = () => (
  <footer className="border-t border-line">
    <div className="container-x flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Gatsby, React &
        Tailwind.
      </p>
      <ul className="flex items-center gap-4">
        {socials.map(s => (
          <li key={s.label}>
            <a
              href={s.href}
              target={s.icon === "email" ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={s.label}
              className="text-lg transition hover:text-accent"
            >
              <SocialIcon name={s.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
)

const Layout = ({ children }: { children: React.ReactNode }) => {
  useSpotlight()
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-aurora"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-grid"
      />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
