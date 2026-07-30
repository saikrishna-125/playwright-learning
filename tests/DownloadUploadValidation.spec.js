import ExcelJS from "exceljs";
import { test, expect } from "@playwright/test";

async function writeExcel(filePath, searchText, colName, newValue) {
  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile(filePath);

  const worksheet = await workbook.getWorksheet("Sheet1");

  const output = await readExcel(worksheet, searchText, colName);

  const targetCell = await worksheet.getCell(
    output.rowNumber,
    output.colNumber,
  );

  targetCell.value = newValue;

  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText, colName) {
  let output = { rowNumber: -1, colNumber: -1 };

  worksheet.getRow(1).eachCell((cell, colNumber) => {
    if (cell.value === colName) {
      output.colNumber = colNumber;
    }
  });

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.rowNumber = rowNumber;
      }
    });
  });

  return output;
}

test("@APP Download Upload Excel Validation", async ({ page }) => {
  const filePath = "./download.xlsx";
  const searchText = "Mango";
  const colName = "price";
  const newValue = 350;

  await page.goto("https://rahulshettyacademy.com/upload-download-test/");

  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("button", { name: "Download" }).click();

  const download = await downloadPromise;

  await download.saveAs(filePath);

  await writeExcel(filePath, searchText, colName, newValue);

  await page.locator("#fileinput").setInputFiles(filePath);

  await expect(page.locator("div.rdt_Table")).toBeVisible();

  await expect(
    page
      .getByRole("row")
      .filter({ has: page.getByText(searchText) })
      .locator("div[data-column-id='4']"),
  ).toHaveText(String(newValue));

  // await page.pause();
});
