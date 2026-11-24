import { test, expect, type Page } from "@playwright/test"
import { caseStudies, profile } from "../src/data/content"

const collectErrors = (page: Page) => {
  const errors: string[] = []
  page.on("pageerror", e => errors.push(e.message))
  page.on("console", m => {
    // Third-party analytics/embeds can log noise; only fail on our own errors.
    if (m.type() === "error" && !/googletagmanager|youtube|google-analytics|ERR_BLOCKED/i.test(m.text())) {
      errors.push(m.text())
    }
  })
  return errors
}

test.describe("home page", () => {
  test("renders hero, all sections and no runtime errors", async ({ page }) => {
    const errors = collectErrors(page)
    await page.goto("/")
    await expect(page).toHaveTitle(/Emmanuel Mancha Pam/)
    await expect(page.getByRole("heading", { level: 1 })).toContainText("enterprises run on")
    await expect(page.getByAltText("Portrait of Emmanuel Mancha Pam")).toBeVisible()
    for (const id of ["about", "experience", "work", "skills", "contact"]) {
      await expect(page.locator(`section#${id}`)).toBeAttached()
    }
    await page.waitForLoadState("networkidle")
    expect(errors).toEqual([])
  })

  test("has no horizontal overflow", async ({ page }) => {
    await page.goto("/")
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
  })

  test("every featured case study is linked", async ({ page }) => {
    await page.goto("/")
    for (const c of caseStudies) {
      await expect(page.locator(`#work a[href="/work/${c.slug}/"]`)).toHaveCount(1)
    }
  })

  test("all images load", async ({ page }) => {
    await page.goto("/")
    // Force lazy images to load.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 40))
      }
    })
    await page.waitForLoadState("networkidle")
    const broken = await page.$$eval("img", imgs =>
      imgs
        .filter(i => !i.closest("noscript") && i.getAttribute("aria-hidden") !== "true" && i.complete && i.naturalWidth === 0)
        .map(i => i.currentSrc || i.src)
    )
    expect(broken).toEqual([])
  })

  test("external links open safely in a new tab", async ({ page }) => {
    await page.goto("/")
    const unsafe = await page.$$eval('a[href^="http"]', els =>
      (els as HTMLAnchorElement[]).filter(a => a.target !== "_blank" || !/noreferrer/.test(a.rel)).map(a => a.href)
    )
    expect(unsafe).toEqual([])
  })

  test("theme toggle switches and persists", async ({ page }) => {
    await page.goto("/")
    const html = page.locator("html")
    const startDark = await html.evaluate(el => el.classList.contains("dark"))
    await page.getByRole("button", { name: /switch to (light|dark) theme/i }).click()
    await expect(html).toHaveClass(startDark ? /^(?!.*\bdark\b)/ : /\bdark\b/)
    await page.reload()
    const afterReload = await html.evaluate(el => el.classList.contains("dark"))
    expect(afterReload).toBe(!startDark)
  })
})

// Playwright treats opacity:0 as "visible", so check computed opacity explicitly.
const opacityOf = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate(el => Number(getComputedStyle(el).opacity))

test.describe("scroll reveal never hides content permanently", () => {
  test("content is visible without JavaScript", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false })
    const page = await ctx.newPage()
    await page.goto("/")
    expect(await opacityOf(page, "#experience .reveal")).toBe(1)
    expect(await opacityOf(page, "#contact .reveal")).toBe(1)
    await ctx.close()
  })

  test("content fades in once scrolled into view", async ({ page }) => {
    await page.goto("/")
    await page.locator("#contact").scrollIntoViewIfNeeded()
    await expect.poll(() => opacityOf(page, "#contact .reveal")).toBe(1)
  })

  test("landing mid-page reveals the sections above", async ({ page }) => {
    await page.goto("/#contact")
    await expect.poll(() => opacityOf(page, "#contact .reveal")).toBe(1)
    await expect.poll(() => opacityOf(page, "#experience .reveal")).toBe(1)
  })

  test("reduced-motion users see everything immediately", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" })
    const page = await ctx.newPage()
    await page.goto("/")
    expect(await opacityOf(page, "#skills .reveal")).toBe(1)
    await ctx.close()
  })
})

