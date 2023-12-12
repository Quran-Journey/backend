import { apiGET, apiPOST, apiPUT, apiDELETE } from './request';
import { seedData } from "../services/postgres/seed";
import { Errors } from '../utils/constants';
import { Mufasir } from '../models/tafsir/mufasir';

function mufasirTests() {
  it('getting all the mufasireen', async () => {
    let mufasir1 = seedData.Mufasir[0];

    const resp1 = await apiGET('/mufasir');
    let mufasirA = resp1.data.data[0];
    checkMatch(mufasir1, mufasirA);
    expect(resp1.data.success).toEqual(true);
  });

  it('adding a mufasir', async () => {
    let new_mufasir = {
      mufasirName: 'Ibn Abbas',
      death: '687 AD',
    };

    let resp1 = await apiPOST('/mufasir', new_mufasir);
    let mufasir = resp1.data.data[0];
    checkMatch(new_mufasir, mufasir);
    expect(resp1.data.success).toEqual(true);
  });

  it('updating a mufasir', async () => {
    let new_mufasir = {
      mufasirId: 3,
      mufasirName: 'Muqatil',
      death: '767 AD',
    };

    let resp1 = await apiGET('/mufasir/3');
    let original_mufasir = resp1.data.data[0];
    expect(original_mufasir.mufasirName).not.toEqual(new_mufasir.mufasirName);
    expect(original_mufasir.death).not.toEqual(new_mufasir.death);

    await apiPUT('/mufasir', new_mufasir);
    let resp2 = await apiGET('/mufasir/3');
    checkMatch(new_mufasir, resp2.data.data[0]);
    expect(resp2.data.success).toEqual(true);
  });

  it('deleting a mufasir', async () => {
    let resp = await apiGET('/mufasir/3');
    let resp1 = await apiDELETE('/mufasir/3');
    // We want to ensure that the deleted mufasir is the correct mufasir.
    expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
    expect(resp1.data.success).toEqual(true);

    let resp2 = await apiGET('/mufasir/3');
    expect(resp2.data.code).toEqual(Errors.DB_DNE);
    expect(resp2.data.success).toEqual(false);
  });
}

function checkMatch(mufasirA: Mufasir, mufasirB: Mufasir) {
  expect(mufasirA.mufasirName).toEqual(mufasirB.mufasirName);
  expect(mufasirA.death).toEqual(mufasirB.death);
}

export { mufasirTests };
