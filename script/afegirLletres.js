const lletresContainer = document.getElementById('lletresContainer');

//Afegir totes les lletres per jugar
for (i=65; i<=90; i++){
    //Agafem lletra del alfabet
    let lletra = String.fromCharCode(i);
    //Creem un element boto amb clase i funcio, despres ho afegim
    let lletraBoto = document.createElement('button');
    lletraBoto.className = 'lletresBtn';
    lletraBoto.id = `Btn${lletra}`;
    lletraBoto.textContent = `${lletra}`;
    lletraBoto.onclick = function(){
        jugarLletra(lletra);
    };
    lletresContainer.appendChild(lletraBoto);
}


//Funcio que comprova que la paraula introduida es valida per jugar
function comprovarParaula(paraula){
    let noEsValida = false;
    //Recorrem la paraula introduida per mirar lletra per lletra
    for (i=0; i<paraula.length && !noEsValida; i++){
        let lletra = paraula[i];
        //Comprovem si es qualsevol lletra del alfabet
        for (j=65; j<=90; j++){
            if(lletra == String.fromCharCode(j)){
                noEsValida = false;
                break;
            } else{
                noEsValida = true;
            }
        }
    }
    return noEsValida;
}