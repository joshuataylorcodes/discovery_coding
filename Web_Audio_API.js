console.clear()
//our java code for the functionality of this boombox using API

// here, we are creating an instance of audio context. from this, wew will have access to feature and functions of API, giving us more power then just using an <audio> media element
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCont = new AudioContext();

//(<audio src="myCoolTrack.mp3"></audio>)
//------this is an audio media element written in html coder that exposes the  song myCoolTrack.mp3 on the page. this is written in html in another file and this file will interact with that file.

//get audio element and pass it into the audio context
const audioElement = document.querySelector("audio")
const track = audioCont.createMediaElementSource(audioElement)

//this code will conect our audio graph from the audio source/input node to the destination. since we created the input node in the code above by passing the audio element into the api, we need to connect our other nodes to the destination
track.connect(audioCont.destination);

//since we set the destination, now we need to add our play and pause button functionality. this is html code that changes a button from play to pause when a user presses the button(user_input_event). bacically it gives the button functionallity
//(<button data-playing="false" role="switch" aria-checked="false"><span>Play/Pause</span></button>)

//this selects the play button
const playButton = document.querySelector("button");
playButton.addEventListener(
  "click",
  () => {
    //this will check if connect is in suspended state which is important because controlling sound from JavaScriot is covered in browsers' autoplay policy. most of the time, the user needs to grant permission to control sound. they can require either explicit permission or a user engagement with the page.
    if (audioCont.state === "suspended")   {
      audioCont.resume();
    }

    //this code will play or pause the track depending on the state(if the button is displaying the play or pause symbol)
    if (playButton.dataset.playing === "false")   {
      audioElement.play();
      playButton.dataset.playing === "true":
    }
    else if (playButton.dataset.playing === "true")   {
      audioElement.pause();
      playButton.dataset.playing = "false";
    }
  },
  false
);

//this will stop the song once the track has ended. this would be like if the song was playing and the user clicked pause but it does it automatically without any user input
audioElement.addEventListener(
  "ended",
  () => {
    playButton.dadaset.playing = "false";
  },
  false
);

//this line of code will give us the ability to adjust the volume of our sound. what will happen is the size of the wave will be adjusted.
const gainNode = audioCont.createGain();

//now, we will have to update our audiograph and connect the input to the gain. then, we connect it to the destination
track.connect(gainNode).connect(audioCont.destination)

//this code will be written in the html file and will give us the ability to change the gain value form 0 to 2
//  <input type="range" id="volume" min="0" max="2" value="1" step="0.01" />

//this code will update the gain value when the user adjusts the gain
const volumeControl = document.querySelector("#volume");

volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
  },
  false
);

//Now this will give us the ability to pan the sound from the left speaker to the right speaker. this is the constructor method
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioCont,pannerOptions)
//this would possibly be the factory method code
//  const panner = audioCont.createpanner();

//this is html code that we will call on for panner values
//  <input type="range" id="panner" min="-1" max="1" value="0" step="0.01" />

//this code below will call on the id panner and through this script, the user has the ability to change the value of the panner to pan to the left/right speaker

const pannerControl = document.querySelector("#panner")

pannerControl.addEventListener(
  "input",
  () => {
    panner.pan.value = pannerControl.value;
  },
  false
);

track.connect(gainNode).connect(panner).connect(audioCont.destination)








https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API