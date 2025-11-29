const panda = [0.75, 0.22];
const tiger = [-0.28, 0.70];

function dotPro(a,b){
    const result = panda.map((item, index)=>{
        return panda[index]*tiger[index]
    }).reduce((item, acc)=> item+acc, 0)

    return result
}

const result = dotPro(panda, tiger);
console.log(result);
