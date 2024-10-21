//Pop up Sweet Alert
function lancarSpaceCat(){
    let titol = `Enhorabona jugador ${torn+1}, Has guanyat!`;
    let url = 'url("/gif/space_cat.gif")';
    if (!hasGuanyat){
        titol = senseTemps ? `El jugador ${torn+1} s'ha quedat sense temps`:`No heu pugut endevinar la parula`;
        url = 'url("/gif/lose.gif")';
    }
    Swal.fire({
        //Parametres generals
        title: titol,
        showDenyButton: true,
        width: 500,
        padding: "3em",
        color: "black",
        //boto continuar
        confirmButtonText: "Continuar jugant",
        //gif
        backdrop: `
          rgba(0,0,123,0.4)
          ${url}
          left top
          no-repeat`,
          //boto nova partida
          denyButtonText: `Partida nova`
      }).then((result) => {
        //Si dona a nova partida actualitzem la pàgina per simular que comen+ça de nou
        if (result.isDenied){
            location.reload();
        } else{
            document.getElementById('paraulaEntrada').focus();
        }
      });
}

//Carregar configurcio alerta Toastr
toastr.options = {
    "positionClass": "toast-top-left",  //posicio
    "timeOut": "2100"   //duracio en ms
};


//Alerta Toastr
function lancarErrorToastr(avis){
    toastr["error"](avis);
}