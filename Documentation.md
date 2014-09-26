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

The initial media shown is hardcoded in the HTML within the media container above. 

## Controlling the media player

### .pause()

Animates to the designated pause point and pauses playback.

### .play()

Continues the animation sequence from the current position.

## Customising the sequence of animations

TODO

## Specifying pause points in the animation sequence

TODO
