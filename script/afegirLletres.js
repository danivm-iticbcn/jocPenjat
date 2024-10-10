const lletresContainer = document.getElementById('lletresContainer');
const posicionEnye = 14;

//Afegir totes les lletres per jugar
for (i=65; i<=90; i++){
    if (i == 65 + posicionEnye){
        crearEnye();
    }
    let lletra = String.fromCharCode(i)
    let lletraBoto = document.createElement('button');
    lletraBoto.className = 'lletresBtn';
    lletraBoto.id = `Btn${lletra}`
    lletraBoto.textContent = `${lletra}`;
    lletraBoto.onclick = function(){
        jugarLletra(lletra);
    };
    lletresContainer.appendChild(lletraBoto);
}

//Funcio per afegir la lletra ñ
function crearEnye(){
    let enye = document.createElement('button');
    enye.className = 'lletresBtn';
    enye.id = `BtnÑ`
    enye.textContent = `Ñ`;
    enye.onclick = function(){
        jugarLletra("Ñ");
    };
    lletresContainer.appendChild(enye);
}