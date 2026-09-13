type ClipboardWriter = (text: string) => Promise<void>;

export async function copyText(
  text: string,
  write: ClipboardWriter = (value) => navigator.clipboard.writeText(value),
) {
  try {
    await write(text);
    return true;
  } catch {
    return false;
  }
}
