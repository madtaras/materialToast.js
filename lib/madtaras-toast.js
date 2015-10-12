(function () {

    function MadtarasToast() {
        var localToastConfig = {
            'duration': 5000,
            'style': {}
        };
        var currentToast;

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

        function show(toastConfig) {
            var currentToastId;

            // hide currentToast if it is visible
            if (currentToast) {
                hide(currentToast.id);
                currentToast = null;
            }

            // creating currentToast
            currentToast = document.createElement('div');
            currentToastId = 'madtaras-toast' + Date.now();
            currentToast.id = currentToastId;
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
            toastToHide.addEventListener('webkitAnimationEnd', function () {
                toastToHide.remove();
                toastToHide = null;
            });
            toastToHide.addEventListener('animationend', function () {
                toastToHide.remove();
                toastToHide = null;
            });
            currentToast.classList.add('__fade-out');
        };

        this.show = show;
        this.changeConfig = changeConfig;
    }

    window.madtarasToast = new MadtarasToast();

})();