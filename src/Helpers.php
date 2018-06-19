<?php
namespace FrontendFileManager\Src\File;

final class Helpers {

	const UPLOADS_DIR_ROOT = "frontend-filemanager";

	public static function get_table_name() 
	{
		global $wpdb;
		return $wpdb->prefix . 'frontend_file_manager';
	}

	public static function get_user_upload_dir() {
		
		$user_id = get_current_user_id();

		$uploads_dir = wp_upload_dir();
		
		$user_upload_dir = $uploads_dir['basedir'] . '/' . trailingslashit( self::UPLOADS_DIR_ROOT ) . $user_id;
		
		return trailingslashit( $user_upload_dir );

	}

	public static function get_user_file_path( $file_id ) 
	{

		global $wpdb;

		$user_id = get_current_user_id();
		
		$stmt = $wpdb->prepare( "SELECT * FROM ".self::get_table_name()." WHERE id = %d AND file_owner_id = %d", $file_id, $user_id );
		
		$result = $wpdb->get_row( $stmt );

		if ( ! empty ( $result ) ) {

			echo $file_path = self::get_user_upload_dir() . $result->file_name;

			if ( file_exists( $file_path ) ) {
				return $file_path;
			}
			
		}

		return false;
	}
}