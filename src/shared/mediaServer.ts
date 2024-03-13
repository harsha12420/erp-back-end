// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as AWS from "aws-sdk";
import { randomUUID } from "crypto";

export class MediaServer {
  public static async upload(file: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const fileDetails = {
          name: file.originalname,
          type: file.mimetype,
        };
        const uploadFile = await this.uploadOns3(
          file.buffer,
          "public",
          file.originalname
        );
        if (uploadFile) {
          resolve(fileDetails);
        } else {
          reject(false);
        }
      } catch (err) {
        console.log("media upload error---", err);
        reject(false);
      }
    });
  }

  public static async multipleUpload(files: any, path) {
    try {
      const uploadedFileDetails = [];

      for (const file of files) {
        const uuid = randomUUID(); // Generate a random UUID
        const newName = `${uuid}${file.originalname}`;

        // Prepare the file details object
        const fileDetails = {
          name: file.originalname,
          type: file.mimetype,
          path: `${path}/${newName}`,
        };

        // Upload the file to S3 and await its completion
        const uploadFile = await this.uploadOns3(file.buffer, path, newName);
        if (uploadFile) {
          uploadedFileDetails.push(fileDetails);
        } else {
          throw new Error("Upload to S3 failed");
        }
      }

      return uploadedFileDetails; // Return the details of all uploaded files
    } catch (err) {
      console.error("Media upload error:", err);
      throw new Error("Media upload error"); // Reject the promise in case of an error
    }
  }

  public static async uploadOns3(buffer, folderName, filePath) {
    try {
      AWS.config.update({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
      const s3 = new AWS.S3({
        region: process.env.AWS_DEFAULT_REGION,
      });
      return s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: buffer,
          Key: `${folderName}/${filePath}`,
        })
        .promise();
    } catch (err) {
      console.error("media uploadOns3 error---", err);
      return false;
    }
  }
}
