export default async function decodeImageProp(
  base64String: File | null | undefined
): Promise<string> {
  // const result = ref("");
  // const setResult = (e: string) => {
  //   result.value = e;
  // };
  // const reader = new FileReader();
  // if (!base64String) {
  //   return null;
  // }
  // reader.readAsDataURL(base64String);
  // reader.onload = () => {
  //   try {
  //     if (typeof reader.result !== "string")
  //       throw new Error("Error reading file");
  //     const encodedFile = reader.result?.split(",")[1];
  //     setResult(`data:image/${base64String.type};base64,${encodedFile}`);
  //   } catch {
  //     throw new Error("Error reading file");
  //   }
  // };
  // return result.value;
  if (!base64String) {
    return "";
  }
  const result = await readFile(base64String).then((result) => {
    try {
      if (typeof result !== "string") throw new Error("Error reading file");
      const encodedFile = result?.split(",")[1];
      return `data:image/${base64String.type};base64,${encodedFile}`;
    } catch {
      throw new Error("Error reading file");
    }
  });

  return result;
}

const reader = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });
};
const readFile = async (file: File) => {
  return reader(file).then((result) => result);
};
