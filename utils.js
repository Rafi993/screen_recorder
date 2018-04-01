/**
 * Adds class to given DOM element
 * @param {Element} el 
 * @param {String} className 
 */
const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

/**
 * Removes class from given element
 * @param {Element} el 
 * @param {String} className 
 */
const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el
      .className
      .replace(new RegExp('(^|\\b)' + className
        .split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

/**
 * Convert seconds to HH:MM:SS fromat to display
 * @param {Int} seconds 
 */
const toTimeString = seconds => (new Date(seconds * 1000))
  .toUTCString()
  .match(/(\d\d:\d\d:\d\d)/)[0];

/**
 * Saves recording to a .webm file
 * @param {Event} event 
 */
const saveRecording = event => {
  if (event.data && event.data.size > 0) {
    recordedChunks.push(event.data)
    numRecordedChunks += event.data.byteLength
  }

  let blob = new Blob(recordedChunks, {
    type: 'video/webm'
  })
  let url = URL.createObjectURL(blob)
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  a.href = url
  a.download = 'recording_webm'
  a.click()
  setTimeout(function () {
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }, 100)
}