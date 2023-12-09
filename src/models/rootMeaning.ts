/**
 * @schema RootMeaning
 * type: object
 * required:
 * - meaningId
 * - rootId
 * - meaning
 * properties:
 * meaningId:
 * type: integer
 * description: to identify the meaning from others
 * example: 1
 * rootId:
 * type: integer
 * description: to identify the root associated with the meaning
 * example: 23
 * meaning:
 * type: string
 * description: the meaning associated with the root
 * example: "To understand or signify"
 */

class RootMeaning {
  meaningId: number;
  rootId: number;
  meaning: string;

  constructor(meaningId: number, rootId: number, meaning: string) {
      this.meaningId = meaningId;
      this.rootId = rootId;
      this.meaning = meaning;
  }

  // Define any model methods here
}

export default RootMeaning;
