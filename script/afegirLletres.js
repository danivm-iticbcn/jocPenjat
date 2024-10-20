const lletresContainer = document.getElementById('lletresContainer');

//Afegir totes les lletres per jugar
for (i=65; i<=90; i++){
    let lletra = String.fromCharCode(i);
    let lletraBoto = document.createElement('button');
    lletraBoto.className = 'lletresBtn';
    lletraBoto.id = `Btn${lletra}`;
    lletraBoto.textContent = `${lletra}`;
    lletraBoto.onclick = function(){
        jugarLletra(lletra);
    };
    lletresContainer.appendChild(lletraBoto);
}



function comprovarParaula(paraula){
    let noEsValida = false;
    for (i=0; i<paraula.length && !noEsValida; i++){
        let lletra = paraula[i];
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