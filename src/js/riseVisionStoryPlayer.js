/*global knuthShuffle, DOMTokenList*/
(function() {
  "use strict";


  var player = {};
  var playing = false;
  var paused = false;
  var pausedTimeout = 3000;

  var MIN_Z_INDEX = 1;
  var zindex = MIN_Z_INDEX;

  var sequence = [
    { duration:  100, on: "thumbnail focus",   off: "fade-in hidden"    },
    { duration:  750, on: "full",              off: "thumbnail fade-in" },
    { duration: 3500, on: "fade-in thumbnail", off: "full focus"        },
    { duration:  700, on: "fade-in thumbnail", off: "full focus"        },
  ];
  var sequencePauseIndex = 1;


  function riseVisionStoryPlayer() {

    var playQueue;
    var mediaIndex = 0;
    var animationIndex = 0;

    // got file list from storage
    document.querySelector("rise-storage").addEventListener("rise-storage-response", function(e) {
      var urls = e.detail;

      // setup DOM
      var mediaList = document.querySelector("main > ul");
      var oldMediaList = {};
      if (! mediaList) {
        mediaList = document.createElement("ul");
        document.querySelector("main").appendChild(mediaList);
      } else {
        Array.prototype.forEach.call(mediaList.children, function(li) {
          var src = li.querySelector("img").src;
          oldMediaList[src] = li;
        });
      }

      var newItems = [];

      urls.forEach(function(src) {
        // already have this element
        if (oldMediaList[src]) {
          delete oldMediaList[src];
          return;
        }

        var li = document.createElement("li");
        var figure = document.createElement("figure");
        var button = document.createElement("button");
        var img = document.createElement("img");
        img.src = src;
        img.alt = "";

        // initial animation classes
        li.classList.add("hidden", "fade", "fade-in", "thumbnail");

        // add to DOM
        button.appendChild(img);
        figure.appendChild(button);
        li.appendChild(figure);
        newItems.push(li);
      });

      // stop playing
      stop();

      // remove anything left on the old media list
      Object.keys(oldMediaList).forEach(function(key) {
        oldMediaList[key].remove();
      });

      // add new media
      newItems.forEach(function(li) {
        mediaList.appendChild(li);
      });

      // get the new children list
      playQueue = Array.prototype.slice.call(mediaList.children);
      shuffleQueue();

      // go
      animationIndex = 0;
      play();
    });


    // is an element hidden?
    function isHidden(domElement) {
      return domElement.classList.contains("hidden");
    }

    // remove style property
    // omit value to reset style to "undefined"
    function setStyle(styleMap) {
      return function(domElement) {
        Object.keys(styleMap).forEach(function(prop) {
          domElement.style[prop] = styleMap[prop];
        });
      };
    }


    // shuffle items for playback
    function shuffleQueue() {
      var unseenItemsInQueue = playQueue.filter(isHidden);

      zindex = MIN_Z_INDEX;

      if (unseenItemsInQueue.length) {
        playQueue = playQueue.filter(function(item) {
          return unseenItemsInQueue.indexOf(item) === -1;
        });
        // reset zindex
        for (var i = 0; i < playQueue.length; i++) {
          playQueue[i].style.zIndex = ++zindex;
        }
        // put hidden items first
        knuthShuffle(unseenItemsInQueue);
        knuthShuffle(playQueue);
        playQueue = unseenItemsInQueue.concat(playQueue);
      } else {
        // shuffle the order
        knuthShuffle(playQueue);
      }

      // shuffle onscreen positions
      playQueue.forEach(function(li) {
        // randomly position
        li.style.left = (Math.floor(Math.random() * window.innerWidth) - (window.innerWidth / 2)) + "px";
        li.style.top = (Math.floor(Math.random() * window.innerHeight) - (window.innerHeight / 2)) + "px";
        li.style.transform = "rotate(" + (Math.floor(Math.random() * 42) - 21) + "deg)";
      });

      // reset
      playQueue.forEach(setStyle({ "z-index": 1 }));
      mediaIndex = 0;
    }


    // set animation state
    function setAnimationState(element, classObject) {
      DOMTokenList.prototype.add.apply(element.classList, classObject.on.split(" "));
      DOMTokenList.prototype.remove.apply(element.classList, classObject.off.split(" "));
    }


    // render the animation sequence
    var then = Date.now();
    function animateSequence() {
      var now = Date.now();

      // time to update?
      if (playing && now - then >= sequence[animationIndex].duration) {
        if (mediaIndex >= playQueue.length) {
          if (playQueue.length === 0) {
            return;
          }
          shuffleQueue();
        }

        // update classes
        if (animationIndex === 0) {
          playQueue[mediaIndex].style.zIndex = ++zindex;
        }
        setAnimationState(playQueue[mediaIndex], sequence[animationIndex]);

        // next in sequence
        then = now;
        animationIndex = (animationIndex + 1) % sequence.length;

        // prepare next image
        if (animationIndex === 0) {
          mediaIndex++;
        }
      }

      // paused?
      if (paused) {
        // set pause duration
        then += pausedTimeout;
        paused = false;
      }

      // loop
      if (playing) {
        requestAnimationFrame(animateSequence);
      }
    }


    // pause the slideshow
    function pause() {
      if (! paused) {
        animationIndex = sequencePauseIndex;
        paused = true;
        then = 0; // triggers animation to run
      }
      return player;
    }

    // play
    function play() {
      then = Math.min(then, Date.now());
      if (! playing || paused) {
        playing = true;
        paused = false;
        requestAnimationFrame(animateSequence);
      }

      return player;
    }

    // pause toggle
    function playToggle() {
      if (playing) {
        pause();
      } else {
        play();
      }
    }

    // stop
    function stop() {
      if (playing) {
        playing = false;
        paused = false;
        animationIndex = sequence.length - 1;
        // finish current element
        setAnimationState(playQueue[mediaIndex], sequence[animationIndex]);
      }
      return player;
    }


    // click on media
    function playerClick(event) {
      event.stopImmediatePropagation();

      var item = event.target;
      var selectedIndex, selectedItem, upcoming;

      // find LI ancestor
      while (/^BUTTON|FIGURE|IMG$/i.test(item.tagName) && item.parentNode) {
        item = item.parentNode;
      }
      // is it a media element? find it
      selectedIndex = playQueue.indexOf(item);

      // selected active item
      if (selectedIndex === mediaIndex) {
        // just pause
        if (! playing) {
          play();
        } else {
          pause();
        }

      } else if (selectedIndex < playQueue.length) {
        stop();
        upcoming = selectedIndex > mediaIndex;

        // move to next play position
        selectedItem = playQueue.splice(selectedIndex, 1)[0];
        if (upcoming) {
          mediaIndex++;
        }
        playQueue.splice(mediaIndex, 0, selectedItem);

        // reset animation
        animationIndex = 0;
        play();
      }
    }


    // select media item on click
    document.querySelector("main").addEventListener("click", playerClick);


    // return API
    player = {
      pause: pause,
      play: play,
      playPause: playToggle,
      stop: stop
    };
    return player;
  }


  // API
  window.riseVisionStoryPlayer = riseVisionStoryPlayer;

}());
