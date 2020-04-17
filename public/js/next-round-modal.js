export function openRoundModal(socket, content, scores) {
    let modal = document.getElementById('score-modal')
    let modalText = document.getElementById('score-modal-content-text')
    let modalScore = document.getElementById('score-modal-scoreOverview')

    modalText.innerHTML = content == '' || content === undefined  ? 'Er is geen content beschikbaar voor deze modal' : content
    modalScore.innerHTML = scores == '' || scores === undefined ? 'Er zijn geen scores om te tonen' : scores
    modal.style.display = "block"

    let timeleft = 10;
    let timeLeftText = document.getElementById('score-modal-content-timeUntil')
    timeLeftText.innerHTML = `new round starts in ${timeleft}`

    let downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            modal.style.display = "none";
            clearInterval(downloadTimer);
        }
        document.getElementById("score-progressBar").value = 10 - timeleft;
        let timeLeftText = document.getElementById('score-modal-content-timeUntil')
        timeLeftText.innerHTML = `new round starts in ${timeleft}`
        timeleft -= 1;
    }, 1000);
}
