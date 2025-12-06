function findMaches(snippet, userQuery){
    if(!userQuery) return [];

    const queryWords=userQuery.toLowerCase().split(/\s+/).filter(ele=> ele.length>2);

    const matches = [];

    for(let word of queryWords){
        if(snippet.toLowerCase().includes(word)){
            matches.push(word)
        }
    }    
    return Array.from (new Set(matches));
}

export default findMaches;