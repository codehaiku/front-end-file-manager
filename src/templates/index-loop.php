<div id="fefm-wrap">
	<ul id="fefm-controls">
		<li><a href="#"><input placeholder="Search files" type="search"></a></li>
		<li><a href="#">New Folder</a></li>
		<li><a href="#">Upload files to "Current Directory"</a></li>
	</ul>
	<ul id="fefm-navigation">
		<li>
			/<img width="24" src="<?php echo plugins_url();?>/front-end-file-manager/public/images/file-type-icons/folder-open.svg">
		</li>
	</ul>
	<ul id="fefm-wrap-ul">
	</ul>
</div>

<ul id="filelist"></ul>
<br />
 
<div id="container">
    <a id="browse" href="javascript:;">[Browse...]</a>
    <a id="start-upload" href="javascript:;">[Start Upload]</a>
</div>

<script id="fefm-single-file-template" type="text/template">
	<li class="file-item">
		<div class="file-item-column file-thumb">
			<img width="24" src="<%=file_icon%>" />
		</div>
		<div class="file-item-column file-label"><%=file_label%></div>
		<div class="file-item-column file-date-updated"><%=date_updated%></div>
		<div class="file-item-column file-sharing-type"><%=file_sharing_type%></div>
		<div class="file-item-column file-actions">
			<a href="#">Edit</a>
			<a data-file-id="<%=id%>" class="fefm-item-file-trash" href="#">Trash</a></div>
			<a href="#">Copy</a>
		</div>
	</li>
</script>