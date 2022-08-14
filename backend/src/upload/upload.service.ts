import { ForbiddenException, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ImageKit = require('imagekit')

@Injectable()
export class UploadService {
  // Upload tempatMakan Image
  async uploadImage(file: Express.Multer.File) {
    // New imageKit instance
    // eslint-disable-next-line prefer-const
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    // Upload the file to imageKit
    let resultData
    try {
      resultData = await imagekit.upload({
        file: file.buffer,
        fileName: 'Tempat Makan Image',
      })
    } catch (error) {
      throw new ForbiddenException(error)
    }

    return {
      imageUrl: resultData.url
    }
  }
}
