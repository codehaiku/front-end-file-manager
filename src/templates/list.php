<li class="file-item" id="fefm-file-<%=id%>">
	<div class="file-item-column file-thumb">
		<img width="24" src="<%=file_icon%>" />
	</div>
	<div class="file-item-column file-label">
		<a href="#file/<%=id%>" title="<%=file_label%>">
			<%=file_label%>
		</a>
	</div>
	<div class="file-item-column file-date-updated">
		<a href="#file/<%=id%>" title="<%=file_label%>">
			<%=date_updated%>
		</a>
	</div>
	<div class="file-item-column file-sharing-type">
		<a href="#file/<%=id%>" title="<%=file_label%>">
			<%=file_sharing_type%>
		</a>
	</div>
	<div class="file-item-column file-actions">
		<a href="#" class="file-item-column-file-actions-dropdown">
			<span class="fefm-action-label">Select Actions</span>
		</a>
		<ul class="file-item-column-file-actions-dropdown-ul inactive">
			<li><a href="#">Edit</a></li>
			<li><a href="#">Copy</a></li>
			<li><a href="#">Share</a></li>
			<li><a data-file-id="<%=id%>" class="fefm-item-file-trash" href="#">Trash</a></li>
			<li><a class="fefm-toolbar-close" href="#">Close Toolbar</a></li>
		</ul>
	</div>
</li>