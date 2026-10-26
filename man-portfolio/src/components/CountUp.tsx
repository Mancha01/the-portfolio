import * as React from "react"
import { prefersReducedMotion, useIsoLayoutEffect } from "../lib/motion"

const parse = (value: string) => {
  const m = value.match(/^([^\d]*)([\d,]+)(.*)$/)
  return m ? { prefix: m[1], n: parseInt(m[2].replace(/,/g, ""), 10), suffix: m[3] } : null
}

/**
 * Counts a stat like "1,300+" up from zero when it scrolls into view.
 * The final value is server-rendered (crawlers, no-JS and screen readers always get it);
 * the count is a visual layer only.
 */
const CountUp = ({ value, className }: { value: string; className?: string }) => {
  const ref = React.useRef<HTMLSpanElement>(null)

  useIsoLayoutEffect(() => {
    const el = ref.current
    const parsed = parse(value)
    if (!el || !parsed || prefersReducedMotion() || !("IntersectionObserver" in window)) return

    const fmt = (n: number) => `${parsed.prefix}${Math.round(n).toLocaleString("en-US")}${parsed.suffix}`
    el.textContent = fmt(0)
    let raf = 0

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const duration = 1400
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        el.textContent = fmt(parsed.n * (1 - Math.pow(1 - t, 3)))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      el.textContent = value
    }
  }, [value])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden className="tabular-nums" data-countup={value}>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

export default CountUp
