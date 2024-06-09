<?php

/**
 * Plugin Name: Shipping Cost Controller
 * Description: Control Shipping price on WC order
 * Version: 2.2.0
 */

if (!defined('ABSPATH')) {
	exit;
}


define('SHBDHCST2_ROOTPATH', plugin_dir_path(__FILE__));
define('SHBDHCST2_ROOTURL', plugin_dir_url(__FILE__));
define('SHBDHCST2_FILE', __FILE__);

// hooks
require_once(SHBDHCST2_ROOTPATH."hooks/init.php");
require_once(SHBDHCST2_ROOTPATH."hooks/checkout.php");


// includes
require_once(SHBDHCST2_ROOTPATH."includes/utils.php");
require_once(SHBDHCST2_ROOTPATH."includes/checkout.php");
require_once(SHBDHCST2_ROOTPATH."includes/order.php");

// includes/custom_table
require_once(SHBDHCST2_ROOTPATH."includes/custom_table/shipping_table.php");

// rest api
require_once(SHBDHCST2_ROOTPATH."rest_api/shippingTable_add_item.php");
require_once(SHBDHCST2_ROOTPATH."rest_api/shippingTable_getAll_items.php");
require_once(SHBDHCST2_ROOTPATH."rest_api/shippingTable_deleteOne_item.php");


// loader
require(SHBDHCST2_ROOTPATH."plugin_loader.php");
