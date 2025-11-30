const readFile = require('./index.js');
const { readFileSync } = require('fs')

async function similarities() {
    const embededAnimal = await readFile();
    let allEmbededData = readFileSync("embededData.json")
    allEmbededData = JSON.parse(allEmbededData)

    let result = allEmbededData.map((items) => {

        let innerResult = items.embeddings.map((item, index) => {
            return item * embededAnimal[index];
        }).reduce((ele, acc) => ele + acc, 0);

        return {
            input:items.input,
            value: innerResult
        }
    });

    result.sort((a,b)=> b.value - a.value)
    console.log(result);     
    
}

similarities()
 


