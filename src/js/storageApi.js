var riseVisionStorage = function() {
	'use strict';

	var storageApi = {};

	// get all media from storage
	storageApi.getMedia = function getMedia( callback ) {
		var parameters = {
			companyId: '76ef5f8c-cd7b-4041-bff2-728a81366d12',
			folder: 'the-story'
		};

		// only images
		function filterImages( file ) {
			return file.contentType.indexOf( 'image/' ) === 0;
		}
		// just media URLs
		function mapMediaLinks( file ) {
			return file.mediaLink;
		}

		gapi.client.storage.files.get( parameters ).execute(function( response ) {
			// just grab the image URLs
			var images = response.files.filter( filterImages ).map( mapMediaLinks );
			// run call back on images
			callback( images );
		});
	};

	return storageApi;

};