import axios from "axios";
import { getLogger } from "./logger";

export async function downloadImageToBase64(imageUrl: string): Promise<string> {
  const logger = getLogger(downloadImageToBase64)
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const arrayBuffer = response.data;
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64 = btoa(
      String.fromCharCode.apply(null, Array.from(uint8Array))
    );
    const dataUri = `data:${response.headers["content-type"]};base64,${base64}`;
    return dataUri;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      logger.error("Axios error:", error.toJSON());
    }
    throw new Error(error.message);
  }
}
