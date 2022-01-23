/*
The following is a file used to fetch data from the Quran.com APIs and parse the information. 
*/

let axios = require("axios");
// const { response } = require("express");
let chapter_information = {}

/* For each surah from 111 to 114, get the surah informationa and store it ina dictionary */
for(let chapter_number=111; chapter_number < 114; chapter_number++){
  axios.get(`https://api.quran.com/api/v4/chapters/${chapter_number}?language=en`)
  .then((response) => {

    // Extract the object data and put inside the chapter_information variable 
    chapter_information[`Surah_${chapter_number}`] = {...response.data.chapter}

    // Store the translated name parameter seperately
    chapter_information[`Surah_${chapter_number}`].name = chapter_information[`Surah_${chapter_number}`].transalted_name["name"]

    // Printing out the information 
    console.log(chapter_information[`Surah_${chapter_number}`])

    // Call the post endpoint and post it to our db 
  });
}
//console.log(chapter_information)



/* 
# The Surah / Chapter currently has: 
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

*/ 
