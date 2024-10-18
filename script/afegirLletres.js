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