const { json } = require('stream/consumers');
const readFile = require('./index.js');
const { readFileSync } = require('fs')


function dotPro(a, b) {

}



async function similarities() {

    const embededAnimal = await readFile();

    let allEmbededData = readFileSync("embededData.json")
    allEmbededData = JSON.parse(allEmbededData)

    let result = allEmbededData.map((items, index) => {

        let innerResult = items.embeddings.map((item, index) => {
            return item * embededAnimal[index]
        }).reduce((ele, acc) => ele + acc, 0)

        return innerResult

    });

    console.log(result);
    
    return result
}

 similarities()


