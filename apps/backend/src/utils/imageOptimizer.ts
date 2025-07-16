import sharp from "sharp";

export const optimizeImage = async (
 buffer: Buffer<ArrayBufferLike>,
 width: number,
 height: number
) => {
 const webpBuffer = await sharp(buffer)
  .resize({
   width: width,
   height: height,
   fit: "cover",
  })
  .webp({ quality: 80 })
  .toBuffer();
 return webpBuffer;
};
