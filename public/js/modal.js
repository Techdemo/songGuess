export function openModal(socket, content){
  //TODO: run aud.play after setTimeOut is done
 let modal = document.getElementById('Modal')
 let modalText = document.getElementById('modal-content-text')

  modalText.innerHTML = content == '' || content === undefined ? 'Er is geen content beschikbaar voor deze modal' : content
  modal.style.display = "block"

  let timeleft = 10;
  let timeLeftText = document.getElementById('modal-content-timeUntil')
  timeLeftText.innerHTML = `new round starts in ${timeleft}`

  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      modal.style.display = "none";
      clearInterval(downloadTimer);
    }
    document.getElementById("progressBar").value = 10 - timeleft;
    let timeLeftText = document.getElementById('modal-content-timeUntil')
    timeLeftText.innerHTML = `new round starts in ${timeleft}`
    timeleft -= 1;
  }, 1000);
}
