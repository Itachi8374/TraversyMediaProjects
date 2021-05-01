const search = document.getElementById('search');
const list = document.getElementById('state-list');
console.log(list);

async function searchValue(val){
    const res = await fetch('states.json');
    const list = await res.json();
    const reg = new RegExp(`^${val}`, 'gi');
    let match = list.filter((item) => {
        return item.name.match(reg) || item.abbr.match(reg);
    })
    if(val==''){
        match = [];
    }
    outputHtml(match);

}

const outputHtml = (match) => {
    let output = '';
    match.forEach((m) => {
        output += `
            <div> 
                <ul> 
                    <li> NAME: ${m.name} </li>
                    <li> AABBR: ${m.abbr} </li>
                    <li> CAPITAL: ${m.capital} </li>
                </ul>
            </div>
        `
    });
    
    list.innerHTML = output;
}
search.addEventListener('input', ()=> {searchValue(search.value);})