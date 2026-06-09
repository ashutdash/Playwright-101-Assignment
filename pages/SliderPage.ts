import { Page, expect } from "@playwright/test";
import { Logger } from "../utils/logger";

const log = new Logger("SliderPage");

export class SliderPage {
  constructor(private page: Page) {}

  /**
   * Locates the range input whose current value matches `defaultValue`,
   * drags it to `targetValue`, then fine-tunes with arrow keys if the
   * drag didn't land perfectly.
   */
  async dragSliderTo(defaultValue: number, targetValue: number) {
    const slider = this.page.locator(
      `input[type='range'][value='${defaultValue}']`
    );
    await slider.scrollIntoViewIfNeeded();

    const box = await slider.boundingBox();
    if (!box) throw new Error("Could not resolve slider bounding box");

    // range inputs go from min=1 to max=100 by default
    const min = 1;
    const max = 100;
    const pctStart = (defaultValue - min) / (max - min);
    const pctTarget = (targetValue - min) / (max - min);

    const startX = box.x + box.width * pctStart;
    const endX = box.x + box.width * pctTarget;
    const centerY = box.y + box.height / 2;

    await this.page.mouse.move(startX, centerY);
    await this.page.mouse.down();

    const steps = 25;
    for (let i = 1; i <= steps; i++) {
      await this.page.mouse.move(
        startX + ((endX - startX) * i) / steps,
        centerY
      );
    }
    await this.page.mouse.up();

    const actual = parseInt(await slider.inputValue(), 10);
    const diff = targetValue - actual;
    log.info(`drag landed on ${actual}, adjusting by ${diff} steps`);

    if (diff !== 0) {
      await slider.focus();
      const key = diff > 0 ? "ArrowRight" : "ArrowLeft";
      for (let i = 0; i < Math.abs(diff); i++) {
        await slider.press(key);
      }
    }

    await slider.evaluate((el: HTMLInputElement) => {
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  /**
   * Reads the <output> element that sits inside the same parent
   * container as the given slider and asserts its text.
   */
  async verifyRangeValue(defaultValue: number, expected: string) {
    const slider = this.page.locator(
      `input[type='range'][value='${defaultValue}']`
    );
    const output = slider
      .locator("xpath=ancestor::div[contains(@id,'slider')]")
      .locator("output");
    await expect(output).toHaveText(expected);
  }
}
