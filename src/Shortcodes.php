<?php

namespace FrontEndFileManager\Src\File;

class Shortcode {

	public function __construct() {

		add_shortcode( 'frontend_file_manager', array( $this, 'frontend_file_manager' ) );

	}

	public function frontend_file_manager() {
		wp_enqueue_script('frontend-filemanager');
		require trailingslashit( FEFM_DIR ) . 'src/templates/index-loop.php';

	}

}

new Shortcode();