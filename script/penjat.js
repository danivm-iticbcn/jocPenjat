//ELEMENTS HTML
const entradaParaula = document.getElementById('paraulaEntrada');
const ullIcon = document.getElementById("verIcon");
const comencar = document.getElementById("startBtn");
const paraulaEstat = document.getElementById('paraulaEstat');

//ELEMENTS LOGICA
let jugadas = 0;

let paraulaSecreta;

function comencarPartida(){

    paraulaSecreta = entradaParaula.value;

    //VALIDACIONS
    if(paraulaSecreta){
        if(paraulaSecreta.length > 3){
            let arrayParaulaSecreta = paraulaSecreta.split("");
            let hayNumerosOEspais = hiHaNumerosOEspais(arrayParaulaSecreta)
            if (hayNumerosOEspais){
                alert("La paraula no pot tenir numeros ni espais.")
            } else{
                //UNA VEGADA SUPERAT TOTES LES VALIDACIONS DESHABILITEM EL INPUT I BOTO
                entradaParaula.disabled = true;
                comencar.disabled = true;
                iniciarEstatParaula(arrayParaulaSecreta.length);
                console.log(hayNumerosOEspais);
                console.log(arrayParaulaSecreta);
            }
        }else{
            alert('La paraula ha de tenir mes de 3 lletres.');
        }
    }else{
        alert('No has introduit una paraula.');
    }
}


/////FUNCIONS\\\\\
function veureContrasenya(){
    if(entradaParaula.type == "password"){
        entradaParaula.type = "text";
        ullIcon.textContent = "visibility_off";
    }else{
        entradaParaula.type = "password";
        ullIcon.textContent = "visibility";
    } 
}

function hiHaNumerosOEspais(array){
    let hayNumerosOEspais = false;
    for(i=0; i<array.length && !hayNumerosOEspais; i++){
        if(!isNaN(array[i]) || array[i] == " "){
            hayNumerosOEspais = true;
        }
    }
    return hayNumerosOEspais;
}

function iniciarEstatParaula(distancia){
    let stringGuio = "";
    for (i=0; i<distancia; i++){
        stringGuio += "-";
    }
    paraulaEstat.textContent = stringGuio;
}


function comprobarLletra(lletra){
    comprobarLletra(lletra);
    console.log(lletra);
}

function comprobarLletra(lletra){
    let botonLletra = document.getElementById(`Btn${lletra}`);
    botonLletra.disabled = true;
    botonLletra.style.color = "red";
}