//Pop up Sweet Alert
function lancarSpaceCat(){
    Swal.fire({
        title: `Enhorabona jugador ${torn+1}, Has guanyat!`,
        showDenyButton: true,
        width: 500,
        padding: "3em",
        color: "black",
        confirmButtonText: "Continuar jugant",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/gyf/space_cat.gif")
          left top
          no-repeat`,
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