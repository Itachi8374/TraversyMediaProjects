const field = document.querySelector('input');
field.addEventListener('keyup', filterList);

function filterList(){
    const fieldValue= document.querySelector('input').value.toUpperCase();
    let listValues = document.querySelectorAll('.name')
    for(let i=0; i<listValues.length; ++i){
        let listValue = listValues[i].textContent.toUpperCase();
        if(listValue.indexOf(fieldValue)==-1){
            listValues[i].style.display="none";
        }
        else{
            listValues[i].style.display='';
        }
    }
}