test.describe("motion & interaction", () => {
  test("hero headline words animate in and settle fully visible", async ({ page }) => {
    await page.goto("/")
    const words = page.locator("h1 .word-in")
    await expect(words).toHaveCount(5)
    await expect.poll(() => words.last().evaluate(el => Number(getComputedStyle(el).opacity))).toBe(1)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("I build the interfaces enterprises run on.")
  })

  test("headline and stats are complete without JavaScript", async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false })
    const page = await ctx.newPage()
    await page.goto("/")
    expect(await opacityOf(page, "h1 .word-in")).toBe(1)
    await expect(page.locator("[data-countup]").last()).toHaveText("1,300+")
    await ctx.close()
  })

  test("stats count up to their final values", async ({ page }) => {
    await page.goto("/")
    const counters = page.locator("[data-countup]")
    await expect(counters).toHaveCount(4)
    await page.getByRole("region", { name: "Highlights" }).scrollIntoViewIfNeeded()
    for (const [i, v] of ["5+", "8", "1,000+", "1,300+"].entries()) {
      await expect(counters.nth(i)).toHaveText(v)
    }
  })

  test("tech marquee scrolls, with the duplicate row hidden from screen readers", async ({ page }) => {
    await page.goto("/")
    const marquee = page.getByRole("region", { name: "Technologies I work with" })
    await expect(marquee).toBeVisible()
    await expect(marquee.locator("ul")).toHaveCount(2)
    await expect(marquee.locator("ul").nth(1)).toHaveAttribute("aria-hidden", "true")
    const anim = await marquee.locator(".marquee-track").evaluate(el => getComputedStyle(el).animationName)
    expect(anim).toBe("marquee")
  })

  test("marquee and tilt stay still under reduced motion", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" })
    const page = await ctx.newPage()
    await page.goto("/")
    const anim = await page.locator(".marquee-track").evaluate(el => getComputedStyle(el).animationName)
    expect(anim).toBe("none")
    await expect(page.locator("[data-countup]").last()).toHaveText("1,300+")
    await ctx.close()
  })

  test("scroll progress bar tracks the page", async ({ page }) => {
    await page.goto("/")
    const bar = page.getByTestId("scroll-progress")
    const scale = () => bar.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).a)
    expect(await scale()).toBeLessThan(0.05)
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await expect.poll(scale).toBeGreaterThan(0.95)
  })

  test("nav highlights the section being read", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav only")
    await page.goto("/")
    await page.locator("#skills").evaluate(el => el.scrollIntoView({ block: "center" }))
    const nav = page.getByRole("navigation", { name: "Main" })
    await expect(nav.getByRole("link", { name: "Skills" })).toHaveAttribute("aria-current", "location")
    await expect(nav.locator('[aria-current="location"]')).toHaveCount(1)
  })

  test("cursor spotlight follows the mouse on cards", async ({ page, isMobile }) => {
    test.skip(isMobile, "pointer effect is desktop only")
    await page.goto("/")
    const card = page.locator("#work a.spotlight").first()
    await card.scrollIntoViewIfNeeded()
    const box = (await card.boundingBox())!
    await page.mouse.move(box.x + 40, box.y + 30)
    await page.mouse.move(box.x + 120, box.y + 80, { steps: 4 })
    await expect.poll(() => card.evaluate(el => parseFloat(el.style.getPropertyValue("--mx")))).toBeCloseTo(120, -1)
  })

  test("portrait tilts towards the cursor", async ({ page, isMobile }) => {
    test.skip(isMobile, "pointer effect is desktop only")
    await page.goto("/")
    const tilt = page.locator(".tilt")
    const box = (await tilt.boundingBox())!
    await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.5, { steps: 3 })
    await expect.poll(() => tilt.evaluate(el => parseFloat(el.style.getPropertyValue("--ry")))).toBeGreaterThan(2)
    await page.mouse.move(5, 5)
    await expect.poll(() => tilt.evaluate(el => el.style.getPropertyValue("--ry"))).toBe("0deg")
  })
})

