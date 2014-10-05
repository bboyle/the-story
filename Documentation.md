present-data API
================

## Introduction

A visual presentation of data. Thumbnails (representing data) are randomly looped in an automated slideshow. The slideshow can be paused by the user. Animations are used for a more compelling experience.

## Loading the media player

Load these CSS in your `<head>`:

```html
    <link rel="stylesheet" href="css/init.css">
    <link rel="stylesheet" href="css/animation.css">
```

In the body of your page, add a media container:

```html
    <main role="main">
        <div id="media" class="thumbnail fade fade-in">
            <img src="(YOUR IMAGE FILE GOES HERE)" alt="(YOUR ALT TEXT)">
        </div>
    </main>
```

Load these scripts at the end of your page (before closing `</body>` tag):

```html
    <script src="js/viewportSize.js"></script>
    <script src="js/animationSequence.js"></script>
```

## Customising the media displayed

The initial media shown is hardcoded in the HTML within the media container above. Other media is placed inside a nav element which is hidden in the UI. The `button` elements are used for accessibility to support selecting specific media items.

```html
    <nav role="navigation">
        <ul>
            <li><button><img src="http://farm4.staticflickr.com/3829/9416063008_279161b050_b.jpg" alt="Test image"></button></li>
            <li><button><img src="http://farm8.staticflickr.com/7310/9419710875_8ba16c9ca9_b.jpg" alt="Test image"></button></li>
            …
        </ul>
    </nav>
```

## Controlling the media player

### .pause()

Animates to the designated pause point and pauses playback.
Adds 3 seconds of pause time (durations specified in the animation sequence still apply).

Returns the player object (chainable).

### .play()

Continues the animation sequence from the current position.

Returns the player object (chainable).

## .playPause()

Toggles between play and pause states.

Returns the player object (chainable).

## Customising the sequence of animations

TODO

## Specifying pause points in the animation sequence

TODO
