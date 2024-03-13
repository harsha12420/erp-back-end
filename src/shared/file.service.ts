import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Constants, S3FolderList } from './constants';

@Injectable()
export class FilesService {
  private readonly logger = new Logger('FilesService');
  constructor(private readonly configService: ConfigService) {}

  async createOrganizationFolder(folderName) {
    try {
      const s3 = new AWS.S3({
        signatureVersion: 'v4', // Use AWS4-HMAC-SHA256 signing algorithm
        region: this.configService.get('AWS_DEFAULT_REGION'),
      });
      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `${folderName}/${S3FolderList.document}`, // Note the trailing slash to indicate a folder-like structure
        Body: '', // Empty body since it's just a "folder"
      };
      await s3.putObject(params).promise();
      return true;
    } catch (err) {
      this.logger.log(err);
      this.logger.error(err);
      throw new BadRequestException(
        Constants.ResponseMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createSchoolFolder(folderName) {
    try {
      const s3 = new AWS.S3({
        signatureVersion: 'v4', // Use AWS4-HMAC-SHA256 signing algorithm
        region: this.configService.get('AWS_DEFAULT_REGION'),
      });
      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `${process.env.AWS_BUCKET_FOLDER}-${folderName}/`, // Note the trailing slash to indicate a folder-like structure
        Body: '', // Empty body since it's just a "folder"
      };
      await s3.putObject(params).promise();
      await this.createMultipleFolder(folderName);
      return true;
    } catch (err) {
      this.logger.log(err);
      this.logger.error(err);
      throw new BadRequestException(
        Constants.ResponseMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMultipleFolder(folderName) {
    try {
      const enumArray = Object.values(S3FolderList);
      const s3 = new AWS.S3({
        signatureVersion: 'v4', // Use AWS4-HMAC-SHA256 signing algorithm
        region: this.configService.get('AWS_DEFAULT_REGION'),
      });
      for (const subfolder of enumArray) {
        const folderPath = `${folderName}/${subfolder}`;
        const params = {
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: `${folderPath}/`,
          Body: '',
        };
        try {
          await s3.putObject(params).promise();
        } catch (error) {
          this.logger.log(error);
          console.error(
            `Error creating folder '${folderPath}': ${error.message}`,
          );
        }
      }
    } catch (err) {
      this.logger.error(err);
      throw new BadRequestException(
        Constants.ResponseMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateUploadPresingImageUrl(folderName, fileData) {
    try {
      const s3 = new AWS.S3({
        signatureVersion: 'v4', // Use AWS4-HMAC-SHA256 signing algorithm
        region: this.configService.get('AWS_DEFAULT_REGION'),
      });
      const fileName = `${uuid()}-${fileData.file_name}`;
      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `${folderName}/${S3FolderList.school_image}/${fileName}`,
        Expires: Number(this.configService.get('AWS_EXPIRE_TIME')),
        ContentType: fileData.ContentType,
        ACL: 'private',
        // ACL: 'private', // Set the appropriate ACL (Access Control List)
      };

      return s3.getSignedUrl('putObject', params);
    } catch (err) {
      this.logger.log('-----------------------err-----------------', err);
      throw new BadRequestException(
        Constants.ResponseMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async generateUploadCommonPresingImageUrl(folderName, fileData) {
    try {
      const s3 = new AWS.S3({
        signatureVersion: 'v4', // Use AWS4-HMAC-SHA256 signing algorithm
        region: this.configService.get('AWS_DEFAULT_REGION'),
      });
      const fileName = `${uuid()}-${fileData.file_name}`;
      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `${process.env.AWS_BUCKET_FOLDER}-${folderName}/${fileName}`,
        Expires: Number(this.configService.get('AWS_EXPIRE_TIME')),
        ContentType: fileData.ContentType,
        ACL: 'private',
        // ACL: 'private', // Set the appropriate ACL (Access Control List)
      };

      return s3.getSignedUrl('putObject', params);
    } catch (err) {
      this.logger.log('-----------------------err-----------------', err);
      throw new BadRequestException(
        Constants.ResponseMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateUploadCommonAllDocumentPresingImageUrl(folderName, fileData) {
    try {
      const s3 = new AWS.S3({
        signatureVersion: 'v4', // Use AWS4-HMAC-SHA256 signing algorithm
        region: this.configService.get('AWS_DEFAULT_REGION'),
      });
      const fileName = `${uuid()}-${fileData.file_name}`;
      const params = {
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: `${folderName}/${fileName}`,
        Expires: Number(this.configService.get('AWS_EXPIRE_TIME')),
        ContentType: fileData.ContentType,
        ACL: 'private',
        // ACL: 'private', // Set the appropriate ACL (Access Control List)
      };

      return s3.getSignedUrl('putObject', params);
    } catch (err) {
      this.logger.log('-----------------------err-----------------', err);
      throw new BadRequestException(
        Constants.ResponseMessages.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
