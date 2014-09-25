(function() {
	'use strict';

	var images = [
		// <a href="https://www.flickr.com/photos/expomeloneras/6081715867" title="Ballet de Moscú 2011 by ExpoMeloneras, on Flickr"><img src="https://farm7.staticflickr.com/6066/6081715867_b131bb9298.jpg" width="500" height="232" alt="Ballet de Moscú 2011"></a>
		'https://farm7.staticflickr.com/6066/6081715867_b131bb9298.jpg',
		// <a href="https://www.flickr.com/photos/greg_photos/8708749551" title="Aurora_Ballet_20120504_201 by Greg Gamble, on Flickr"><img src="https://farm9.staticflickr.com/8557/8708749551_688f8f57ff.jpg" width="500" height="333" alt="Aurora_Ballet_20120504_201"></a>
		'https://farm9.staticflickr.com/8557/8708749551_688f8f57ff.jpg',
		// <a href="https://www.flickr.com/photos/melillamirada/4121521415" title="Ballet en la Gala Lírica by Miguel, on Flickr"><img src="https://farm3.staticflickr.com/2609/4121521415_45d78b2cbd.jpg" width="500" height="436" alt="Ballet en la Gala Lírica"></a>
		'https://farm3.staticflickr.com/2609/4121521415_45d78b2cbd.jpg',
		// <a href="https://www.flickr.com/photos/panacheart/5159389818" title="Ballet Bellevue Nutcracker 2010 by Scott Moore, on Flickr"><img src="https://farm2.staticflickr.com/1334/5159389818_c97c7faff9.jpg" width="364" height="500" alt="Ballet Bellevue Nutcracker 2010"></a>
		'https://farm2.staticflickr.com/1334/5159389818_c97c7faff9.jpg',
		// <a href="https://www.flickr.com/photos/lac-bac/8054555591" title="Seven dancers performing in &quot;Sur les Pointes,&quot; a production by Boris Volkoff&#x27;s Canadian Ballet / Prestation « Sur les pointes » de sept danseuses, dans une production des ballets canadiens de Boris Volkoff by Library and Archives Canada / Bibliothèque et Archives Canada, on Flickr"><img src="https://farm9.staticflickr.com/8040/8054555591_686a8ebbc4.jpg" width="500" height="377" alt="Seven dancers performing in &quot;Sur les Pointes,&quot; a production by Boris Volkoff&#x27;s Canadian Ballet / Prestation « Sur les pointes » de sept danseuses, dans une production des ballets canadiens de Boris Volkoff"></a>
		'https://farm9.staticflickr.com/8040/8054555591_686a8ebbc4.jpg',
	];
	var nextImage = new Image();

	var media = document.getElementById( 'media' );
	var sequence = [
		{ duration:  100, on: 'thumbnail',         off: 'fade-in'   },
		{ duration:  600, on: 'full',              off: 'thumbnail' },
		{ duration: 3500, on: 'fade-in thumbnail', off: 'full'      },
		{ duration:  700, on: 'thumbnail',         off: 'full'      },
	];


	var i = 0;
	var then = Date.now();
	requestAnimationFrame(function animateSequence() {
		var now = Date.now();

		// time to update?
		if ( now - then >= sequence[ i ].duration ) {
			// update classes
			sequence[ i ].on.split( ' ' ).forEach(function( newClass ) {
				media.classList.add( newClass );
			});
			sequence[ i ].off.split( ' ' ).forEach(function( oldClass ) {
				media.classList.remove(  oldClass );
			});


			// prepare next image
			if ( i === 0 ) {
				nextImage.src = images[ Math.floor( Math.random() * images.length ) ];
			}

			// next in sequence
			then = now;
			i = ( i + 1 ) % sequence.length;

			// new media?
			if ( i === 0 ) {
				media.getElementsByTagName( 'img' )[ 0 ].src = nextImage.src;
			}
		}

		// loop
		requestAnimationFrame( animateSequence );
	});

}());
