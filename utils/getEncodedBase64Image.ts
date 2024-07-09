export default function getEncodedBase64Image(
  e: any,
  setFunction: (e: string) => void
) {
  setFunction(e.target.files[0]);
}
