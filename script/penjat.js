//ELEMENTS HTML
const entradaParaula = document.getElementById('paraulaEntrada');
const ullIcon = document.getElementById("verIcon");
const comencar = document.getElementById("startBtn");
const paraulaEstat = document.getElementById('paraulaEstat');
const contenidorEstat = document.getElementById('paraulaContainer');
const guanyandesStat0 = document.getElementById('guanyades');
const partidesStat0 = document.getElementById('partides');
const puntsStat0 = document.getElementById('punts');
const millorPartidaEstat0 = document.getElementById('millorPartida');
const imatge = document.getElementById('imatge');
//Multijugador
const stats0 = document.getElementById('stats');
const stats1 = document.getElementById('stats2');
const guanyandesStat1 = document.getElementById('guanyades2');
const partidesStat1 = document.getElementById('partides2');
const puntsStat1 = document.getElementById('punts2');
const millorPartidaEstat1 = document.getElementById('millorPartida2');

//ELEMENTS LOGICA
const MAX_JUGADAS = 10;
let jugadas = 0;
let paraulaSecreta;
let arrayParaulaSecreta;
let arrayEncertades;
let enJuego = false;
//let partidasGuanyades = 0;
let partidesJugades = 0;
//let ratxa;
//let punts;
//let millorPuntuacioPartides = 0;
let data;
//LOGICA MULTIJUGADOR
let torn;
let puntsMulti;
let partidasGuanyades = [0, 0];
let ratxa;
let millorPuntuacioPartides = [0, 0];

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
                iniciarJoc();
                console.log(torn)
                imatge.src = `/img/penjat_${jugadas}.jpg`;
            }
        }else{
            alert('La paraula ha de tenir mes de 3 lletres.');
        }
    }else{
        alert('No has introduit una paraula.');
    }
}

//Funcio per iniciar elements necesaris de la partida
function iniciarJoc(){
    enJuego = true;
    puntsMulti = [0, 0];
    ratxa = [0, 0];
    torn = 0;
    stats0.style.backgroundColor = "green";
    reiniciarLletres();
    
    deshabilitarElementsHeader();
    arrayEncertades = crearArrayLletresEncertades(arrayParaulaSecreta.length);
    actualitzarEstatParaula();
}

//Funcio per veure o deixar de veure la paraula
function veureParaula(){
    if(entradaParaula.type == "password"){
        entradaParaula.type = "text";
        ullIcon.textContent = "visibility_off";
    }else{
        entradaParaula.type = "password";
        ullIcon.textContent = "visibility";
    } 
}

//Funcio per veure si la paraula conté numeros o espais
function hiHaNumerosOEspais(array){
    let hayNumerosOEspais = false;
    for(i=0; i<array.length && !hayNumerosOEspais; i++){
        if(!isNaN(array[i]) || array[i] == " "){
            hayNumerosOEspais = true;
        }
    }
    return hayNumerosOEspais;
}

//Funcio deshablitar
function deshabilitarElementsHeader(){
    entradaParaula.disabled = true;
    comencar.disabled = true;
}

//Funcio per hablitar input i boto del header
function habilitarElementsHeader(){
    entradaParaula.disabled = false;
    comencar.disabled = false;
}

//Funcio per crear un array buit per mostrar i tractar la resposta
function crearArrayLletresEncertades(distancia){
    let stringGuio = "";
    for (i=0; i<distancia; i++){
        stringGuio += "-";
    }
    return stringGuio.split("");
}

//Funcio per actulitzar la paraula a adivinar
function actualitzarEstatParaula(){
    paraulaEstat.textContent = arrayEncertades.toString().replaceAll(","," ");
}

//Funcio per actualitzar els estats de puntuacio
function actualitzarEstatPartida(){
    if (torn == 0){
        guanyandesStat0.textContent = partidasGuanyades[torn];
        puntsStat0.textContent = puntsMulti[torn];
    } else{
        guanyandesStat1.textContent = partidasGuanyades[torn];
        puntsStat1.textContent = puntsMulti[torn];
    }
    partidesStat1.textContent = partidesJugades;
    partidesStat0.textContent = partidesJugades;
    
}

