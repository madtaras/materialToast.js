# madtaras-toast

###  [Demo](http://madtaras.github.io/madtaras-toast)

### Installation

`bower install madtaras-toast`

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
    'innerText': 'Some text'
});
```
#### With custom duration
```javascript
madtarasToast.show({
    'innerText': 'Some text',
    'duration': 3000
});
```
#### With action button and callback function
```javascript
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