import { apiGET, apiPOST, apiDELETE, apiPUT } from '../request';
import { seedData } from "../../services/postgres/seed";
import { Errors } from '../../utils/constants';
import { RootMeaning } from '../../models/word/rootMeaning';

function meaningTests() {
  it('getting a root meaning by id', async () => {
    let rootA = seedData.RootMeaning[0];

    const resp1 = await apiGET('/word/root/meaning/1');
    let rootB = resp1.data.data[0];
    checkMatch(rootA, rootB);
    expect(resp1.data.success).toEqual(true);
  });

  it('adding a root meaning', async () => {
    let newMeaning: RootMeaning = {
      rootId: 1,
      meaning: 'high',
    };

    let resp1 = await apiPOST('/word/root/meaning', newMeaning);
    let meaning = resp1.data.data[0];
    expect(resp1.data.success).toEqual(true);
    checkMatch(newMeaning, meaning);
  });

  it('updating a root meaning', async () => {
    let newMeaning: RootMeaning = {
      meaningId: 1,
      rootId: 1,
      meaning: 'elevated',
    };

    let resp1 = await apiGET(`/word/root/meaning/${newMeaning.rootId}`);
    let originalMeaning = resp1.data.data[0];
    expect(originalMeaning.meaning).not.toEqual(newMeaning.meaning);

    await apiPUT('/word/root/meaning', newMeaning);
    let resp2 = await apiGET(`/word/root/meaning/${newMeaning.rootId}`);
    checkMatch(newMeaning, resp2.data.data[0]);
    expect(resp2.data.success).toEqual(true);
  });

  it('deleting a root meaning', async () => {
    let resp = await apiGET('/word/root/meaning/1');
    let resp1 = await apiDELETE('/word/root/meaning/1');
    // We want to ensure that the deleted meaning is the correct meaning.
    expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
    expect(resp1.data.success).toEqual(true);

    let resp2 = await apiGET('/word/root/meaning/1');
    expect(resp2.data.code).toEqual(Errors.DB_DNE);
    expect(resp2.data.success).toEqual(false);
  });
}

function checkMatch(meaningA: RootMeaning, meaningB: RootMeaning) {
  expect(meaningA.rootId).toEqual(meaningB.rootId);
  expect(meaningA.meaning).toEqual(meaningB.meaning);
}

export { meaningTests };
