<div id="fefm-wrap">
	<ul id="fefm-controls">
		<li><a class="fefm-controls-btn" id="fefm-controls-btn-uploaded" href="#">Upload</a></li>
		<li><a class="fefm-controls-btn fefm-controls-btn-link" href="#">New Folder</a></li>
	</ul>

	<ul id="fefm-uploader-file-list"></ul>

	<ul id="fefm-navigation">
		<li>
			<img width="24" src="<?php echo plugins_url();?>/front-end-file-manager/public/images/file-type-icons/folder-open.svg">
		</li>
	</ul>
	<ul id="fefm-wrap-ul">
	</ul>
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