import { apiGET, apiPOST, apiPATCH, apiDELETE } from '../request';
import { seedData } from "../../services/postgres/seed";
import { Errors } from '../../utils/constants';
import { RootWord } from '../../models/word/rootWord';

export function rootTests() {
  it('getting a root word by id', async () => {
    let rootA = seedData.RootWord[0];

    const resp1 = await apiGET(`/word/root/1`);
    let rootB = resp1.data.data[0];
    checkMatch(rootA, rootB);
    expect(resp1.data.success).toEqual(true);
  });

  it('adding a root word', async () => {
    let newRoot :RootWord = new RootWord(seedData.RootWord.length + 2, 'ر ب');

    let resp1 = await apiPOST(`/word/root`, newRoot);
    let root = resp1.data.data[0];
    expect(resp1.data.success).toEqual(true);
    checkMatch(newRoot, root);
  });

  it('updating a root word', async () => {
    let newRoot = new RootWord(seedData.RootWord.length + 2, 'ر ب ب');

    let resp1 = await apiGET(`/word/root/${newRoot.rootId}`);
    let originalRoot = resp1.data.data[0];
    expect(originalRoot.rootWord).not.toEqual(newRoot.rootWord);

    await apiPATCH(`/word/root`, newRoot);
    let resp2 = await apiGET(`/word/root/${newRoot.rootId}`);
    checkMatch(newRoot, resp2.data.data[0]);
    expect(resp2.data.success).toEqual(true);
  });

  it('deleting a root', async () => {
    async () => {
      let resp = await apiGET(`/word/root/1`);
      let resp1 = await apiDELETE(`/word/root/1`);
      // We want to ensure that the deleted lesson is the correct lesson.
      expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
      expect(resp1.data.success).toEqual(true);

      let resp2 = await apiGET(`/word/root/1`);
      expect(resp2.data.code).toEqual(Errors.DB_DNE);
      expect(resp2.data.success).toEqual(false);
    };
  });
}

function checkMatch(rootA: RootWord, rootB: RootWord) {
  expect(rootA.rootId).toEqual(rootB.rootId);
  expect(rootA.rootWord).toEqual(rootB.rootWord);
}
