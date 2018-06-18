jQuery(document).ready(function($){

	// Create Model
	var FileModel = Backbone.Model.extend({
		idAttribute: "_id"
	});
	window.fileModel = new FileModel;

	// Create the collection
	var FileCollection = Backbone.Collection.extend({
	  	model: fileModel,
	  	modelId: function(attrs) {
	  		return attrs.id;
	  	}
	});
	window.fileCollection = new FileCollection;
	fileCollection.on('add', function(file){
		//console.log(file);
	});
	
	// Create the View
	var FileView = Backbone.View.extend({
		collection: fileCollection,
		model: fileModel,
		template: _.template($('#fefm-single-file-template').html()),
		el: '#fefm-wrap-ul',
		initialize: function() {
			this.listenTo(this.collection, "add", this.render);
		},
		render: function(file){
			file.attributes.file_icon = frontend_filemanager.asset_uri + "file-type-icons/file-word.svg";
			this.$el.append(this.template(file.attributes));
		}
	}); 
	window.fileView = new FileView;

	// Sync the file
	Backbone.sync('read', fileModel, {
		url: frontend_filemanager.rest_url + 'list',
		headers: {
			'X-WP-Nonce': frontend_filemanager.nonce
		},
		success: function(response){
			$.each(response.files, function(index, file){
				var __file = new FileModel;
					__file.set({
						_id: file.id,
						file_owner_id: file.file_owner_id,
						file_name: file.file_name,
						file_type: file.file_type,
						file_description: file.file_description,
						file_sharing_type: file.file_sharing_type,
						date_updated: file.date_updated,
						date_created: file.date_created
					})
				fileCollection.add(__file);
			});
		}
	});
	// == Uploader PLUPLOAD
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