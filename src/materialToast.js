;(function (namespace) {
  var localToastConfig = {
    'timeout': 4000,
    'style': {}
  }
  var previousToast
  var currentToast
  var hideToastTimeout

  function show (toastConfig) {
    // clear timeout
    clearTimeout(hideToastTimeout)
    // hide previousToast if it exists
    if (previousToast) hideToast(previousToast)

    // create config object for currentToast and delete toastConfig
    var currentToastConfig = cloneObject(localToastConfig)
    overrideObjectProperties(currentToastConfig, toastConfig)
    toastConfig = null

    // create currentToast
    currentToast = createToastAndInsertToastMessage(currentToastConfig)

    // insert action-btn if it exists
    if (currentToastConfig.actionText && currentToastConfig.actionHandler) {
      insertToastButton(currentToastConfig, currentToast)
    }

    // override current toast style
    overrideObjectProperties(currentToast.style, currentToastConfig.style)

    // insert into body, choose height depending on line number, animate
    document.body.appendChild(currentToast)

    var toastComputedStyles = window.getComputedStyle(currentToast)
    if (toastComputedStyles.height === toastComputedStyles.lineHeight) {
      currentToast.classList.add('singleline')
    } else {
      currentToast.classList.add('multiline')
    }

    currentToast.classList.add('material-toast-fade-in')

    // hide toast on click
    currentToast.addEventListener('click', function () {
      hideToast(currentToast)
    })

    // set timeout to hide toast
    if (currentToastConfig.timeout !== Infinity) {
      hideToastTimeout = setTimeout(function () {
        hideToast(currentToast)
      }, currentToastConfig.timeout)
    }

    // reference for hide toast when showing other one
    previousToast = currentToast
  }

  // animate toast and then invoke deleteToast function
  function hideToast (toast) {
    if (!toast) return
    toast.addEventListener('webkitAnimationEnd', function () {
      deleteToast(toast)
    })
    toast.addEventListener('animationend', function () {
      deleteToast(toast)
    })
    toast.classList.add('material-toast-fade-out')
  }

  // delete toast from dom
  function deleteToast (toast) {
    if (!toast) return
    toast.remove()
    toast = null
  }

  // create new toast, insert message and return toast
  function createToastAndInsertToastMessage (currentToastConfig) {
    var currentToast = document.createElement('div')
    currentToast.className = 'material-toast'
    currentToast.insertAdjacentHTML('afterbegin',
      '<span class="material-toast_text">' + currentToastConfig.message + '</span>')
    return currentToast
  }

  // insert action button and add event listener to it
  function insertToastButton (currentToastConfig, currentToast) {
    currentToast.insertAdjacentHTML('beforeend',
      '<span class="material-toast_action-btn">' +
      currentToastConfig.actionText + '</span>')
    currentToast.querySelector('.material-toast_action-btn').addEventListener('click', function () {
      deleteToast(currentToast)
      currentToastConfig.actionHandler()
    })
  }

  function hide () {
    hideToast(currentToast)
  }

  // function for objects cloning
  function cloneObject (objectToClone) {
    return JSON.parse(JSON.stringify(objectToClone))
  }

  // function to change localToastConfig
  function changeConfig (toastConfig) {
    overrideObjectProperties(localToastConfig, toastConfig)
  }

  // function to merge toastConfig objects.
  function overrideObjectProperties (theTarget, theSource) {
    // overriding toast's style properties
    if (theSource.hasOwnProperty('style')) {
      for (var styleProperty in theSource.style) {
        if (theSource.style.hasOwnProperty(styleProperty)) {
          theTarget.style[styleProperty] = theSource.style[styleProperty]
        }
      }
    }

    // overriding other toast's properties
    for (var property in theSource) {
      if (theSource.hasOwnProperty(property) && property !== 'style') {
        theTarget[property] = theSource[property]
      }
    }
  }

  window.addEventListener('resize', function adjustToastPosition () {
    var currentToast = document.querySelector('.material-toast')
    if (document.documentElement.clientWidth > 1024) {
      changeConfig({'style': {'left': '252px'}})
      if (currentToast) currentToast.style.left = '252px'
    } else if (document.documentElement.clientWidth > 568) {
      changeConfig({'style': {'left': '12px'}})
      if (currentToast) currentToast.style.left = '12px'
    } else {
      changeConfig({'style': {'left': '0'}})
      if (currentToast) currentToast.style.left = '0'
    }
  })

  namespace.show = show
  namespace.hide = hide
  namespace.changeConfig = changeConfig
})(this.materialToast = this.materialToast || {})
