import { test as base, chromium } from "@playwright/test";

export const test = base.extend({
  page: async ({}, use, testInfo) => {
    const meta = testInfo.project.metadata as Record<string, string>;

    // Local execution: no LambdaTest metadata present
    if (!meta.browserName) {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await use(page);
      await context.close();
      await browser.close();
      return;
    }

    // Cloud execution via LambdaTest
    const capabilities = {
      browserName: meta.browserName,

      browserVersion: meta.browserVersion,

      "LT:Options": {
        platform: meta.platform,

        build: "Playwright 101 Certification Assignment",

        name: testInfo.title,

        user: process.env.LT_USERNAME,

        accessKey: process.env.LT_ACCESS_KEY,

        network: true,

        video: true,

        console: true,

        visual: true,

        resolution: "1920x1080",
      },
    };

    const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
      JSON.stringify(capabilities)
    )}`;

    console.log(
      `Connecting to LambdaTest -> ${meta.browserName} on ${meta.platform}`
    );

    const browser = await chromium.connect(wsEndpoint, {
      timeout: 180000,
    });

    const context = await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080,
      },
    });

    const page = await context.newPage();

    page.on("console", (msg) => {
      console.log(`[console] ${msg.type()}: ${msg.text()}`);
    });

    await use(page);

    const status = testInfo.status === "passed" ? "passed" : "failed";

    await page.evaluate(
      () => {},
      `lambdatest_action: ${JSON.stringify({
        action: "setTestStatus",
        arguments: {
          status,
        },
      })}`
    );

    await page.screenshot({
      path: `test-results/${testInfo.title}.png`,
      fullPage: true,
    });

    await context.close();

    await browser.close();
  },
});

export { expect } from "@playwright/test";
