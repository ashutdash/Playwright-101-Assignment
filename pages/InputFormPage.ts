import { Page, expect } from "@playwright/test";

export interface FormData {
  name: string;
  email: string;
  password: string;
  company: string;
  website: string;
  country: string;
  city: string;
  address1: string;
  address2: string;
  state: string;
  zip: string;
}

export class InputFormPage {
  private submitBtn;

  constructor(private page: Page) {
    this.submitBtn = page.locator('//button[@type="submit" and normalize-space()="Submit"]');
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async getValidationMessage(): Promise<string> {
    const nameField = this.page.locator("#name");
    return nameField.evaluate((el: HTMLInputElement) => el.validationMessage);
  }

  async assertValidationError(expectedSubstring: string) {
    const msg = await this.getValidationMessage();
    expect(msg).toContain(expectedSubstring);
  }

  async fillForm(data: FormData) {
    await this.page.locator("#name").fill(data.name);
    await this.page.locator("#inputEmail4").fill(data.email);
    await this.page.locator("input[name='password']").fill(data.password);
    await this.page.locator("input[name='company']").fill(data.company);
    await this.page.locator("input[name='website']").fill(data.website);

    // dropdown — select by visible text (label property)
    await this.page
      .locator("select[name='country']")
      .selectOption({ label: data.country });

    await this.page.locator("input[name='city']").fill(data.city);
    await this.page.locator("input[name='address_line1']").fill(data.address1);
    await this.page.locator("input[name='address_line2']").fill(data.address2);
    await this.page.locator("#inputState").fill(data.state);
    await this.page.locator("input[name='zip']").fill(data.zip);
  }

  async assertSuccessMessage() {
    const successMsg = this.page.locator(".success-msg");
    await expect(successMsg).toContainText(
      "Thanks for contacting us, we will get back to you shortly."
    );
  }
}
