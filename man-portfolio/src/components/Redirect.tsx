import * as React from "react"
import { navigate } from "gatsby"

/** Keeps old (2022) URLs working by forwarding them to the matching home-page section. */
const Redirect = ({ to }: { to: string }) => {
  React.useEffect(() => {
    navigate(to, { replace: true })
  }, [to])
  return (
    <p className="p-8 text-center">
      Redirecting… <a href={to}>continue</a>
    </p>
  )
}

export const redirectHead = (to: string) => (
  <>
    <meta httpEquiv="refresh" content={`0; url=${to}`} />
    <meta name="robots" content="noindex" />
    <title>Redirecting…</title>
  </>
)

export default Redirect
