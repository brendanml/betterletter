import asyncio
from playwright.async_api import async_playwright

def extract_content (html: str) -> str:

    return "Extracted content from the HTML."

async def scrape(url: str) -> str:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page    = await browser.new_page()
        await page.goto(url, wait_until="networkidle")

        # rendered markup inside <body> … </body>
        body_html = await page.evaluate("() => document.body.innerHTML")

        await browser.close()
        return body_html

print(asyncio.run(scrape("https://ca.indeed.com/viewjob?jk=63d805bd80a72696&from=shareddesktop_copy")))
