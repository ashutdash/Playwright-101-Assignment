import { test } from "../utils/fixtures";
import { HomePage } from "../pages/HomePage";
import { SliderPage } from "../pages/SliderPage";

test.describe("Scenario2", () => {
  test("test2", async ({
    page,
  }) => {
    const home = new HomePage(page);
    await home.navigate();
    await home.openDragDropSliders();

    const slider = new SliderPage(page);
    await slider.dragSliderTo(15, 95);
    await slider.verifyRangeValue(15, "95");
  });
});
