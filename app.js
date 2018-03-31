const init = ()=> {

  /* ************************** Utilities: BEGIN ********************************** */
    const addClass =(el, className)=> {
      if (el.classList)
        el.classList.add(className);
      else
        el.className += ' ' + className;
    }

    const removeClass = (el, className)=> {
      if (el.classList)
        el.classList.remove(className);
      else
        el.className = el
                        .className
                        .replace(new RegExp('(^|\\b)' + className
                          .split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const toTimeString = seconds => (new Date(seconds * 1000))
                          .toUTCString()
                          .match(/(\d\d:\d\d:\d\d)/)[0];

  /* ************************** Utilities: END ************************************ */                  

  /* *************************** Events: BEGIN *********************************** */
  const fs = require('fs');
  let wstream = null;

  document
      .getElementById('close')
      .addEventListener("click", e => {
        const remote = require('electron').remote;
        remote.getCurrentWindow().close()
      })

  let muteStatus = false;
  let seconds = 0;
  let timer = null;
  let recorder = null;

  document
    .getElementById('unmute')
    .addEventListener('click', e => {
      e.preventDefault();
      console.log('unmute')
      muteStatus = false;
      removeClass(document.getElementById('mute'), 'hidden')
      addClass(document.getElementById('unmute'), 'hidden')
    })

  document
  .getElementById('mute')
  .addEventListener('click', e => {
    e.preventDefault();
    console.log('mute')
    muteStatus = true;
    removeClass(document.getElementById('unmute'), 'hidden')
    addClass(document.getElementById('mute'), 'hidden')
  })

  document
  .getElementById('stop')
  .addEventListener('click', e => {
    e.preventDefault();
    removeClass(document.getElementById('play'), 'hidden')
    addClass(document.getElementById('stop'), 'hidden')
    clearInterval(timer);
    wstream.end();
    recorder = null;
  })

  document
  .getElementById('play')
  .addEventListener('click', e => {
    e.preventDefault();
    seconds = 0;

    removeClass(document.getElementById('stop'), 'hidden')
    addClass(document.getElementById('play'), 'hidden')
    let video = document.querySelector('video')
    wstream = fs.createWriteStream('myBinaryFile.webgm');

    const request = { sources: ['screen'] };

      navigator.mediaDevices.getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
          }
        }
      }).then(returnedStream => {
        stream = returnedStream;
        // video.src = URL.createObjectURL(stream);
        wstream.write(stream);

      }).catch(err => {
        console.error('Could not get stream: ', err);
      });

    timer = setInterval(()=>{
      seconds++;
      document.getElementsByTagName('h3')[0]
      .innerHTML = toTimeString(seconds)
    }, 1000)
  })
}

/* *************************** Events: END ************************************ */

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    init();
  }
};