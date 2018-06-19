jQuery(document).ready(function($){

	// Create Model
	var FileModel = Backbone.Model.extend({
		idAttribute: "id"
	});
	window.fileModel = new FileModel;

	// Create the collection
	var FileCollection = Backbone.Collection.extend({
	  	model: FileModel
	});

	window.fileCollection = new FileCollection;

	window.counter = 0;
	// Create the View
	var FileView = Backbone.View.extend({
		collection: fileCollection,
		model: fileModel,
		template: _.template($('#fefm-single-file-template').html()),
		el: '#fefm-wrap-ul',
		events: {
			"click .fefm-item-file-trash": "trash"
		},
		initialize: function() {
			this.listenTo(this.collection, "add", this.add);
			this.listenTo(this.collection, "remove", this.remove);
		},
		trash: function(e) {
			e.preventDefault();
			var element = $(e.target);
			var file_id = element.attr('data-file-id');
			var file = this.collection.get(file_id);
			file.destroy({
				wait: true,
				url: frontend_filemanager.rest_url + 'delete/' + file_id,
				headers: {
					'X-WP-Nonce': frontend_filemanager.nonce
				},
				success: function() {
					// Delete in collection
				}
			});

			return;

		},
		remove: function(file) {
			this.render();
		},
		add: function(file){
			window.counter++;

			if ( counter % 2 == 0 ) {
				file.attributes.file_icon = frontend_filemanager.asset_uri + "file-type-icons/file-word.svg";
			} else {
				file.attributes.file_icon = frontend_filemanager.asset_uri + "file-type-icons/file-archive.svg";
			}
			
			this.$el.prepend(this.template(file.attributes));
		},
		render: function() {
			var files = this.collection.models;
			var that = this;
			if ( files  ) {
				this.$el.html('');
				$.each(files, function(index, file){
					that.$el.append(that.template(file.attributes));
				});
			}
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
						id: file.id,
						file_owner_id: file.file_owner_id,
						file_name: file.file_name,
						file_label: file.file_label,
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

  	uploader.bind('FileUploaded', function(up, file, result){
  		var response = JSON.parse(result.response);

		var __file = new FileModel;
			__file.set({
				id: response.file.id,
				file_owner_id: response.file.file_owner_id,
				file_name: response.file.file_name,
				file_label: response.file.file_label,
				file_type: response.file.file_type,
				file_description: response.file.file_description,
				file_sharing_type: response.file.file_sharing_type,
				date_updated: response.file.date_updated,
				date_created: response.file.date_created
			})
		fileCollection.add(__file);
  	});

  	document.getElementById('start-upload').onclick = function() {
  		uploader.start();
	};

});