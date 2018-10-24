
var player;
var playerYT
var btnPlay = document.getElementById("playRecipeBtn");
var resultP = document.getElementById("result");
var words = null;

// YOUTUBE //
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// RECOGNITION //
if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'fr-FR'; // Langue à reconnaitre : ici le français
    recognition.continuous = true; // Reconnaissance vocale en continue
    recognition.interimResults = true; // Obtenir des résultats intermédiaires

    btnPlay.addEventListener("click", launchRecipe);

    recognition.onresult = function(evt) {
        for(var i = evt.resultIndex; i < evt.results.length; i++) {
            var transcript = evt.results[i][0].transcript;
            if (evt.results[i].isFinal) {
                // recognition.stop();
                console.log(transcript);
                words = transcript.split(' ');
                for (var word of words) {
                    if (word === "lancer" || word === "commencer" || word === "débuter" || word ==="reprendre") {
                        player.playVideo();
                    } else if (word === "pause" || word === "stop"){
                        player.pauseVideo();
                    } else if (word === "arrêter") {
                        player.stopVideo();
                        recognition.stop();
                        btnPlay.addEventListener("click", launchRecipe);
                        document.querySelector("body").removeChild(document.getElementById("playerVideo"));                    }
                }
                // recognition.start();
                // return true;
            }
        }
    };
} else {
    btnPlay.style.display = "none";
}

function launchRecipe(evt) {
    recognition.start();

    // Add video
    playerYT = document.createElement("div");
    playerYT.id = "playerVideo";
    playerYT.classList.add("recipeVideo");
    document.querySelector("body").appendChild(playerYT);

    player = new YT.Player('playerVideo', {
        width: 1280,
        height: 720,
        videoId: 'iM_KMYulI_s',
    });

    this.removeEventListener("click", launchRecipe);
}