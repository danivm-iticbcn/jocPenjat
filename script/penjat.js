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
const percentatge = document.getElementById('percentatge');
//Multijugador
const stats0 = document.getElementById('stats');
const stats1 = document.getElementById('stats2');
const guanyandesStat1 = document.getElementById('guanyades2');
const partidesStat1 = document.getElementById('partides2');
const puntsStat1 = document.getElementById('punts2');
const millorPartidaEstat1 = document.getElementById('millorPartida2');
const percentatge2 = document.getElementById('percentatge2');

//ELEMENTS LOGICA
const MAX_JUGADAS = 10;
const MIDA_MIN_PARAULA = 3;
const MAX_TEMPS = 60;
let jugadas = 0;
let paraulaSecreta;
let arrayParaulaSecreta;
let arrayEncertades;
let enJuego = false;
let partidesJugades = 0;
let data;
let hasGuanyat;
//LOGICA MULTIJUGADOR
let torn = 0;

//Objecte per gestionar la puntuació de cada jugador
const Puntuacio = {
    "punts":0,
    "partidesGuanyades": 0,
    "ratxa": 0,
    "millorPuntuacioPartides": 0,
    "data": new Date(),
    "percentageGuanyades": function(){
        return (this.partidesGuanyades / partidesJugades * 100).toFixed(2);
    }
}

//Array amb dos objectes per gestionar la puntuació de les partides
const puntuacioMulti = [Object.create(Puntuacio), Object.create(Puntuacio)];

//Temps
let temps = [MAX_TEMPS, MAX_TEMPS];
let senseTemps = false;

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
        if(paraulaSecreta.length > MIDA_MIN_PARAULA){
            //Pasem la paraula a una llista
            arrayParaulaSecreta = paraulaSecreta.split("");
            //Comprobem si hi han caracter que no siguin del alfabet
            if (comprovarParaula(paraulaSecreta)){
                lancarErrorToastr("La paraula tansols pot tenir caracters del alfabet (a-z)");
            } else{
                //UNA VEGADA SUPERAT TOTES LES VALIDACIONS DESHABILITEM EL INPUT, EL BOTO I COMENCEM PARTIDA
                iniciarJoc();
            }
        }else{
            lancarErrorToastr("La paraula ha de tenir mes de 3 lletres");
        }
    }else{
        lancarErrorToastr("Has de introduir una paraula");
        
    }
}

//Funcio per iniciar elements necesaris de la partida
function iniciarJoc(){
    //iniciar joc
    enJuego = true;
    //Dades a 0
    reiniciarDadesPuntuacio();
    jugadas = 0;
    hasGuanyat = false;
    //Comenca el que guanya
    if (torn == 0){
        stats0.style.backgroundColor = "green";
        stats1.style.backgroundColor = "rgba(227, 46, 46, 0.647)";
    } else{
        stats1.style.backgroundColor = "green";
        stats0.style.backgroundColor = "rgba(227, 46, 46, 0.647)";
    }
    //Reiniciem elements
    imatge.src = `/img/penjat_${jugadas}.jpg`;
    contenidorEstat.style.backgroundColor = "rgba(110, 42, 237, 0.521)";
    reiniciarLletres();
    deshabilitarElementsHeader();
    arrayEncertades = crearArrayLletresEncertades(arrayParaulaSecreta.length);
    actualitzarEstatParaula();
    iniciarTiempo();
    reiniciarTemps();
}

//Funcio per reiniciar les dades necesaries de cada objecte de la llista de la puntuacio
function reiniciarDadesPuntuacio(){
    for (let i of puntuacioMulti){
        i["punts"] = 0;
        i["ratxa"] = 0;
    }
    //A mes possem a 0 els valors visibles del html
    puntsStat0.textContent = 0;
    puntsStat1.textContent = 0;
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
    if (hasGuanyat){
        //Actualitzem partides jugades i guanyades
        partidesStat1.textContent = partidesJugades;
        partidesStat0.textContent = partidesJugades;
        torn == 0 ? guanyandesStat0.textContent = `(${puntuacioMulti[torn]["partidesGuanyades"]})`:guanyandesStat1.textContent = `(${puntuacioMulti[torn]["partidesGuanyades"]})`;
        percentatge.textContent = ` ${puntuacioMulti[0]["percentageGuanyades"]()}%`;
        percentatge2.textContent = ` ${puntuacioMulti[1]["percentageGuanyades"]()}%`;
    }else{
        //Actualitzem puntuacio actual
        torn == 0 ? puntsStat0.textContent = puntuacioMulti[torn]["punts"]:puntsStat1.textContent = puntuacioMulti[torn]["punts"];
    }
}

