<?php
namespace FrontendFileManager\Src\File;

class FileCrud {

	public function fetch ( $file_id ) {

		global $wpdb;
		
		require_once FEFM_DIR . '/src/Helpers.php';

		$table_name = Helpers::get_table_name();
		
		$stmt = $wpdb->prepare("SELECT * FROM {$table_name} WHERE id = %d", $file_id);

		return $wpdb->get_row($stmt, OBJECT);

	}

	public function save( File $file ){
		
		global $wpdb;

		$inserted = $wpdb->insert(
			$wpdb->prefix . 'frontend_file_manager',
			array(
				'file_owner_id' => $file->getFileOwnerId(),
				'file_name' => $file->getFileName(),
				'file_label' => $file->getFileLabel(),
				'file_type' => $file->getFileType(),
				'file_description' => $file->getFileDescription(),
				'file_sharing_type' => $file->getFileSharingType(),
				'date_updated' => $file->getDateUpdated(),
				'date_created' => $file->getDateCreated(),
			),
			array(
				'%d',
				'%s',
				'%s',
				'%s',
				'%s',
				'%s',
				'%s',
			)
		);

		if ( $inserted ) {
			return $wpdb->insert_id;
		}
		return false;
	}
}