var riseVisionStorage = function() {
	'use strict';

	var storageApi = {};

	// get all media from storage
	storageApi.getMedia = function getMedia( company, folder, callback ) {
		var url = 'https://www.googleapis.com/storage/v1/b/risemedialibrary-' + encodeURIComponent( company ) + '/o?delimiter=' + encodeURIComponent( '/' ) + '&prefix=' + encodeURIComponent( folder + '/' );

		// only images
		function filterImages( file ) {
			return file.contentType.indexOf( 'image/' ) === 0;
		}
		// just media URLs
		function mapMediaLinks( file ) {
			return file.mediaLink;
		}

		// process JSON response
		function handleJson() {
			var json = JSON.parse( this.responseText );
			// just grab the image URLs
			var images = json.items.filter( filterImages ).map( mapMediaLinks );
			// run call back on images
			callback( images );
		}

		// https://www.googleapis.com/storage/v1/b/risemedialibrary-76ef5f8c-cd7b-4041-bff2-728a81366d12/o?delimiter=%2F&prefix=the-story%2F
		var xhr = new XMLHttpRequest();
		xhr.addEventListener( 'load', handleJson, false );
		xhr.open( 'GET', url, true );
		xhr.send();
	};

	return storageApi;

};