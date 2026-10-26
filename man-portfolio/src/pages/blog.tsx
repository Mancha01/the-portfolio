import * as React from "react"
import Redirect, { redirectHead } from "../components/Redirect"

const to = "/#earlier"

const Page = () => <Redirect to={to} />

export default Page

export const Head = () => redirectHead(to)
