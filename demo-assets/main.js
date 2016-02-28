/* globals materialToast */
;(function () {
  var btn1 = document.getElementById('btn1')
  var btn2 = document.getElementById('btn2')
  var btn3 = document.getElementById('btn3')
  var btn4 = document.getElementById('btn4')
  var btn5 = document.getElementById('btn5')

  btn1.addEventListener('click', function () {
    materialToast.show({
      'message': 'Some message'
    })
  })

  btn2.addEventListener('click', function () {
    materialToast.show({
      'message': "There is a very loooooooooooooooooooong message here. That's why toast is multiline."
    })
  })

  btn3.addEventListener('click', function () {
    materialToast.show({
      'message': 'Some message with custom duration',
      'timeout': 1500
    })
  })

  btn4.addEventListener('click', function () {
    materialToast.show({
      'message': 'Song added',
      'actionText': 'undo',
      'actionHandler': function () {
        materialToast.show({
          'message': 'Undid'
        })
      }
    })
  })

  btn5.addEventListener('click', function () {
    materialToast.show({
      'message': 'Some message',
      'style': {
        'left': '100px',
        'background': '#111'
      }
    })
  })
})()
