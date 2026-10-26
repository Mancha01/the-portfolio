import * as React from "react"
import { hasFinePointer, prefersReducedMotion } from "../lib/motion"

const MAX_DEG = 6

/** Gently tilts its child in 3D towards the cursor (mouse/trackpad only, never under reduced motion). */
const Tilt = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty("--ry", `${(x * MAX_DEG * 2).toFixed(2)}deg`)
      el.style.setProperty("--rx", `${(-y * MAX_DEG * 2).toFixed(2)}deg`)
    }
    const onLeave = () => {
      el.style.setProperty("--rx", "0deg")
      el.style.setProperty("--ry", "0deg")
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
    </div>
  )
}

export default Tilt
