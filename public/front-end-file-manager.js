jQuery(document).ready(function($){

	// Create Model
	var FileModel = Backbone.Model.extend({
		idAttribute: "id",
		defaults: {
			id: 0,
			file_label: "",
			file_name: "",
			file_type: "",
			file_owner_id: 0,
			file_description: "",
			file_sharing_type: "",
			date_updated: "",
			date_created: ""
		}
	});
	window.fileModel = new FileModel;

	// Create the collection
	var FileCollection = Backbone.Collection.extend({
	  	model: FileModel
	});

	window.fileCollection = new FileCollection;

	// Create the View
	var FileView = Backbone.View.extend({
		collection: fileCollection,
		model: fileModel,
		template: _.template($('#fefm-single-file-template').html()),
		el: '#fefm-wrap-ul',
		events: {
			"click .fefm-item-file-trash": "trash",
			"click .file-item-column-file-actions-dropdown": "toggle_action_menu",
			"click .fefm-toolbar-close": 'close_toolbar'
		},
		initialize: function() {
			this.listenTo(this.collection, "add", this.add);
			this.listenTo(this.collection, "remove", this.remove);
		},
		close_toolbar: function(e) {
			e.preventDefault();
			var dropdown = $(e.target).parent().parent();
			dropdown.removeClass('active').addClass('inactive');
		},
		toggle_action_menu: function(e){

			e.preventDefault();

			var activeDropdown = $( e.target).parent().find('.file-item-column-file-actions-dropdown-ul');

			$.each( $('.file-item-column-file-actions-dropdown-ul'), function(){
				if ( ! $(this).is( activeDropdown ) ) {
					$(this).removeClass('active').addClass('inactive');
				}
			});

			if ( activeDropdown.hasClass('inactive') ) {
				activeDropdown.removeClass('inactive').addClass('active');
			} else {
				activeDropdown.addClass('inactive').removeClass('active');
			}

			return;

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
			
			var items=[
				"https://image.flaticon.com/icons/svg/136/136521.svg",
				"https://image.flaticon.com/icons/svg/136/136548.svg",
				"https://image.flaticon.com/icons/svg/136/136557.svg",
				"https://image.flaticon.com/icons/svg/136/136524.svg"
			];

			var item = items[Math.floor(Math.random()*items.length)];
			file.attributes.file_icon = item;
			
			this.$el.prepend(this.template(file.attributes));

		},
		list_files: function(){
			this.$el.html('');
			// Sync the file
			Backbone.sync('read', fileModel, {
				url: frontend_filemanager.rest_url + 'list',
				headers: {
					'X-WP-Nonce': frontend_filemanager.nonce
				},
				success: function(response){
					fileCollection.reset();
					
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
						fileCollection.add(__file, { merge: true });
					});
				}
			});
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

	var FrontEndFileManagerView__Single = Backbone.View.extend({
		template: _.template($('#fefm-single-view').html()),
		el: '#fefm-single-view-wrap',
		events: {
			"submit #fefm-update-file": 'update',
		},

		model: fileModel,
		update: function(e) {
			e.preventDefault();
			
			this.model.set({
				id: $('input[name=id]').val(),
				file_label: $('input[name=file_label]').val(),
				file_description: $('textarea[name=file_description]').val(),
				file_sharing_type: $('select[name=file_sharing_type]').val(),
			});

			Backbone.sync('create', this.model, {
				url: frontend_filemanager.rest_url + 'update',
				success: function(response) {
					console.log(response);
				}
			})
		},
		render: function(file_id) {
			var that = this;
			
			this.$el.html( that.template( this.model.defaults ) );
			Backbone.sync('read', this.model, {
				url: frontend_filemanager.rest_url + 'file/' + file_id,
				success: function(response) {
					that.model.set(response.file);
					that.$el.html( that.template( that.model.attributes ) );
				}	
			});
			
		}
	});
	window.frontEndFileManagerView__Single = new FrontEndFileManagerView__Single;
	
	// Routers
	var FrontEndFileManagerRoute = Backbone.Router.extend({
		routes: {
			"file/:id": "single",
			"list": "list",
			"": "list",// Default.
		},
		single: function (id) {
			$('#fefm-wrap').css('display', 'none');
			$('#fefm-single-view-wrap').css('display', 'block');
			frontEndFileManagerView__Single.render(id);
		},
		list: function() {
			
			$('#fefm-wrap').css('display', 'block');
			$('#fefm-single-view-wrap').css('display', 'none');

			fileView.list_files();
		},
		initialize: function() {
			Backbone.history.start();
		}
	});

	window.frontEndFileManagerRoute = new FrontEndFileManagerRoute();
	
	// == Uploader PLUPLOAD
	var uploader = new plupload.Uploader({
	  	browse_button: 'fefm-controls-btn-uploaded', 
	  	drop_element: 'fefm-wrap-ul',
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
  		
  		document.getElementById('fefm-uploader-file-list').innerHTML += html;
  		
  		uploader.start();

  	});

  	uploader.bind('UploadProgress', function(up, file) {
  		document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
	});

  	uploader.bind('FileUploaded', function(up, f, result){
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
			});

		fileCollection.add(__file);

		setTimeout(function(){
			$( '#'+f.id ).remove();
		}, 2000);


  	});


});