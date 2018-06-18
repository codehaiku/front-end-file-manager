<?php
/**
 * Plugin Name: Front End File Manager
 * Plugin URI: https://dunhakdis.com
 * Description: A WordPress collaboration tool or app for managing files across your site. Enables you and your users to create directories, and upload files - all in front end
 * Version: 1.0.0
 * Author: Dunhakdis
 * Author URI: http://themeforest.net/user/dunhakdis
 * License: GPL2
 */

add_action('init', 'frontend_file_manager_loader');

define( 'FEFM_VERSION', 1.0 );
define( 'FEFM_DIR', __DIR__);

require_once FEFM_DIR . '/src/Install.php';

function frontend_file_manager_loader() {
	require_once FEFM_DIR . '/src/Enqueue.php';
	require_once FEFM_DIR . '/src/API.php';
	require_once FEFM_DIR . '/src/File.php';
	require_once FEFM_DIR . '/src/FileCrud.php';
	require_once FEFM_DIR . '/src/Shortcodes.php';
}

