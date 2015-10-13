(function () {
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');

btn1.addEventListener('click', function () {
    madtarasToast.show({
        'innerText': 'Some message'
    });
});

btn2.addEventListener('click', function () {
    madtarasToast.show({
        'innerText': 'Some message',
        'duration': 1500
    });
});

btn3.addEventListener('click', function () {
    madtarasToast.show({
        'innerText': 'Song added',
        'actionInnerText': 'undo',
        'actionCallback': function() {
            madtarasToast.show({
                'innerText': 'Undid'
            });
        }
    });
});
})();