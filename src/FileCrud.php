<?php
namespace FrontendFileManager\Src\File;

class FileCrud {

	public function save( File $file ){
		
		global $wpdb;

		$wpdb->insert(
			$wpdb->prefix . 'frontend_file_manager',
			array(
				'file_owner_id' => $file->getFileOwnerId(),
				'file_name' => $file->getFileName(),
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
	}
}