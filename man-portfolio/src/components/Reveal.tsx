import * as React from "react"

type Props = {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: "div" | "li" | "section" | "article"
}

/**
 * Fades and lifts content in once as it scrolls into view.
 * Content is fully visible in the server-rendered HTML; the hidden start state only
 * applies once JS has loaded (html.js-reveal) and the user hasn't asked for reduced motion.
 */
const Reveal = ({ children, delay = 0, className = "", as: Tag = "div" }: Props) => {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible")
      return
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          el.classList.add("is-visible")
          io.disconnect()
        }
      },
      // The huge top margin counts everything above the viewport as "seen", so content skipped
      // by an anchor jump (e.g. landing on /#contact) is revealed instead of staying hidden.
      { rootMargin: "100000px 0px -60px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}

export default Reveal
