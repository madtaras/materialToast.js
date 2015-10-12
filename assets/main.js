var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');

btn1.addEventListener('click', function () {
    madtarasToast.show({
        'innerText': 'Some text'
    });
});

btn2.addEventListener('click', function () {
    madtarasToast.show({
        'innerText': 'Some text',
        'duration': 3000
    });
});

btn3.addEventListener('click', function () {
    madtarasToast.show({
        'duration': 3000,
        'innerText': 'Song added',
        'actionInnerText': 'undo',
        'actionCallback': function() {
            madtarasToast.show({
                'duration': 3000,
                'innerText': 'undid'
            });
        }
    });
});