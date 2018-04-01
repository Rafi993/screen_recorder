const init = ()=> {

  /* *************************** Events: BEGIN *********************************** */

  // When the close button is pressed
  document
      .getElementById('close')
      .addEventListener("click", e => {
        require('electron')
          .remote
          .getCurrentWindow()
          .close()
      })

  // When the video recording is stopped
  document
    .getElementById('stop')
    .addEventListener('click', e => {
    e.preventDefault();
    removeClass(document.getElementById('play'), 'hidden')
    addClass(document.getElementById('stop'), 'hidden')
    clearInterval(timer);
    
    recorder.stop();
  })

  // When the video recording is started
  document
    .getElementById('play')
    .addEventListener('click', e => {
      e.preventDefault();
      seconds = 0;

      removeClass(document.getElementById('stop'), 'hidden')
      addClass(document.getElementById('play'), 'hidden')
      const request = { sources: ['screen'] };

        navigator.mediaDevices.getUserMedia({
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
            }
          }
        }).then(returnedStream => {

          let videoTracks = returnedStream.getVideoTracks()
      
          try {
            console.log('Start recording the stream.')
            recorder = new MediaRecorder(returnedStream)
          } catch (e) {
            console.assert(false, 'Exception while creating MediaRecorder: ' + e)
            return
          }
          recorder.ondataavailable = saveRecording;

          recorder.onstop = () => { console.log('recorderOnStop fired') }
          recorder.start()
        }).catch(err => {
          console.error('Could not get stream: ', err);
        });

      timer = setInterval(()=>{
        seconds++;
        document.getElementsByTagName('h3')[0]
        .innerHTML = toTimeString(seconds)
      }, 1000)
    })

  
  /* *************************** Events: END ************************************ */

}

// GLOBALS
let seconds = 0;
let timer = null;
let recordedChunks = [];
let numRecordedChunks  = 0;
let recorder = null;
let microAudioStream = null;

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    init();
  }
};