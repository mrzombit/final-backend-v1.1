import {StorageFile} from "./storage-file";
import {DownloadResponse, Storage} from "@google-cloud/storage";
import {Injectable} from "@nestjs/common";
import StorageConfig from "./storage-config";

@Injectable()
export class StorageService {

  public storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key,
        // private_key: "----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCySo2GDPsQK7Tn\noQ3GT7byofchpHi1amVsS3/HnW1O0nbfFAdHjafWUA29hVESNy8GcPvhup7jCzpX\n+FbwfR7DF82WCkkY3IcyhamQMTGDbhrmre5ydLpFaTI2Q4KlheBr/mF5TFx3Aj/0\nVCNwS9/dR0qYk7emECubjsmo2Q5kk4EsZNc7rPji8kEI2DywwhafOZwlxTXHfk0V\njZlCB4GGq8aGXtEajFsgARFUgQSCnaVtmOi99NYXHhqRAFMQeo/i13WsbEKgKmBG\nSOH8Ux8lH0SBOD/fei5KmrEFCC8W9a0/wPDuLpH5UlGi7Tyod3i8tVLyLEPkQ3dM\n+elUgCDFAgMBAAECggEAIYOcn0xs3EEPADR4yaSd4/WYpiEL1LRDjOwTQLNhwv2S\nfUP/S07ANCu3rX60OtuXMhuGaYviRpULelJTC2FFqVAd49yamXsIyfEwqstofodx\ntJeQ2UCCbD5GQ0eE9TbZdQtsCLhXMELCwVuYjskgc3Ctf8lSrftfqx3X3+6vQy3b\nudxQzWFUz/TogRVtLwSue6/ljZyHByiEEp8wn487IVPoY1TB/+b5mUhpFdjiv8lZ\nRzs6YTJce2N16vMRcfzDZR7pHYFpwqITUsJVjgRAb4SJ8woj5KLr1EAJOpPcGbi4\nM4SzKJMB0bKrui754mQ+GfMnNWJqwsJxf5YG8+YHkQKBgQDW/07ljjKx7XCb5zdG\njx3bs9wZPW1qxfDhSJ8D/aWGXTjXCv+HSJdwTh4/vEUY8CKiliSAx3ylbHB6m2AH\nN5eTuyq0DLDngzFufbEu3eAiwZZ5VI9z8PEJuwmQxubvcVHYHAP7YHoBGgG2UClz\nXKy2eVYPgWbiMnOjgB3Z5ZE9EQKBgQDUSyojqTmqqbnOHFNzKzK6I+gCICReaJjE\ng8Yk9CxPwg9gezKfzSAyoxaR8E1nrMQK8xUNcyG+qOcWP8LF9mv6QtwYNnkQ2mfT\nKWkpE8hLxRVry6t2jfpUY4PbqNdNgYRPaDOUt0nxhfbU1hkyqTvp9yov0ViBIxEB\nUxCNDYu4dQKBgBwGleNIoQUenYJFJqh0+YBtNrC3mC7F9Lt5OvlLNCuKtWEa1ups\npQkHtdu7EArLKsik58c9udraguMIpADs1z5ztIJZ8SmMqYHsso8YbyI4uAPC6RxE\n+Ta6gem0c+Acln2kUUSQc/b2y+hXFMAsAXub34MP7DhqOTbD+aAw07jxAoGAQWHE\n4KbFs+IB75CZwuaTAPD+C2mKyei85AkRhWAOJaJGyhgnR0ANoorH8LppnHyBBD5J\nRZMn2Wh7g0av3fg+2RyuXGaqcp5RS599W8FT9sIEDubzL9gaONNNUOF3Lc+tyCb3\ne93XUCNKGdK2f/vPEAenXoLDF0KNgjLq7gY1+eECgYAnXsLjbfbvWd8sQpsM4bqb\npkeWbTWZ/IIIQrkDumWzXOrYnDsYv4+dYpQ7bbSqtBWaDMiyRXNwC35ghsjMOGHV\n12tlXJMmkuM0XaX4WXC18KiHedKGaGU71gsMiDXcvT24gXbfGw2tkRRhzjmHSvr8\nqnnqD/jmWl1REuofx7A/bw==\n-----END PRIVATE KEY-----\n",
      }
    });    
    this.bucket = StorageConfig.mediaBucket;
  }

  async delete(path: string) {
    await this.storage.bucket(this.bucket).file(path).delete({ignoreNotFound: true})
  }

  async get(path: string): Promise<StorageFile> {
    const fileResponse:DownloadResponse = await this.storage.bucket(this.bucket).file(path).download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>()
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {
    const [metadata] = await this.storage.bucket(this.bucket).file(path).getMetadata();
    const fileResponse:DownloadResponse = await this.storage.bucket(this.bucket).file(path).download();
    const [buffer] = fileResponse;

    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(Object.entries(metadata || {}))
    storageFile.contentType = storageFile.metadata.get("contentType");
    return storageFile;
  }

  async save(path: string, contentType: string, media: Buffer, metadata: { [key: string]: string }[]) {
    const object = metadata.reduce(
      (obj, item) => Object.assign(obj, item), {})
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();
    stream.on("finish", async () => {
      return await file.setMetadata( {
        metadata: object
      })
    });
    stream.end(media);
  }
}