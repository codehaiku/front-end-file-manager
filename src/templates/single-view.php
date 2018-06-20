<a href="#list">&larr; Back to list</a>

<form id="fefm-update-file" method="post" multipart="form/data" 
action="<?php echo esc_url( rest_url('frontend-filemanager/v1/update') ); ?>">

	<div class="form-group">
		<label for="fefm-form-file-label"><?php esc_html_e('Label', 'front-end-file-manager'); ?></label>
		<input autocomplete="off" type="text" class="form-control" id="fefm-form-file-label" name="file_label" value="<%=file_label%>">
		<input type="hidden" name="id" value="<%=id%>">
	</div>

	<div class="form-group">
		<label for="file_description"><?php esc_html_e('Description', 'front-end-file-manager'); ?></label>
		<textarea id="file_description" name="file_description" class="form-control"><%=file_description%></textarea>
		<p class="help-block">
			<?php esc_html_e('Describe what this file is all about', 'front-end-file-manager'); ?>
		</p>
	</div>
	<div class="form-group">
		<label for="file_sharing_type"><?php esc_html_e('Sharing Type', 'front-end-file-manager'); ?></label>
		<select class="form-control" name="file_sharing_type">

			<option <%=('private' === file_sharing_type) ? 'selected': ''%> value="private"><?php esc_html_e('Private', 'front-end-file-manager'); ?></option>
			<option <%=('public' === file_sharing_type) ? 'selected': ''%> value="public"><?php esc_html_e('Public', 'front-end-file-manager'); ?></option>
		</select>
		<p class="help-block">
			<?php esc_html_e('Select the type of privacy for this file', 'front-end-file-manager'); ?>
		</p>
	</div>

	<button type="submit" class="btn btn-primary">
		<?php esc_html_e('Submit', 'front-end-file-manager'); ?>
	</button>
</form>