# MaterialToast.js

###  [Demo](http://madtaras.github.io/materialtoast.js/)

### Installation

Include these tags into your html.

* `<link rel="stylesheet" href="dist/materialToast.css">`
* `<script src="dist/materialToast.js"></script>`

### Browser support:
* Chrome
* Firefox
* Safari 7+
* Chrome for Android
* Firefox for Android
* Opera Mobile
* Safari Mobile 7+

### Usage

#### Show toast
`materialToast.show(toastConfig)`

 **toastConfig properties:**

* message {String} **required**
* timeout - {Number or Infinity} **optional** (by default 5000) - number of ms toast will be visible for
* style - {Object} **optional** - object with css styles to apply to element (this parameter is applied only for current toast. If you want to change styles globally use changeConfig method)
* actionText: - {String} **optional** - action button's inner text
* actionHandler: - {Function} **required if actionInnerText, otherwise optional** - function to invoke, when action button was clicked

#### Hide toast
`materialToast.hide()`

#### Changing default timeout and styles

```javascript
materialToast.changeConfig({
  'timeout': 3000,
  'style': {
    'left': '100px',
    'background': '#111'
  }
})
```

---------------
#### The simplest usage

```javascript
materialToast.show({
  'message': 'Some message'
})
```

#### With custom duration

```javascript
materialToast.show({
  'message': 'Some message',
  'timeout': 1500
})
```

#### With action button and callback function

```javascript
materialToast.show({
  'message': 'Song added',
  'actionText': 'undo',
  'actionHandler': function() {
    materialToast.show({
      'message': 'Undid'
    })
  }
})
```

#### With custom styles

```javascript
materialToast.show({
  'message': 'Some message',
  'style': {
    'left': '100px',
    'background': '#111'
  }
})
```
