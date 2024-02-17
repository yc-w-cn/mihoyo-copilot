export async function urlToHash(url: string): Promise<string> {
  // 将 URL 字符串转换为 ArrayBuffer
  const encoder = new TextEncoder();
  const data = encoder.encode(url);

  // 使用 SHA-256 哈希算法计算哈希值
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // 将哈希值转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
