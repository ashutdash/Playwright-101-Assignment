import { test } from "../utils/fixtures";
import { HomePage } from "../pages/HomePage";
import { SimpleFormPage } from "../pages/SimpleFormPage";

test.describe("Scenario1", () => {
  test("test1", async ({
    page,
  }) => {
    const message = "Welcome to TestMu AI";

    const home = new HomePage(page);
    await home.navigate();
    await home.openSimpleFormDemo();

    const form = new SimpleFormPage(page);
    await form.verifyPageUrl();
    await form.enterMessage(message);
    await form.clickGetCheckedValue();
    await form.verifyOutputMessage(message);
  });
});
