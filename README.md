# dateflipper.js

A simple animated JavaScript date flipper component.
[See it in action](http://raw.githubusercontent.com/rsimon/date-flipper/master/example.html).

## Usage

```javascript
<div id="flipper"></div>
```
```javascript
<script src="jquery.min.js"></script>
<script src="dateflipper.min.js"></script>
<script>
  var dateflipper = new DateFlipper(document.getElementById('flipper'));
</script>
```

### Options

```javascript
jQuery(document).ready(function() {
  var dateflipper = new DateFlipper(document.getElementById('flipper'), {

    // TODO

  });
});
```

### API

```javascript
// Set a new date
dateflipper.set(new Date(2015, 8, 16));
```
