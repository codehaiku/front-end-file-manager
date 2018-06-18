<?php

namespace FrontendFileManager\Src\File;

final class Enqueue {

	public function __construct() {

		add_action( 'wp_enqueue_scripts', array($this, 'register') );

	}

	public function register() 
	{
		wp_register_script( 'frontend-filemanager', plugins_url() . '/front-end-file-manager/public/front-end-file-manager.js', array('jquery','plupload'), 1.0, true );

		wp_localize_script( 'frontend-filemanager', 'frontend_filemanager', array(
			'rest_url' => rest_url('frontend-filemanager/v1/'),
			'nonce' => wp_create_nonce( 'wp_rest' )
		));
	}

}

new Enqueue;