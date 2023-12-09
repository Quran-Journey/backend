import { apiGET, apiPOST, apiPATCH, apiDELETE } from './request';
import data from '../services/postgres/seed';
import { Errors } from '../utils/constants';
import {Reflection} from "../types/Reflection";

const seedData = data.seedData;


function reflectionTests() {
    it("getting reflection's information", async () => {
        let ReflectionA: Reflection = seedData.Reflection[0];

        const resp1 = await apiGET(`/reflection/1`);
        let ReflectionB: Reflection = resp1.data.data[0];
        checkMatch(ReflectionA, ReflectionB);
        expect(resp1.data.success).toEqual(true);
    });

    it("getting reflection's information by surah id and verse id", async () => {
        let ReflectionA: Reflection = seedData.Reflection[0];

        const resp1 = await apiGET(`/reflection/1/1`);
        let reflectionB: Reflection = resp1.data.data[0];
        expect(ReflectionA.title).toEqual(reflectionB.title);
        expect(ReflectionA.reflection).toEqual(reflectionB.reflection);
        expect(ReflectionA.reflection_id).toEqual(reflectionB.reflection_id);
        expect(resp1.data.success).toEqual(true);
    });

    it("creating a reflection", async () => {
        let newreflection: Reflection = {
            verse_id: 1,
            title: "Inshallah",
            reflection: "My Second Reflection",
            reflection_id: 0, // assuming reflection_id is auto-incremented
        };

        let resp1 = await apiPOST(`/reflection`, newreflection);
        let reflection: Reflection = resp1.data.data[0];
        checkMatch(newreflection, reflection);
        expect(resp1.data.success).toEqual(true);
    });

    it("updating a reflection", async () => {
        let newreflection: Reflection = {
            reflection_id: 1,
            verse_id: 1,
            title: "Alhamdulillah",
            reflection: "My Last Reflection",
        };

        let resp1 = await apiGET(`/reflection/1`);
        let original_reflection: Reflection = resp1.data.data[0];
        expect(original_reflection.title).not.toEqual(newreflection.title);
        expect(original_reflection.reflection).not.toEqual(newreflection.reflection);

        await apiPATCH(`/reflection`, newreflection);
        let resp2 = await apiGET(`/reflection/1`);
        checkMatch(newreflection, resp2.data.data[0]);
        expect(resp2.data.success).toEqual(true);
    });

    // it("delete a reflection", async () => {
    //     let resp = await apiGET(`/reflection/1`);
    //     let resp1 = await apiDELETE(`/reflection/1`);
    //     // We want to ensure that the deleted lesson is the correct lesson.
    //     expect(resp1.data.data[0]).toEqual(resp.data.data[0]);
    //     expect(resp1.data.success).toEqual(true);
    //     console.log(resp1, "response");
    //     let resp2 = await apiGET(`/reflection/1`);
    //     expect(resp2.data.code).toEqual(Errors.DB_DNE);
    //     expect(resp2.data.success).toEqual(false);
    // });
}

function checkMatch(reflectionA: Reflection, reflectionB: Reflection) {
    expect(reflectionA.title).toEqual(reflectionB.title);
    expect(reflectionA.reflection).toEqual(reflectionB.reflection);
    expect(reflectionA.verse_id).toEqual(reflectionB.verse_id);
}

export { reflectionTests };
