import { Page, expect } from "@playwright/test";

export class SimpleFormPage {
  // locators
  private messageInput;
  private getCheckedValueBtn;
  private outputMessage;

  constructor(private page: Page) {
    this.messageInput = page.getByPlaceholder("Please enter your Message");
    this.getCheckedValueBtn = page.locator('//button[@id="showInput"]');
    this.outputMessage = page.locator("#message");
  }

  async verifyPageUrl() {
    await expect(this.page).toHaveURL(/simple-form-demo/);
  }

  async enterMessage(text: string) {
    await this.messageInput.fill(text);
  }

  async clickGetCheckedValue() {
    await this.getCheckedValueBtn.click();
  }

  async verifyOutputMessage(expected: string) {
    await expect(this.outputMessage).toHaveText(expected);
  }
}