//Funcio per jugar una lletra
function jugarLletra(lletra){
    if(jugadas < MAX_JUGADAS){
        if (enJuego){
            comprobarLletra(lletra);
        }else{
            alert("Has de introduir una paraula avans.");
        }
    }else{
        lancarGameOver();
    } 
}

//Funcio per reiniciar els buttons de les lletres
function reiniciarLletres(){
    let lletres = document.querySelectorAll(".lletresBtn");
    lletres.forEach(element => {
        element.disabled = false;
        element.style.color = "black";
    });
}

function comprobarLletra(lletra){
    let botonLletra = document.getElementById(`Btn${lletra}`);
    botonLletra.disabled = true;
    botonLletra.style.color = "red";
    //Mirem si la lletra es al array i la posem
    let puntsJugada = 0;
    let acertat = false;
    for (i=0; i<arrayParaulaSecreta.length; i++){
        if (lletra == arrayParaulaSecreta[i]){
            arrayEncertades[i] = lletra;
            puntsJugada++;
            acertat = true;
        }
    }
    //Si acerta sumeme ratxa si no reiniciem i incrementem jugadas
    if(acertat){
        ratxa[torn] += 1;
    } else{
        jugadas++;
        imatge.src = `/img/penjat_${jugadas}.jpg`;
        ratxa[torn] = 0;
        if (puntsMulti[torn] > 0){
            puntsMulti[torn]--;
        }
    }
    //Actualitzem estats puntuacio i paraula
    puntsMulti[torn] += puntsJugada * ratxa[torn];
    console.log(puntsMulti);
    actualitzarEstatParaula();
    actualitzarEstatPartida()
    acertat ? '':cambiarTorn();
    //Mirem si hem guanyat
    if (comprovarGuanyar()){
        lancarGuanyar();
    }

}

//Funcio per a quan es perd el game
function lancarGameOver(){
    partidesJugades++;
    contenidorEstat.style.backgroundColor = 'red';
    habilitarElementsHeader();
    actualitzarEstatPartida();
    enJuego = false;
}

//Funcio per a veure si ja hem guanyat o no
function comprovarGuanyar(){
    let hasGuanyat = true;
    for (i=0; i<arrayEncertades.length && hasGuanyat; i++){
        if(arrayEncertades[i] == "-"){
            hasGuanyat = false;
        }
    }
    return hasGuanyat;
}

//Funcio per cambiar pantalla quan es guanya
function lancarGuanyar(){
    partidesJugades++;
    partidasGuanyades[torn]++;
    contenidorEstat.style.backgroundColor = 'green';
    habilitarElementsHeader();
    actualitzarEstatPartida();
    comprovarMillorPartida();
    enJuego = false;
}

//Funcio per veure si la partida es millor que l'anterior
function comprovarMillorPartida(){
    if (puntsMulti[torn] > millorPuntuacioPartides[torn]){
        millorPuntuacioPartides[torn] = puntsMulti[torn];
        let data = new Date().toLocaleDateString('es-ES');
        let hora = new Date().toLocaleTimeString('es-ES');
        if(torn == 0){
            millorPartidaEstat0.textContent = `${data} ${hora} - ${millorPuntuacioPartides[torn]} punts`;
        }else{
            millorPartidaEstat1.textContent = `${data} ${hora} - ${millorPuntuacioPartides[torn]} punts`;
        }
        
    }
}

//MULTIJUGADOR
function cambiarTorn(){
    if (torn == 0){
        torn = 1;
        stats1.style.backgroundColor = "green";
        stats0.style.backgroundColor = "rgba(227, 46, 46, 0.647)";
    } else{
        torn = 0;
        stats0.style.backgroundColor = "green";
        stats1.style.backgroundColor = "rgba(227, 46, 46, 0.647)";
    }
    
}

