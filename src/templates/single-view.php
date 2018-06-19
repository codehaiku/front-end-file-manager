<a href="#list">&larr; Back to list</a>

<form>
	<div class="form-group">
		<label for="fefm-form-file-label"><?php esc_html_e('File Label', 'front-end-file-manager'); ?></label>
		<input type="text" class="form-control" id="fefm-form-file-label" value="<%=file_label%>">
	</div>

	<div class="form-group">
		<label for="exampleInputPassword1"><?php esc_html_e('File Description', 'front-end-file-manager'); ?></label>
		<textarea class="form-control"><%=file_description%></textarea>
		<p class="help-block">
			<?php esc_html_e('Describe what this file is all about', 'front-end-file-manager'); ?>
		</p>
	</div>

	<button type="submit" class="btn btn-primary">
		<?php esc_html_e('Submit', 'front-end-file-manager'); ?>
	</button>
</form>