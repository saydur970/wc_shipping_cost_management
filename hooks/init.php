<?php

namespace SHBDHCST2\Hooks;

use Exception;

class Init
{

  private static $instance = null;

  private $shipping_table;
  private $admin_dashboard_url;

  private function __construct()
  {

    $this->admin_dashboard_url = 'SHBDHCST2_shipping_cost_dashboard_page';

    $this->shipping_table = new \SHBDHCST2\Include\Custom_Table\Shipping_Table();

    register_activation_hook(
      SHBDHCST2_FILE,
      array($this, 'activation_handler')
    );

    add_action('wp_enqueue_scripts', array($this, 'user_loadScripts'));
    add_action('admin_enqueue_scripts', array($this, 'admin_loadScripts'));

    add_filter('template_include', array($this, 'loadTemplate'));

    add_action('admin_menu', array($this, 'adminPage'));

    add_action('rest_api_init', array($this, 'define_rest_api'));
  }

  public static function get_instance()
  {
    if (!isset(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  // ================== activation functions ==================
  public function activation_handler()
  {

    // create wc checkout page
    $this->create_wc_checkout_page();

    // create shipping tables
    $this->shipping_table->create_table();
  }



  // ================== handle script files ==================
  public function user_loadScripts() {

    if (is_checkout()) {

      wp_enqueue_script(
        'checkout_client_script',
        SHBDHCST2_ROOTURL . 'build/client.js',
        array('wp-element')
      );

      wp_localize_script(
        'checkout_client_script',
        'php_var_list',
        array(
          // 'nonce' => wp_create_nonce('wp_rest'),
          'site_url' => site_url()
        )
      );

      wp_enqueue_style(
        'checkout_client_style',
        SHBDHCST2_ROOTURL . 'build/client.css',
      );

      wp_enqueue_style(
        'checkout_client_wpcss',
        SHBDHCST2_ROOTURL . 'assets/checkout_wp.css'
      );
    }
  }

  public function admin_loadScripts($hook) {

    // var_dump($hook);

    if ($hook === "toplevel_page_" . "$this->admin_dashboard_url") {

      wp_enqueue_script(
        'checkout_admin_script',
        SHBDHCST2_ROOTURL . 'build/admin.js',
        array('wp-element')
      );

      wp_enqueue_style(
        'checkout_admin_style',
        SHBDHCST2_ROOTURL . 'build/admin.css',
      );

      wp_localize_script(
        'checkout_admin_script',
        'php_var_list',
        array(
          'nonce' => wp_create_nonce('wp_rest'),
          'site_url' => site_url()
        )
      );
    }
  }


  // ================== handle templates ==================
  public function loadTemplate($template)
  {

    if (is_page('shipping_test')) {
      return  SHBDHCST2_ROOTPATH . 'templates/test.php';
    }

    return $template;
  }

  // ================== admin page ==================
  public function adminPage()
  {

    add_menu_page(
      'Shipping Cost Dashboard',
      'Shipping Cost',
      'manage_options',
      "$this->admin_dashboard_url",
      function () {
        require_once(SHBDHCST2_ROOTPATH . "templates/admin_dashboard.php");
      },
      'dashicons-airplane'
    );
  }



  // ================== define rest api ==================
  public function define_rest_api()
  {

    // insert one item
    register_rest_route('shippingTable', 'addItem', array(
      'methods' => 'POST',
      'callback' => '\SHBDHCST2\Rest_Api\shippingTable_add_item',
      'permission_callback' => array('\SHBDHCST2\Include\Utils', 'restrict_to_admin')
    ));


    // insert one item
    register_rest_route('shippingTable', 'getAll', array(
      'methods' => 'GET',
      'callback' => '\SHBDHCST2\Rest_Api\shippingTable_getAll_items',
    ));


    // delete one item
    register_rest_route('shippingTable', 'deleteItem', array(
      'methods' => 'DELETE',
      'callback' => '\SHBDHCST2\Rest_Api\shippingTable_deleteOne_item',
      'permission_callback' => array('\SHBDHCST2\Include\Utils', 'restrict_to_admin')
    ));
  }


  // ================== create wc checkout page ==================
  public function create_wc_checkout_page() {
    try {

      $page_title = 'Shipping';
      $page_content = '[woocommerce_checkout]';
      $page_check = get_page_by_title($page_title);

      $page_id = null;

      if ($page_check) {

        $update_page = array(
          'ID'           => $page_check->ID,
          'post_status'  => 'publish',
          // 'post_content'   => $page_content,
        );

        $page_id = wp_update_post($update_page);

        if (is_wp_error($page_id)) {
          throw new Exception('Failed to update page');
        }

      }
      else {

        $new_page = array(
          'post_title'     => $page_title,
          'post_content'   => $page_content,
          'post_status'    => 'publish',
          'post_author'    => 1,
          'post_type'      => 'page',
        );
  
        $page_id = wp_insert_post($new_page);

        if (is_wp_error($page_id)) {
          throw new Exception('Failed to create page');
        }
      }

      if(!$page_id) {
        throw new Exception('Failed to create checkout page');
      }

      update_option('woocommerce_checkout_page_id', $page_id);

    } 
    catch (Exception $err) {
      deactivate_plugins(plugin_basename(SHBDHCST2_FILE));
    }
  }
}
