;(function (namespace) {

    var localToastConfig = {
        'duration': 5000,
        'style': {}
    };
    var previousToast;

    function show(toastConfig) {

        // hide previousToast if it exists
        if (previousToast) hideToast(previousToast);

        // create config object for currentToast and delete toastConfig
        var currentToastConfig = cloneObject(localToastConfig);
        overrideObjectProperties(currentToastConfig, toastConfig);
        toastConfig = null;

        // create currentToast
        var currentToast = createToastAndInsertToastMessage(currentToastConfig);

        // insert action-btn if it exists
        if (currentToastConfig.actionInnerText && currentToastConfig.actionCallback) {
            insertToastButton(currentToastConfig, currentToast);
        }

        // override current toast style
        overrideObjectProperties(currentToast.style, currentToastConfig.style);

        // insert into body, choose height depending on line number, animate
        document.body.appendChild(currentToast);

        var toastComputedStyles = window.getComputedStyle(currentToast);
        if (toastComputedStyles.height === toastComputedStyles.lineHeight) {
            currentToast.classList.add('singleline');
        } else {
            currentToast.classList.add('multiline');
        }

        currentToast.classList.add('fade-in');

        // set timeout to hide toast
        setTimeout(function () {
            hideToast(currentToast);
        }, currentToastConfig.duration);

        // reference for hide toast when showing other one
        previousToast = currentToast;

    }

    // animate toast and then invoke deleteToast function
    function hideToast(toast) {
        if ( !toast ) return;
        toast.addEventListener('webkitAnimationEnd', function () {
            deleteToast(toast);
        });
        toast.addEventListener('animationend', function () {
            deleteToast(toast);
        });
        toast.classList.add('fade-out');
    }

    // delete toast from dom
    function deleteToast(toast) {
        if ( !toast ) return;
        toast.parentNode.removeChild(toast);
        toast = null;
    }

    // create new toast, insert message and return toast
    function createToastAndInsertToastMessage(currentToastConfig) {
        var currentToast = document.createElement('div');
        currentToast.className = 'madtaras-toast';
        currentToast.insertAdjacentHTML('afterbegin',
          '<span class="madtaras-toast_text">' + currentToastConfig.innerText + '</span>');
        return currentToast;
    }

    // insert action button and add event listener to it
    function insertToastButton(currentToastConfig, currentToast) {
        currentToast.insertAdjacentHTML('beforeend',
          '<span class="madtaras-toast_action-btn">' +
          currentToastConfig.actionInnerText + '</span>');
        currentToast.querySelector('.madtaras-toast_action-btn').
          addEventListener('click', function () {
              deleteToast(currentToast);
              currentToastConfig.actionCallback();
          });
    }

    // function for objects cloning
    function cloneObject(objectToClone) {
        return JSON.parse(JSON.stringify(objectToClone));
    }

    // function to change localToastConfig
    function changeConfig(toastConfig) {
        overrideObjectProperties(localToastConfig, toastConfig);
    }

    // function to merge toastConfig objects.
    function overrideObjectProperties(theTarget, theSource) {

        // overriding toast's style properties
        if ( theSource.hasOwnProperty('style') ) {
            for (var styleProperty in theSource.style) {
                if ( theSource.style.hasOwnProperty(styleProperty) ) {
                    theTarget.style[styleProperty] = theSource.style[styleProperty];
                }
            }
        }

        // overriding other toast's properties
        for (var property in theSource) {
            if ( theSource.hasOwnProperty(property) && property !== 'style' ) {
                theTarget[property] = theSource[property];
            }
        }
    }

    namespace.show = show;
    namespace.changeConfig = changeConfig;

})(this.madtarasToast = this.madtarasToast || {});