<div id="fefm-wrap">

	<ul id="fefm-controls">
		<li><a class="fefm-controls-btn" id="fefm-controls-btn-uploaded" href="#">Upload</a></li>
		<li><a class="fefm-controls-btn fefm-controls-btn-link" href="#">New Folder</a></li>
	</ul>

	
	<ul id="fefm-uploader-file-list"></ul>

	<ul id="fefm-navigation">
		<li>
			<a href="#list" 
			title="<?php esc_html_e('Go back to root directory', 'front-end-file-manager'); ?>">
				<img width="16" src="<?php echo plugins_url();?>/front-end-file-manager/public/images/file-type-icons/folder-open.svg">
			</a>
		</li>

		<li class="fefm-bulk-actions">
			<a class="fefm-bulk-actions-item" href="#" id="js-fefm-trash-multiple-files" title="<?php esc_html_e('Delete selected files', 'front-end-file-manager'); ?>">	<img width="12" src="<?php echo plugins_url();?>/front-end-file-manager/public/images/file-type-icons/trash-alt.svg"> 
			</a>
			<a class="fefm-bulk-actions-item" href="#" id="js-fefm-copy-multiple-files" title="<?php esc_html_e('Copy selected files', 'front-end-file-manager'); ?>">
				<img width="12" src="<?php echo plugins_url();?>/front-end-file-manager/public/images/file-type-icons/copy.svg"> 
			</a>
			<a class="fefm-bulk-actions-item" href="#" id="js-fefm-share-multiple-files" title="<?php esc_html_e('Share selected files', 'front-end-file-manager'); ?>">
				<img width="16" src="<?php echo plugins_url();?>/front-end-file-manager/public/images/file-type-icons/share-square.svg"> 
			</a>
		</li>

		<li class="fefm-search-dir-wrap">
			<div class="fefm-search-dir-inner-wrap">
				<form action="" method="GET" id="fefm-search-form">
					<input type="search" autocomplete="off" name="fefm-file-dir-search" id="fefm-file-dir-search" 
						placeholder="<?php esc_html_e('Search', 'front-end-file-manager'); ?>">
				</form>
				<span id="fefm-search-close-search">&times;</span>
			</div>
		</li>
	</ul>

	<ul id="fefm-file-actions">
		<li class="file-actions-check-selector">
			<input type="checkbox" id="fefm-check-all-file" />
		</li>
		<li class="file-actions-check-title">
			<a href="#" class="fefm-action-sort" id="fefm-action-sort-by-title" data-sort-by="file_label">Title</a>
		</li>
		<li class="file-actions-check-last-modified">
			<a href="#" class="fefm-action-sort"  id="fefm-action-sort-by-updated" data-sort-by="date_updated">Last Modified</a>
		</li>
		<li class="file-actions-check-sharing-type">
			Sharing
		</li>
		<li class="file-actions-check-actions">
			Actions 
		</li>
	</ul>

	<div id="fefm-file-window">
		<ul id="fefm-wrap-ul">
		</ul>
	</div>

	<div id="fefm-preloader">
		<div id="fefm-preloader-wrap">
			<div id="fefm-preloader-inner-wrap">
				<p>
					<span id="fefm-loaded-icon"></span>
					<span id="fefm-message">Loading...</span>
				</p>
			</div>
		</div>
	</div>
</div>
<div id="fefm-single-view-wrap"></div>
<div id="fefm-pagination-wrap"></div>

<script id="fefm-single-view" type="text/template">
	<?php include_once trailingslashit( FEFM_DIR ) . 'src/templates/single-view.php'; ?>
</script>
<script id="fefm-single-file-template" type="text/template">
	<?php include_once trailingslashit( FEFM_DIR ) . 'src/templates/list.php'; ?>
</script>
<script id="fefm-pagination-template" type="text/template">
	<?php include_once trailingslashit( FEFM_DIR ) . 'src/templates/pagination.php'; ?>
</script>