//ELEMENTS HTML
const entradaParaula = document.getElementById('paraulaEntrada');
const ullIcon = document.getElementById("verIcon");
const comencar = document.getElementById("startBtn");
const paraulaEstat = document.getElementById('paraulaEstat');

//ELEMENTS LOGICA
let jugadas = 0;
let paraulaSecreta;
let arrayParaulaSecreta;
let arrayEncertades;
let enJuego = false;

//Evitem que el formulari refresqui la pagina i en cop d'aixo llenci comencarPartida
document.getElementById('formularioHeader').addEventListener('submit', function(event) {
    event.preventDefault();
    comencarPartida();
});


////////FUNCIONS\\\\\\\\
function comencarPartida(){
    paraulaSecreta = entradaParaula.value.toUpperCase();

    //VALIDACIONS
    if(paraulaSecreta){
        if(paraulaSecreta.length > 3){
            //Pasem la paraula a una llista
            arrayParaulaSecreta = paraulaSecreta.split("");
            //Comprobem si hi han numeros o esapis en blanc
            if (hiHaNumerosOEspais(arrayParaulaSecreta)){
                alert("La paraula no pot tenir numeros ni espais.");
            } else{
                //UNA VEGADA SUPERAT TOTES LES VALIDACIONS DESHABILITEM EL INPUT, EL BOTO I COMENCEM PARTIDA
                enJuego = true;
                deshabilitarElementsHeader();
                arrayEncertades = crearArrayLletresEncertades(arrayParaulaSecreta.length);
                actualitzarEstatParaula();
                console.log(arrayParaulaSecreta);
            }
        }else{
            alert('La paraula ha de tenir mes de 3 lletres.');
        }
    }else{
        alert('No has introduit una paraula.');
    }
}


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


function deshabilitarElementsHeader(){
    entradaParaula.disabled = true;
    comencar.disabled = true;
}


function crearArrayLletresEncertades(distancia){
    let stringGuio = "";
    for (i=0; i<distancia; i++){
        stringGuio += "-";
    }
    return stringGuio.split("");
}


function actualitzarEstatParaula(){
    paraulaEstat.textContent = arrayEncertades.join("");
}

function jugarLletra(lletra){
    if (enJuego){
        comprobarLletra(lletra);
    }else{
        alert("Has de introduir una paraula avans.");
    }
    
}


function comprobarLletra(lletra){
    let botonLletra = document.getElementById(`Btn${lletra}`);
    botonLletra.disabled = true;
    botonLletra.style.color = "red";
    //Mirem si la lletra es al array i la posem
    for (i=0; i<arrayParaulaSecreta.length; i++){
        if (lletra == arrayParaulaSecreta[i]){
            arrayEncertades[i] = lletra;
        }
    }
    actualitzarEstatParaula();
}