//Funcio per jugar una lletra
function jugarLletra(lletra){
    if(jugadas < MAX_JUGADAS){
        if (enJuego){
            comprobarLletra(lletra);
        }else{
            lancarErrorToastr("Has de introduir una paraula avans de jugar");
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

//Funcio on comprobarem si la lletra introduida es correcta o no
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
    //Si acerta sumem ratxa si no reiniciem i incrementem jugadas
    if(acertat){
        puntuacioMulti[torn]["ratxa"] += 1;
    } else{
        jugadas++;
        imatge.src = `./img/penjat_${jugadas}.jpg`;
        puntuacioMulti[torn]["ratxa"] = 0;
        if (puntuacioMulti[torn]["punts"] > 0){
            puntuacioMulti[torn]["punts"]--;
        }
    }
    //Actualitzem estats puntuacio i paraula
    puntuacioMulti[torn]["punts"] += puntsJugada * puntuacioMulti[torn]["ratxa"];
    actualitzarEstatParaula();
    actualitzarEstatPartida()
    acertat ? '':cambiarTorn();
    //Mirem si hem guanyat
    comprovarGuanyar()
    if (hasGuanyat){
        lancarGuanyar();
    }
}

//Funcio per a quan es perd el game
function lancarGameOver(){
    torn = -1;
    contenidorEstat.style.backgroundColor = 'red';
    habilitarElementsHeader();
    actualitzarEstatPartida();
    //Desactivem partida
    enJuego = false;
    lancarSpaceCat();
}

//Funcio per a veure si ja hem guanyat o no
function comprovarGuanyar(){
    hasGuanyat = true;
    //Mirem si ja hem omplert tot l'array
    for (i=0; i<arrayEncertades.length && hasGuanyat; i++){
        if(arrayEncertades[i] == "-"){
            hasGuanyat = false;
        }
    }
}

//Funcio per cambiar pantalla quan es guanya
function lancarGuanyar(){
    //Busquema al guanyador
    torn == puntuacioMajor() ? '':cambiarTorn();
    //Actualitzem dades
    partidesJugades++;
    puntuacioMulti[torn]["partidesGuanyades"]++;
    contenidorEstat.style.backgroundColor = 'green';
    habilitarElementsHeader();
    actualitzarEstatPartida();
    comprovarMillorPartida();
    //Desactivem partida
    enJuego = false;
    lancarSpaceCat();
}

//Funcio per veure si la partida es millor que l'anterior
function comprovarMillorPartida(){
    if (puntuacioMulti[torn]["punts"] > puntuacioMulti[torn]["millorPuntuacioPartides"]){
        puntuacioMulti[torn]["millorPuntuacioPartides"] = puntuacioMulti[torn]["punts"];
        //Agafem la data i hora actuals
        let data = new Date().toLocaleDateString('es-ES');
        let hora = new Date().toLocaleTimeString('es-ES');
        //Segons el jugador asignem a un o un altre
        if(torn == 0){
            puntuacioMulti[0]["data"] = `${data} ${hora}`;
            millorPartidaEstat0.textContent = `${puntuacioMulti[0]["data"]} - ${puntuacioMulti[torn]["millorPuntuacioPartides"]} punts`;
        }else{
            puntuacioMulti[1]["data"] = `${data} ${hora}`;
            millorPartidaEstat1.textContent = `${puntuacioMulti[1]["data"]} - ${puntuacioMulti[torn]["millorPuntuacioPartides"]} punts`;
        }
    }
}

//Funcio per cambiar el torn del jugador
function cambiarTorn(){
    if (torn == 0){
        torn = 1;
        //També cambiem el estil per saber a que jugador li toca
        stats1.style.backgroundColor = "green";
        stats0.style.backgroundColor = "rgba(227, 46, 46, 0.647)";
    } else{
        torn = 0;
        stats0.style.backgroundColor = "green";
        stats1.style.backgroundColor = "rgba(227, 46, 46, 0.647)";
    }
    
}

//Funcio per saber que te més puntuacio i qui guanya
function puntuacioMajor(){
    let ganador = 0;
    let puntuacioMesGran = puntuacioMulti[0]["punts"];
    if (puntuacioMesGran < puntuacioMulti[1]["punts"]){
        puntuacioMesGran=puntuacioMulti[1]["punts"];
        ganador = 1;
    } else if(puntuacioMesGran == puntuacioMulti[1]["punts"]){
        ganador = torn;
    }
    return ganador
}

//Funcio per retornar els elements del temps al inici
function reiniciarTemps(){
    temps = [MAX_TEMPS, MAX_TEMPS];
    document.getElementById('temps0').textContent = temps[torn] + 's';
    document.getElementById('temps1').textContent = temps[torn] + 's';
}

//Funcio per tenir comptador de temps per a cada jugador
function iniciarTiempo(){
    const intervalo = setInterval(() => {
        //Netejem l'interval
        if(!enJuego){
            clearInterval(intervalo);
        }
        //Canviem temps
        if(torn == 0 && enJuego){
            temps[torn]--;
            document.getElementById('temps0').textContent = temps[torn] + 's';
        } else if (torn == 1  && enJuego){
            temps[torn]--;
            document.getElementById('temps1').textContent = temps[torn] + 's';
        }
        //Comprovem si s'ha esgotat el temps
        if (temps[torn] == 0) {
            senseTemps = true;
            lancarSpaceCat();
        }
        //ms
    }, 1000);
}
