/* eslint-disable @typescript-eslint/restrict-template-expressions */
import fs from 'fs';
import path from 'path';
import { transformError } from './transform';
export const deleteImages = async (listImage: Array<object>) => {
  return await Promise.all(
    listImage.map(async (imagePath: any) => {
      return await fs.unlinkSync(
        path.join(__dirname, `../../public/${imagePath.path}`)
      );
    })
  );
};

export const checkImagesExist = async (listImage: Array<any>) => {
  return await Promise.all(
    listImage.map(async (image: any) => {
      const imageExist = await fs.existsSync(
        path.join(__dirname, `../../public/${image.path}`)
      );
      if (!imageExist) {
        transformError(`Image: ${image.path} is not exist`);
      }
    })
  );
};
