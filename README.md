# madtaras-toast

###  [Demo](http://madtaras.github.io/madtaras-toast)

### Installation

`bower install madtaras-toast`

Include these tags into your html.
* `<link rel="stylesheet" href="bower_components/madtaras-toast/lib/madtaras-toast.min.css">`
* `<script src="bower_components/madtaras-toast/lib/madtaras-toast.min.js"></script>`

### Usage

`madtarasToast.show(toastConfig);`

#### toastConfig properties:
* innerText {String} **required** - toast's inner text
* duration - {Number} **optional** (by default 5000) - number of ms toast will be visible for
* actionInnerText - {String} **optional** - action button's inner text
* actionCallback - {Function} **required if actionInnerText, otherwise optional** - function to invoke, when action button was clicked

---------------
#### The simplest usage

```javascript
madtarasToast.show({
    'innerText': 'Some message'
});
```

#### With custom duration

```javascript
madtarasToast.show({
    'innerText': 'Some message',
    'duration': 1500
});
```

#### With action button and callback function

```javascript
madtarasToast.show({
    'innerText': 'Song added',
    'actionInnerText': 'undo',
    'actionCallback': function() {
        madtarasToast.show({
            'innerText': 'Undid'
        });
    }
});
```

#### Using all functional

```javascript
madtarasToast.show({
    'innerText': 'Song added',
    'duration': 1500,
    'actionInnerText': 'undo',
    'actionCallback': function() {
        madtarasToast.show({
            'innerText': 'Undid',
            'duration': 1000
        });
    }
});
```

#### Changing default duration and styles

```javascript
madtarasToast.changeConfig({
    'duration': 3000,
    'style': {
        'left': '100px',
        'background': '#111'
    }
});
```