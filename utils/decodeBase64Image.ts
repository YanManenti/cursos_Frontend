export default function decodeImageProp(
  base64String: Blob | undefined,
  setFunction: (e: string) => void
) {
  const reader = new FileReader();
  if (!base64String) {
    return null;
  }
  reader.readAsDataURL(base64String);
  reader.onload = () => {
    try {
      if (typeof reader.result !== "string")
        throw new Error("Error reading file");
      const encodedFile = reader.result?.split(",")[1];
      setFunction(`data:image/${base64String.type};base64,${encodedFile}`);
    } catch {
      console.log("Error reading file");
    }
  };
}
