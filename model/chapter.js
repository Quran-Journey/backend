/*
The following is a file used to fetch data from the Quran.com APIs and parse the information. 
*/

let axios = require("axios");
const { response } = require("express");
let chapter_information = {}

/* For each surah from 111 to 114, get the surah informationa and store it ina dictionary */
for(let chapter_number=111; chapter_number < 114; chapter_number++){
  axios.get(`https://api.quran.com/api/v4/chapters/${chapter_number}?language=en`)
  .then((response) => {
   // console.log("This is the data coming from the API Alhumdulilah")
   // console.log(response.data)
    // chapter_information[`Surah_${chapter_number}`] = {"chapter_id": response.data.chapter.id,
    //   "revelation_place": response.data.chapter.revelation_place,
    //   "revelation_order": response.data.chapter.revelation_order,
    //   "name_complex": response.data.chapter.name_complex,
    //   "name_arabic": response.data.chapter.name_arabic,
    //   "verses_count": response.data.chapter.verses_count,
    //   "pages": response.data.chapter.pages,
    //   "translated_name": response.data.chapter.translated_name["name"],
    // };
    // concise way
    chapter_information[`Surah_${chapter_number}`] = {...response.data.chapter}
    // chapter_information[`Surah_${chapter_number}`].name = chapter_information[`Surah_${chapter_number}`].transalted_name["name"]

    console.log(chapter_information[`Surah_${chapter_number}`])
  });
}
//console.log(chapter_information)


// function Get Chapters -- Gets all of the chapters 
// 

// Fetch chapters -> Create a endpoint (Inside routes -> lessons.js), then post it inside the then(response)
// then create an endpoint (google)
// Look at routes -> lessons.js 
// I will need to create a Post endpoint 



// Print out the dictionary 
//console.log(chapter_information)

/* For each surah from 111 to 110, get the surah name */

/* Extract the data in JSON format 
What the JSON data for verses should return: 

for(var chapter_number=111; chapter_number < 114; chapter_number++){
    axios.get(`https://api.quran.com/api/v4/chapters/${chapter_number}?language=en`)
    .then((response) => {
      
      const chapter_info = [chapte]
    dict[`chapter_${chapter_number}`] =  
    console.log(response.data);
    });
}


Dictionary: {"verses", [ {"verse1", "" ; }]}
---> Above is incorrect, its a JSON object and shuld be read in as stated here: https://stackoverflow.com/questions/47832013/how-to-read-nested-json-object 

# The chapter currently has: 
CREATE TABLE Surah (
    surah_number INTEGER PRIMARY KEY, -- This is the number corresponding to the surah in question
    revelation_place VARCHAR(20),
    revelation_order INTEGER,
    name_complex VARCHAR(50),
    name_arabic VARCHAR(50), -- TODO: check if this is how we can store the arabic name, I think it's fine
    verses_count INTEGER,
    num_pages INTEGER,
    english_name VARCHAR(50)
);

What I want is: 
Chapter_Information = {Surah_Number_111: [111, makkah, 20, Al-falaq, 605], 
                       Surah_Number_112: [112, makkah, 22, AL-Iklas, 611],
                       Surah_Number_113: [113, makkah, 27, Al-Masad, 621]
                      }
*/ 

/*
The following is a file used to fetch data from the Quran.com APIs and parse the information. 
*/

// let axios = require("axios")
// let chapter_information = {}


// /* For each surah from 111 to 114, get the surah informationa and store it ina dictionary */
// for(let chapter_number=111; chapter_number < 114; chapter_number++){
//   axios.get(`https://api.quran.com/api/v4/chapters/${chapter_number}?language=en`)
//   .then((response) => {
//     //console.log("This is the data coming from the API Alhumdulilah")
//    // console.log(response.data)
//     chapter_information[`Surah_${chapter_number}`] = [response.data.chapter.id,
//       response.data.chapter.revelation_place,
//       response.data.chapter.revelation_order,
//       response.data.chapter.name_complex,
//       response.data.chapter.name_arabic,
//       response.data.chapter.verses_count,
//       response.data.chapter.pages,
//       response.data.chapter.translated_name["name"],
//     ];
//     //console.log(chapter_information)
//   });
// }
// console.log(chapter_information)

