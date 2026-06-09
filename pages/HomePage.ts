import { Page } from "@playwright/test";

const PLAYGROUND_URL = "https://www.testmuai.com/selenium-playground/";

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto(PLAYGROUND_URL);
  }

  async openSimpleFormDemo() {
    await this.page.locator('//a[normalize-space()="Simple Form Demo"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async openDragDropSliders() {
    await this.page.locator('//a[normalize-space()="Drag & Drop Sliders"]').click();
    await this.page.waitForLoadState("networkidle");
  }

  async openInputFormSubmit() {
    await this.page.locator('//a[normalize-space()="Input Form Submit"]').click();
    await this.page.waitForLoadState("networkidle");
  }
}
