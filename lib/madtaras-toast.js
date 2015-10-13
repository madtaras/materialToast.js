(function () {

    function MadtarasToast() {
        var localToastConfig = {
            'duration': 5000,
            'style': {}
        };
        var currentToast;

        function show(toastConfig) {
            var currentToastId;

            // delete currentToast if it exist
            if (currentToast) {
                deleteCurrentToast();
            }

            // creating currentToast
            currentToast = document.createElement('div');
            ///currentToastId = 'madtaras-toast' + guid();
            currentToast.id = 'madtaras-toast' + guid();
            currentToastId = currentToast.id;
            currentToast.className = 'madtaras-toast __singleline';

            // choosing styles depending on number of symbols in toast
            if (toastConfig.actionInnerText) {
                var numOfSymbolsInToast = toastConfig.innerText.length +
                  toastConfig.actionInnerText.length;
                currentToast.classList.add(numOfSymbolsInToast < 76 ?
                  '__singleline' : '__multiline' );
            } else {
                currentToast.classList.add(toastConfig.innerText.length < 83 ?
                  '__singleline' : '__multiline' );
            }

            // inserting message
            currentToast.insertAdjacentHTML('afterbegin',
              '<span class="madtaras-toast_text">' + toastConfig.innerText + '</span>');
            if (toastConfig.actionInnerText && toastConfig.actionCallback) {
                currentToast.insertAdjacentHTML('beforeend',
                  '<span class="madtaras-toast_action-btn" id="madtaras-toast_action-btn">' +
                  toastConfig.actionInnerText + '</span>');
                currentToast.querySelector('#madtaras-toast_action-btn').
                  addEventListener('click', function () {
                      hide(currentToastId);
                      toastConfig.actionCallback();
                  });
            }

            // applying styles from localToastConfig
            for ( var styleProperty in localToastConfig.style ) {
                if ( localToastConfig.style.hasOwnProperty(styleProperty) ) {
                    currentToast.style[styleProperty] = localToastConfig.style[styleProperty];
                }
            }

            // inserting into body and start animating
            document.body.appendChild(currentToast);
            currentToast.classList.add('__fade-in');

            // setting timeout to hide toast
            setTimeout(function () {
                hide(currentToastId);
            }, toastConfig.duration || localToastConfig.duration);
        };

        function hide(toastToHideId) {
            var toastToHide = document.getElementById(toastToHideId);
            if ( !toastToHide ) return;
            toastToHide.addEventListener('webkitAnimationEnd', deleteCurrentToast);
            toastToHide.addEventListener('animationend', deleteCurrentToast);
            currentToast.classList.add('__fade-out');
        };

        // helping function
        function deleteCurrentToast() {
            currentToast.remove();
            currentToast = null;
        }

        // function to generate unique id for toast
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

        // function to change localToastConfig
        function changeConfig(properties) {

            // changing default toast styles
            if ( properties.hasOwnProperty('style') ) {
                for ( var styleProperty in properties.style ) {
                    localToastConfig.style[styleProperty] = properties.style[styleProperty];
                }
            }

            // changing other default properties
            for (var property in properties) {
                if ( properties.hasOwnProperty(property) && property !== 'style') {
                    localToastConfig[property] = properties[property];
                }
            }
        };

        this.show = show;
        this.changeConfig = changeConfig;
    }

    window.madtarasToast = new MadtarasToast();

})();