export function imagePath(image: string): string {
  console.log(`PUBLIC_URL=${process.env.PUBLIC_URL}`);
  return `${process.env.PUBLIC_URL}/assets/images/${image}`;
}
