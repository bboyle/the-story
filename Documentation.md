rise-story web component
========================

## Introduction

A visual presentation of data. Thumbnails (representing data) are randomly looped in an automated slideshow. The slideshow can be paused by the user. Animations are used for a more compelling experience.

**TODO screenshot**

## Markup

First you must import the web component:

```html
<link rel="import" href="rise-story.html">
```

Then place the custom element in the page where you would like the story player to render:

```html
<rise-story companyId="UUID" folder="foo" refresh="60" />
```

### Attributes

- companyId **required** - UUID of your company, used to access media from rise-storage
- folder **required** - name of folder in rise-storage to load media from
- refresh *optional* - timeout (in minutes) before checking rise-storage for changes to media (minimum `15`). Omit this attribute to disable automatic refresh. (You can still manually refresh using the API commands below.)

### API methods

```js
// starts the slideshow playing
document.querySelector("rise-story").play();

// pauses playback (play will automatically resume after a few seconds)
document.querySelector("rise-story").pause();

// stops playback (use .play() to resume)
document.querySelector("rise-story").stop();

// switches between play and pause states
document.querySelector("rise-story").pauseToggle();

// recalculates the random layout of thumbnails and playback order
document.querySelector("rise-story").shuffle();

// clears screen and starts playback
document.querySelector("rise-story").reset();

// what about rise-storage API access?
document.querySelector("rise-story").getStorageComponent();

// changes media location (inherited from rise storage)
document.querySelector("rise-story").setAttribute("companyId", UUID);
document.querySelector("rise-story").setAttribute("folder", folderName);

// load media after changing media location (inherited from rise-storage)
document.querySelector("rise-story").go();
```

