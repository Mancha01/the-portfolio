import * as React from "react"

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches

/** useLayoutEffect in the browser (runs before paint), useEffect during SSR to avoid warnings. */
export const useIsoLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect
