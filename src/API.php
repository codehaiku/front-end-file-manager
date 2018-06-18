<?php
namespace FrontendFileManager\Src\File;

final class Api {

	public function __construct() {
		
		
		add_action( 'rest_api_init', function () {
		  register_rest_route( 'frontend-filemanager/v1', '/list', array(
		    'methods' => 'GET',
		    'callback' => array( $this, 'list' ),
		  ));
		});


		add_action( 'rest_api_init', function () {
		  register_rest_route( 'frontend-filemanager/v1', '/upload', array(
		    'methods' => 'POST',
		    'callback' => array( $this, 'upload' ),
		  ));
		});
	}

	public function upload() {
		
		$data = array();

		add_filter( 'upload_dir', array( $this, 'set_upload_dir' ) );

		if ( ! function_exists( 'wp_handle_upload' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/file.php' );
		}

		$uploadedfile = $_FILES['file'];

		$upload_overrides = array( 'test_form' => false );

		$movefile = wp_handle_upload( $uploadedfile, $upload_overrides );

		if ( $movefile && ! isset( $movefile['error'] ) ) {
		    
		    $file = new File();

		    $file->setFileOwnerId(get_current_user_id());
		    $file->setFileName('test.jpg');
		    $file->setFileType( $movefile['type'] );
		    $file->setFileDescription('');
		    $file->setFileSharingType('private');
		    $file->setDateUpdated( current_time('mysql', 1) );
		    $file->setDateCreated( current_time('mysql', 1) );

		    $file_crud = new FileCrud( $file );

		    $file_crud->save($file);

		} else {
		    /**
		     * Error generated by _wp_handle_upload()
		     * @see _wp_handle_upload() in wp-admin/includes/file.php
		     */
		    echo $movefile['error'];
		}
		
		return new \WP_REST_Response($data);

	}

	public function list() {
		global $wpdb;
		
		$stmt = $wpdb->prepare("SELECT * FROM {$wpdb->prefix}frontend_file_manager WHERE file_owner_id = %d" , get_current_user_id());
		
		$results = $wpdb->get_results( $stmt, OBJECT );

		$response = array();

		if ( empty ( $results ) ) {
			$response = array(
					'message' => 'error_unauthorized'
				);
		} else {
			$response = array(
				'message' => 'success',
				'files' => $results
			);
		}

		return new \WP_REST_Response($response);
	}

	public function set_upload_dir( $dirs ) {

		$user_id = get_current_user_id();

		$upload_dir = apply_filters( 'frontend-filemanager-upload-dir',
		sprintf( 'frontend-filemanager/%d/', $user_id ) );

	    $dirs['subdir'] = $upload_dir;
	    $dirs['path'] = trailingslashit( $dirs['basedir'] ) . $upload_dir;
	    $dirs['url'] = trailingslashit( $dirs['baseurl'] ) . $upload_dir;

	    return $dirs;

	}

	public function __destruct() {
		
		remove_filter( 'upload_dir', array( $this, 'set_upload_dir' ) );

	}

}

new Api;