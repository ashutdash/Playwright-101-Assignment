import { test } from "../utils/fixtures";
import { HomePage } from "../pages/HomePage";
import { InputFormPage, FormData } from "../pages/InputFormPage";


const testData: FormData = {
  name: "AK",
  email: "ak@gamil.com",
  password: "123",
  company: "ABC",
  website: "https://www.example.com",
  country: "Denmark",
  city: "Hyderabad",
  address1: "123 Street",
  address2: " Apt 4 ",
  state: "Anios",
  zip: "51234",
};

test.describe("Scenario3", () => {
  test("test3", async ({ page }) => {
    const home = new HomePage(page);
    await home.navigate();
    await home.openInputFormSubmit();

    const form = new InputFormPage(page);

    // submit with nothing filled
    await form.clickSubmit();
    await form.assertValidationError("Please fill");

    // fill every field and submit
    await form.fillForm(testData);
    await form.clickSubmit();
    await form.assertSuccessMessage();
  });
});
