import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
 
dotenv.config();
 
export default defineConfig({
  testDir: "./tests",
 
  timeout: 180000,
 
  expect: {
    timeout: 15000,
  },
 
  fullyParallel: true,
 
  workers: 2,
 
  retries: 0,
 
  reporter: [
    ["html", { open: "never" }],
    ["list"],
  ],
 
  use: {
    baseURL: "https://www.testmuai.com/selenium-playground/",
 
    screenshot: "only-on-failure",
 
    video: "retain-on-failure",
 
    trace: "on-first-retry",
  },
 
  projects: [
    {
      name: "win10-edge",
 
      metadata: {
        browserName: "MicrosoftEdge",
 
        browserVersion: "latest",
 
        platform: "Windows 10",
      },
    },
 
    {
      name: "macos-chrome",
 
      metadata: {
        browserName: "pw-chromium",
 
        browserVersion: "latest",
 
        platform: "macOS Ventura",
      },
    },
  ],
});