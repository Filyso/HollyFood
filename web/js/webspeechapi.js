
var player;
var btnSpeech = document.getElementById("btnSpeech");
var resultP = document.getElementById("result");
var words = null;

// RECOGNITION //
if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'fr-FR'; // Langue à reconnaitre : ici le français
    recognition.continuous = true; // Reconnaissance vocale en continue
    recognition.interimResults = true; // Obtenir des résultats intermédiaires

    btnSpeech.addEventListener("click", function(evt) {
        evt.preventDefault();
        recognition.start();
    });

    recognition.onresult = function(evt) {
        for(var i = evt.resultIndex; i < evt.results.length; i++) {
            var transcript = evt.results[i][0].transcript;
            if (evt.results[i].isFinal) {
                resultP.innerText = transcript;
                // recognition.stop();
                words = transcript.split(' ');
                for (var word of words) {
                    if (word === "lancer") {
                        player.playVideo();
                    } else if (word === "stop") {
                        player.stopVideo();
                    }
                }
                // recognition.start();
                // return true;
            } else {
                resultP.innerText = transcript;
            }
        }
    };
} else {
    btnSpeech.style.display = "none";
}

// YOUTUBE //
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('playerVideo', {
        width: 1280,
        height: 720,
        videoId: 'B2kvtRprvkk',
    });
}