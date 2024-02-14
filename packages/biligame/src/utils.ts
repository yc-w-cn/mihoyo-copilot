import fs from "fs/promises";
import path from "path";

export async function fileExists(filename: string, fileDir: string) {
  const filePath = path.join(fileDir, filename);
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function saveToFile(
  data: object | string,
  filename: string,
  outputDir: string
) {
  const dataString =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);
  const outputFile = path.join(outputDir, filename || "output.json");
  try {
    await fs.writeFile(outputFile, dataString);
    console.log(`File ${filename} saved successfully!`);
  } catch (err) {
    console.error(`Error writing file ${filename}:`, err);
  }
}

export async function readFromFile(filename: string, inputDir: string) {
  try {
    const filePath = path.join(inputDir, filename || "input.json");
    const result = await fs.readFile(filePath, "utf-8");
    console.log(`File ${filename} loaded successfully!`);
    return result;
  } catch (err) {
    console.error(`Error reading file ${filename}:`, err);
  }
}
