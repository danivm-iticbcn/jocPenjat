const lletresContainer = document.getElementById('lletresContainer');
let abcedario = [];

for (i=65; i<=90; i++){
    let lletra = String.fromCharCode(i)
    let lletraBoto = document.createElement('button');
    lletraBoto.className = 'lletresBtn';
    lletraBoto.id = `Btn${lletra}`
    lletraBoto.textContent = `${lletra}`;
    lletraBoto.onclick = function(){
        comprobarLletra(lletra);
    }
    lletresContainer.appendChild(lletraBoto);
}



console.log(abcedario)