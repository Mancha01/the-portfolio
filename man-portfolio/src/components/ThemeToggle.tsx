import * as React from "react"
import { FiMoon, FiSun } from "react-icons/fi"

const ThemeToggle = () => {
  const [dark, setDark] = React.useState(true)

  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      // storage unavailable — theme still applies for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent"
    >
      {dark ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
    </button>
  )
}

export default ThemeToggle
