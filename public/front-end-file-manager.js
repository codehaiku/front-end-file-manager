jQuery(document).ready(function($){

	var uploader = new plupload.Uploader({
	  	browse_button: 'browse', 
	  	url: frontend_filemanager.rest_url + 'upload',
	  	unique_names: true,
		headers: {
			'X-WP-Nonce': frontend_filemanager.nonce
		},
	});

	uploader.init();

	uploader.bind('FilesAdded', function(up, files) {
		var html = '';
  		plupload.each(files, function(file) {
    		html += '<li id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></li>';
  		});
  		document.getElementById('filelist').innerHTML += html;
  	});

  	uploader.bind('UploadProgress', function(up, file) {
  		document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
	});

  	document.getElementById('start-upload').onclick = function() {
  		uploader.start();
	};

});