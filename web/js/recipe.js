/* VAR */
var player;
var playerYT
var btnPlay = document.getElementById("playRecipeBtn");
var words = null;

/* Recognition var*/
var playWords = ["lancer", "commencer", "débuter", "reprendre"];
var pauseWords = ["pause", "stop"];
var stopWords = ["arrêter", "arrêtez", "arrêté", "quitter"];


// YOUTUBE //
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.addEventListener("DOMContentLoaded", initialise);

// RECOGNITION //
if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'fr-FR'; // Langue à reconnaitre : ici le français
    recognition.continuous = true; // Reconnaissance vocale en continue
    recognition.interimResults = true; // Obtenir des résultats intermédiaires

    recognition.onresult = function (evt) {
        for (var i = evt.resultIndex; i < evt.results.length; i++) {
            var transcript = evt.results[i][0].transcript;
            if (evt.results[i].isFinal) {
                console.log(transcript);
                words = transcript.split(' ');
                for (var word of words) {
                    if (in_array(word, playWords)/*word === "lancer" || word === "commencer" || word === "débuter" || word === "reprendre"*/) {
                        player.playVideo();
                    } else if (in_array(word, pauseWords)/*word === "pause" || word === "stop"*/) {
                        player.pauseVideo();
                    } else if (in_array(word, stopWords)/*word === "arrêter" || word === "arrêtez" || word === "arrêté" || word === "quitter"*/) {
                        player.stopVideo();
                        recognition.stop();
                        btnPlay.addEventListener("click", launchRecipe);
                        document.querySelector("body").removeChild(document.getElementById("playerVideo"));
                    }
                }
                return true;
            }
        }
    };
} else {
    btnPlay.style.display = "none";
}

function initialise() {
    btnPlay.addEventListener("click", launchRecipe);
}

function launchRecipe(evt) {
    var videoId = this.dataset.videoid;
    recognition.start();

    // Add video
    playerYT = document.createElement("div");
    playerYT.id = "playerVideo";
    playerYT.classList.add("recipeVideo");
    document.querySelector("body").appendChild(playerYT);

    player = new YT.Player('playerVideo', {
        width: 1280,
        height: 720,
        videoId: videoId,
    });

    this.removeEventListener("click", launchRecipe);
}

function in_array(string, array) {
    var result = false;
    var i = 0;
    while (result === false && i < array.length) {
        if (array[i] === string) result = true;
        i++;
    }
    return result;
}