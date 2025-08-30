/* eslint-disable @typescript-eslint/no-explicit-any */
import FileManager from "../../engine/Filesystem/FileManager";

import { ClassBased } from "outers";
import responseHelper from "../../Helper/response.helper";
import {
  ErrorInterface,
  SuccessInterface,
} from "../../config/Interfaces/Helper/response.helper.interface";
import { General } from "../../config/Keys/Keys";
import Converter from "../../Helper/Converter.helper";

/**
 * Class representing an insertion operation.
 */
export default class Insertion {
  private readonly collectionName: string;
  private readonly path: string | any;
  private readonly Converter: Converter;

  /**
   * Creates an instance of Insertion.
   * @param {string} collectionName - The name of the collection.
   * @param {string | any} path - The data to be inserted.
   */
  constructor(collectionName: string, path: string | any) {
    this.collectionName = collectionName;
    this.path = path;
    this.Converter = new Converter();
  }

  /**
   * Saves the data to a file.
   * @returns {Promise<any>} A promise that resolves with the response of the save operation.
   */
  public async Save(
    data: object | any,
    ExistingdocumentId?: string,
  ): Promise<SuccessInterface | ErrorInterface> {
    try {
      const documentId: string =
        ExistingdocumentId === undefined
          ? await this.generateUniqueDocumentId()
          : ExistingdocumentId;

      const filePath = `${this.path}/.${documentId}${General.DBMS_File_EXT}`;

      // Directly write data to file (no lock/unlock system)
      const WriteResponse = await new FileManager().WriteFile(
        filePath,
        this.Converter.ToString(data),
      );

      if (WriteResponse.status) {
        return new responseHelper().Success({
          Message: "Data Inserted Successfully",
          documentId: documentId,
        });
      }

      return new responseHelper().Error("Failed to save data");
    } catch (error) {
      return new responseHelper().Error(error);
    }
  }

  /**
   * Generates a unique document ID.
   * @returns {Promise<string>} A promise that resolves with a unique document ID.
   */
  public async generateUniqueDocumentId(): Promise<string> {
    let isExist = true;
    let ID;
    do {
      ID = new ClassBased.UniqueGenerator(15).RandomWord(true);
      const response = await new FileManager().FileExists(
        `${this.path}/${ID}${General.DBMS_File_EXT}`,
      );
      isExist = response.status;
    } while (isExist);

    return ID;
  }
}
