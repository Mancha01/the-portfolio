import * as React from "react"
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiYoutube } from "react-icons/fi"

const icons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  twitter: FiTwitter,
  youtube: FiYoutube,
  email: FiMail,
}

export type IconName = keyof typeof icons

const SocialIcon = ({ name, className }: { name: IconName; className?: string }) => {
  const Icon = icons[name]
  return <Icon aria-hidden className={className} />
}

export default SocialIcon
