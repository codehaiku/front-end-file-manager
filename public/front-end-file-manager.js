jQuery(document).ready(function($){

	"use strict";

	// Initialize the scrollbar.
	const ps = new PerfectScrollbar('#fefm-file-window');

	window.fefm = {};
	// The file browsing model.
	var browsingPropertyModel = Backbone.Model.extend({
		defaults: {
			search_keywords: "",
			page: 1,
			sort_by: "",
			sort_dir: "",
			max_page: 1,
		}
	});

	window.fefm.browsingProps = new browsingPropertyModel;

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
	  	model: FileModel,
	  	initialize: function() {
	  		this.sort_by = "date_updated";
	  		this.sort_dir = "DESC";
	  	}
	});

	window.fileCollection = new FileCollection;

	// Error Views
	var FrontEndFileManagerView_Notices = Backbone.View.extend({
		element: '#fefm-preloader',
		render: function( type, message = "loading"){
			$('#fefm-preloader').addClass('active');
			$('#fefm-preloader > #fefm-preloader-inner-wrap').addClass(type).addClass('active');
			$('#fefm-message').html(message);
			$('#fefm-wrap-ul').css('opacity', 0.45);
		},
		hide: function() {
			setTimeout(function(){
				// Remove all class.
				document.getElementById('fefm-preloader').className="";
				$('#fefm-message').html('');
				$('#fefm-wrap-ul').css('opacity', 1);
			}, 500);
			
		}
	});
	window.frontEndFileManagerView_Notices = new FrontEndFileManagerView_Notices;

	// Pagination View
	var FrontEndFileManagerPaging_View = Backbone.View.extend({
		el: '#fefm-pagination-wrap',
		template: _.template($('#fefm-pagination-template').html()),
		render: function(settings){
			this.$el.html( this.template( settings ) );
		}
	});

	window.frontEndFileManagerPaging_View = new FrontEndFileManagerPaging_View;

	// Toolbar View
	var FrontEndFileManagerView__Toolbar = Backbone.View.extend({
		collection: fileCollection,
		model: fileModel,
		el: '#fefm-navigation',
		events: {
			"submit #fefm-search-form": 'search',
			'click #fefm-search-close-search': 'cancel_search',
			"click #js-fefm-trash-multiple-files": 'trash_multiple',

		},
		checked_files_collection: function(){

			var checkboxes = $('.js-file-selector');
			var selected_file_ids = [];

			$.each(checkboxes, function(){
				if ( $(this).is(':checked') ) {
					selected_file_ids.push( $(this).attr('data-file-id') );
				} 
			});

			return selected_file_ids;

		},
		trash_multiple: function(e) {
			e.preventDefault();
			var selected_files_ids = this.checked_files_collection();
			var that = this;
			frontEndFileManagerView_Notices.render( 'progress', 'Sending selected files to trash. Please wait');
			Backbone.sync( 'delete', this.model, {
				url: frontend_filemanager.rest_url + 'trash-multiple?files=' + selected_files_ids.join(),
				headers: {
					'X-WP-Nonce': frontend_filemanager.nonce
				},
				success: function( response ) {
					if ( 'error' !== response.type ) {
						fefm.browsingProps.set({
							search_keywords: $('#fefm-file-dir-search').val().trim(),
							sort_by: that.collection.sort_by,
							sort_dir: that.collection.sort_dir
						});
						fileView.list_files( fefm.browsingProps.attributes );
					} else {
						frontEndFileManagerView_Notices.render( 'error', response.message);
					}
					ps.update();
				},
				error: function( message, error ){
					frontEndFileManagerView_Notices.render( 'error', 'There was an error deleting files. Try again later.' );
				}
			});
		},
		cancel_search: function() {
			frontEndFileManagerRoute.navigate("list", {trigger: true});
		},
		search: function(e) {
			
			e.preventDefault();
			var search_keywords = $('#fefm-file-dir-search').val().trim();
			if ( 0 === search_keywords.length ) {
				frontEndFileManagerRoute.navigate("list", {trigger: true});
			} else {
				frontEndFileManagerRoute.navigate("list/search/"+search_keywords+"/page/1", {trigger: true});
			}

		}

	}); 

	// Sorting actions view.
	var FrontEndFileManagerView__Sorting = Backbone.View.extend({
		el: '#fefm-file-actions',
		collection: fileCollection,
		events: {
			"click .fefm-action-sort": 'sort',
			'click #fefm-check-all-file': 'multiple_file_selector'
		},
		multiple_file_selector: function(e) {
			var element = $(e.target);

			if ( ( element ).is(':checked') ) {
				$.each( $('.js-file-selector'), function(){
					$(this).attr('checked', 'checked').change();
				});
				$('.fefm-bulk-actions').addClass('active');
			} else {
				$.each( $('.js-file-selector'), function(){
					$(this).removeAttr('checked').change();
				});
				$('.fefm-bulk-actions').removeClass('active');
			}
		},
		sort: function(e){

			e.preventDefault();

			var sort_type = $(e.target).attr('data-sort-by');
			this.collection.sort_by = sort_type;

			if ( this.collection.sort_dir.length == 0 ) {
				this.collection.sort_dir = 'ASC';
			}		
			if ( this.collection.sort_dir == 'ASC' ) {
				this.collection.sort_dir = 'DESC';
			} else { 
				this.collection.sort_dir = 'ASC'; 
			}

			fefm.browsingProps.set({
				search_keywords: $('#fefm-file-dir-search').val().trim(),
				sort_by: this.collection.sort_by,
				sort_dir: this.collection.sort_dir
			});

			fileView.list_files( fefm.browsingProps.attributes );
		},
	});

	window.frontEndFileManagerView__Sorting = new FrontEndFileManagerView__Sorting;
	
	window.frontEndFileManagerView__Toolbar = new FrontEndFileManagerView__Toolbar;

	// Create the View
	var FileView = Backbone.View.extend({
		collection: fileCollection,
		model: fileModel,
		template: _.template($('#fefm-single-file-template').html()),
		el: '#fefm-wrap-ul',
		events: {
			"click .fefm-item-file-trash": "trash",
			"click .file-item-column-file-actions-dropdown": "toggle_action_menu",
			"click .fefm-toolbar-close": 'close_toolbar',
			"click .js-file-selector": 'toggle_multiple_actions',
			"change .js-file-selector": 'highlight_selected'
		},
		highlight_selected: function(e){
			var check = $( e.target );
			if( check.is(':checked') ) {
				check.parent().parent().addClass('active');
			} else {
				check.parent().parent().removeClass('active');
			}
			
		},
		toggle_multiple_actions: function(e){
			
			var file_checkers = $(e.target);
			var counter = 0;

			$.each( $('.js-file-selector'), function(){
				if ( $(this).is(':checked') ) {
					counter++;
				}
			});
			
			if ( counter >= 1 ) {
				$('.fefm-bulk-actions').addClass('active');
			} else {
				$('.fefm-bulk-actions').removeClass('active');
			}
		},
		search: function(e) {
			e.preventDefault();
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
			ps.update();
			return;

		},
		remove: function(file) {
			this.render();
		},
		add: function(file, settings, options){
			
			var items=[
				"https://image.flaticon.com/icons/svg/136/136521.svg",
				"https://image.flaticon.com/icons/svg/136/136548.svg",
				"https://image.flaticon.com/icons/svg/136/136557.svg",
				"https://image.flaticon.com/icons/svg/136/136524.svg"
			];

			var item = items[Math.floor(Math.random()*items.length)];

			file.attributes.file_icon = item;
			
			if( options.fefm_method && options.fefm_method === 'prepend') {
				this.$el.prepend(this.template(file.attributes));
			} else {
				this.$el.append(this.template(file.attributes));
			}

			$('.fefm-no-files-found').removeClass('active');
			
			ps.update();

		},
		updatePagination: function(settings) {
			window.frontEndFileManagerPaging_View.render(settings);
		},
		list_files: function(settings){

			var that = this;
			var client_data = {};
			var keywords = '';
			// Sync the file
			if ( settings.search_keywords ) {
				keywords = settings.search_keywords;
				client_data.search_keywords = settings.search_keywords
			}
			if ( settings.sort_by ) {
				client_data.sort_by = fileCollection.sort_by;
			}
			if ( settings.sort_dir ) {
				client_data.sort_dir = fileCollection.sort_dir;
			}

			// Hide the no files found
			$('.fefm-no-files-found').removeClass('active');

			// Upload sorting view.
			var browsingAttr = fefm.browsingProps.attributes;

			$('#fefm-check-all-file').removeAttr('checked');
			$('.fefm-bulk-actions').removeClass('active');

			$('#fefm-file-actions > li > a').removeClass('active asc desc');
			if ( browsingAttr.sort_by.length >=1 ) {
				$('#fefm-file-actions > li > a[data-sort-by='+browsingAttr.sort_by+']').addClass('active').addClass(browsingAttr.sort_dir.toLowerCase());
			} 

			frontEndFileManagerView_Notices.render('progress', 'Getting your files ready. Please wait');

			Backbone.sync('read', fileModel, {
				url: frontend_filemanager.rest_url + 'list/page/' + settings.page,
				headers: {
					'X-WP-Nonce': frontend_filemanager.nonce
				},
				data: client_data,
				success: function(response){
					fileCollection.reset();
					that.$el.html('');
					if ( response.files.length > 1 ) {
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
						$('.fefm-no-files-found').removeClass('active');
					} else {
						$('.fefm-no-files-found').addClass('active');
					}
					// Update pagination.
					that.updatePagination({
						current_page: response.page,
						num_pages: response.num_pages,
						search_keywords: keywords,
					});
					frontEndFileManagerView_Notices.hide();
				}
			});

			ps.update();
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
			ps.update();
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
			"list/page/:page": "list",
			"list/search/:keywords/page/:page": "search",
			"": "list",// Default.
		},
		search: function( keywords, _page ) {
			
			$('#fefm-file-dir-search').val( keywords.trim() );
			
			fefm.browsingProps.set({
				page: _page,
				search_keywords: keywords,
				sort_by: fileCollection.sort_by,
				sort_dir: fileCollection.sort_dir
			});

			fileView.list_files( fefm.browsingProps.attributes );

			$('#fefm-search-close-search').addClass('active');

			return;

		},
		single: function (id) {
			$('#fefm-wrap').css('display', 'none');
			$('#fefm-single-view-wrap').css('display', 'block');
			$('#fefm-pagination-wrap').css('display', 'none');
			frontEndFileManagerView__Single.render(id);
		},
		list: function(_page) {
			
			$('#fefm-pagination-wrap').css('display', 'block');
			$('#fefm-wrap').css('display', 'block');
			$('#fefm-single-view-wrap').css('display', 'none');
			
			$('#fefm-search-close-search').removeClass('active');
			$('#fefm-file-dir-search').val('');

			// Reset browsing model.
			fefm.browsingProps.set({
				search_keywords: '',
				sort_by: fileCollection.sort_by,
				sort_dir: fileCollection.sort_dir
			});
			if ( ! _page ) {
				_page = 1;
			}
			fefm.browsingProps.set({page: _page});
			fileView.list_files( fefm.browsingProps.attributes );
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

		fileCollection.add(__file, {
			fefm_method: 'prepend'
		});

		setTimeout(function(){
			$( '#'+f.id ).remove();
		}, 2000);


  	});


});