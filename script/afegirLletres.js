const lletresContainer = document.querySelector('#lletresContainer');
const paraulaCombo = document.getElementById("paraulaEntrada");

let alfabet = [];

fetch("http://127.0.0.1:5500/json/alfabet.json")
    .then(resposta => resposta.json())
    .then(function (resposta){
        cargarLletres(resposta["alfabet"]);
    })
    .catch( function (Error) {
        console.log("Error: " + Error);
    });

function cargarLletres(arrayAlfabet){
    
    alfabet = arrayAlfabet;

    //Afegir totes les lletres per jugar
    for (i=0; i<alfabet.length; i++){
        //Agafem lletra del alfabet
        let lletra = alfabet[i];
        //Creem un element boto amb clase i funcio, despres ho afegim
        let lletraBoto = document.createElement('button');
        lletraBoto.className = 'lletresBtn';
        lletraBoto.id = `Btn${lletra}`;
        lletraBoto.textContent = `${lletra}`;
        lletraBoto.addEventListener('click',  ()=> {
            jugarLletra(lletra);
        });
        lletresContainer.appendChild(lletraBoto);
    }
}


//Funcio que comprova que la paraula introduida es valida per jugar
function comprovarParaula(paraula){
    let noEsValida = false;
    //Recorrem la paraula introduida per mirar lletra per lletra
    for (i=0; i<paraula.length && !noEsValida; i++){
        let lletra = paraula[i];
        //Comprovem si es qualsevol lletra del alfabet
        for (j=0; j<alfabet.length; j++){
            if(lletra == alfabet[j]){
                noEsValida = false;
                break;
            } else{
                noEsValida = true;
            }
        }
    }
    return noEsValida;
}


fetch("http://127.0.0.1:8000/penjat/tematica/opcions")
    .then(resposta => resposta.json())
    .then(function (resposta){
        afegirTematiques(resposta);
    })

function afegirTematiques(tematiques){
    tematiques.forEach(element => {
        let option = document.createElement("option");
        option.textContent = element["tema"];
        paraulaCombo.appendChild(option);
    })
}