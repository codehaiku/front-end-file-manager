<?php

namespace FrontendFileManager\Src\File;

final class Enqueue {

	public function __construct() {

		add_action( 'wp_enqueue_scripts', array($this, 'register') );

	}

	public function register() 
	{
		wp_register_script( 'frontend-filemanager', plugins_url() . '/front-end-file-manager/public/front-end-file-manager.js', array('jquery','plupload'), 1.0, true );

		wp_register_script( 'perfect-scrollbar', plugins_url() . '/front-end-file-manager/public/perfect-scrollbar.min.js',
		 array(), 1.0, true );

		wp_register_style( 'perfect-scrollbar-css', plugins_url() . '/front-end-file-manager/public/css/perfect-scrollbar.css', array() );

		wp_register_style( 'frontend-filemanager-style', plugins_url() . '/front-end-file-manager/public/css/front-end-file-manager.css', array() );

		wp_localize_script( 'frontend-filemanager', 'frontend_filemanager', array(
			'rest_url' => rest_url('frontend-filemanager/v1/'),
			'nonce' => wp_create_nonce( 'wp_rest' ),
			'asset_uri' => trailingslashit(plugins_url()). 'front-end-file-manager/public/images/'
		));
	}

}

new Enqueue;