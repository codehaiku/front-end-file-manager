<?php
/**
 * This file is part of the fontend_file_manager WordPress Plugin package.
 *
 * (c) Dunhakdis SC. <joseph@useissuestabinstead.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @package fontend_file_manager/src/install
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

global $fontend_file_manager_db_version;
global $wpdb;

register_activation_hook( __FILE__, 'fontend_file_manager_install' );
register_activation_hook( __FILE__, 'fontend_file_manager_install_data' );
add_action( 'plugins_loaded', 'fontend_file_manager_update_db_check' );

/**
 * Checks for database table updates.
 * @return void
 */
function fontend_file_manager_update_db_check() {
	global $fontend_file_manager_db_version;
	if ( get_site_option( 'fontend_file_manager_db_version' ) !== $fontend_file_manager_db_version ) {
		fontend_file_manager_install();
	}
	return;
}

$fontend_file_manager_db_version = '0.0.5';

/**
 * Actually installs the tables needed.
 * @return void
 */
function fontend_file_manager_install() {

	global $wpdb;

	global $fontend_file_manager_db_version;

	$installed_ver = get_option( 'fontend_file_manager_db_version' );

	if ( $installed_ver !== $fontend_file_manager_db_version ) {

		$table_name = $wpdb->prefix . 'frontend_file_manager';

		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
			id 	mediumint(9) NOT NULL AUTO_INCREMENT,
			file_owner_id mediumint(9),
			file_name varchar(255),
			file_label varchar(255),
			file_type varchar(25),
			file_description text,
			file_sharing_type varchar(255),
			date_updated datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			date_created datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			PRIMARY KEY  (id)
		) $charset_collate;";

		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		dbDelta( $sql );

		add_option( 'fontend_file_manager_db_version', $fontend_file_manager_db_version );
	}
	return;
}
