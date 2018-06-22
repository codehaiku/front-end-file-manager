<?php

namespace FrontEndFileManager\Src\File;

class Shortcode {

	public function __construct() {

		add_shortcode( 'frontend_file_manager', array( $this, 'frontend_file_manager' ) );

	}

	public function frontend_file_manager() 
	{

		wp_enqueue_style('frontend-filemanager-style');
		wp_enqueue_script('frontend-filemanager');

		wp_enqueue_script('perfect-scrollbar');
		wp_enqueue_style('perfect-scrollbar-css');

		ob_start();

		require_once trailingslashit( FEFM_DIR ) . 'src/templates/index-loop.php';

		return ob_get_clean();
	}

}

new Shortcode();