test.describe("navigation", () => {
  test("desktop nav jumps to sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav only")
    await page.goto("/")
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Experience" }).click()
    await expect(page).toHaveURL(/#experience$/)
    await expect(page.locator("#experience h2")).toBeInViewport()
  })

  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only")
    await page.goto("/")
    await page.getByRole("button", { name: "Open menu" }).click()
    const menu = page.locator("#mobile-menu")
    await expect(menu).toBeVisible()
    await menu.getByRole("link", { name: "Work" }).click()
    await expect(menu).toBeHidden()
    await expect(page).toHaveURL(/#work$/)
  })

  for (const [from, anchor] of [
    ["/about/", "about"],
    ["/contact/", "contact"],
    ["/projects/", "work"],
    ["/challenges/", "work"],
    ["/blog/", "work"],
  ]) {
    test(`old URL ${from} redirects to #${anchor}`, async ({ page }) => {
      await page.goto(from)
      await expect(page).toHaveURL(new RegExp(`/#${anchor}$`))
    })
  }

  test("unknown URL shows the 404 page", async ({ page }) => {
    const res = await page.goto("/does-not-exist/")
    expect(res?.status()).toBe(404)
    await expect(page.getByText("This page doesn't exist.")).toBeVisible()
  })
})

test.describe("case studies", () => {
  for (const c of caseStudies) {
    test(`/work/${c.slug}/ renders`, async ({ page }) => {
      const errors = collectErrors(page)
      await page.goto(`/work/${c.slug}/`)
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.title)
      await expect(page).toHaveTitle(new RegExp(c.title))
      await expect(page.getByText(c.problem)).toBeVisible()
      await expect(page.getByRole("link", { name: /Next project/ })).toBeVisible()
      expect(errors).toEqual([])
    })
  }

  test("next-project link walks through every case study", async ({ page }) => {
    await page.goto(`/work/${caseStudies[0].slug}/`)
    for (let i = 1; i < caseStudies.length; i++) {
      await page.getByRole("link", { name: /Next project/ }).click()
      await expect(page).toHaveURL(new RegExp(`/work/${caseStudies[i].slug}/$`))
    }
  })
})

test.describe("copy & sharing", () => {
  // Em dashes read as machine-written; keep visible copy free of them on every page.
  for (const path of ["/", ...caseStudies.map(c => `/work/${c.slug}/`)]) {
    test(`no em dashes in visible text on ${path}`, async ({ page }) => {
      await page.goto(path)
      const text = await page.locator("body").innerText()
      expect(text.match(/.{0,30}—.{0,30}/g) ?? []).toEqual([])
      expect(await page.title()).not.toContain("—")
    })
  }

  test("old practice-projects section is gone", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("#earlier")).toHaveCount(0)
    await expect(page.getByText("Where it started")).toHaveCount(0)
  })

  test("link-preview card is a 1200x630 PNG that is served", async ({ page, request }) => {
    await page.goto("/")
    const og = await page.locator('meta[property="og:image"]').getAttribute("content")
    expect(og).toMatch(/\/og-image\.png$/)
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200")
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630")
    const res = await request.get("/og-image.png")
    expect(res.status()).toBe(200)
    expect(res.headers()["content-type"]).toContain("image/png")
  })
})

test("résumé buttons trigger a download of the PDF", async ({ page, isMobile }) => {
  await page.goto("/")
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click()
  const button = isMobile ? page.locator("#mobile-menu a[download]") : page.locator("header a[download]")
  const [download] = await Promise.all([page.waitForEvent("download"), button.click()])
  // The filename proves the click started the right download. Completion isn't asserted: download
  // managers like IDM cancel browser PDF downloads to take them over, which would fail here falsely.
  expect(download.suggestedFilename()).toBe("Emmanuel-Mancha-Pam-Resume.pdf")
})

test("résumé PDF is served", async ({ request }) => {
  const res = await request.get(profile.resume)
  expect(res.status()).toBe(200)
  expect(res.headers()["content-type"]).toContain("pdf")
})
