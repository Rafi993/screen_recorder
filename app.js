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
  document
      .getElementById('close')
      .addEventListener("click", e => {
        const remote = require('electron').remote;
        remote.getCurrentWindow().close()
      })

  let muteStatus = false;
  let seconds = 0;
  let timer = null;

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
  })

  document
  .getElementById('play')
  .addEventListener('click', e => {
    e.preventDefault();
    seconds = 0;
    removeClass(document.getElementById('stop'), 'hidden')
    addClass(document.getElementById('play'), 'hidden')
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