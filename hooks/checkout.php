<?php

namespace SHBDHCST2\Hooks;

class Checkout {

  private static $instance = null;
  private $inc_checkout;
  private $inc_order;

  private function __construct() {

    $this->inc_checkout = new \SHBDHCST2\Include\Checkout();
    $this->inc_order = new \SHBDHCST2\Include\Order();

    add_filter(
      'woocommerce_checkout_fields', 
      array($this->inc_checkout, 'modify_checkout_form')
    );

    add_action('woocommerce_after_checkout_billing_form', array($this, 'checkout_react'));

    add_action(
      'woocommerce_review_order_before_payment', // total price
      array($this, 'add_total_price_div')
    );


    add_action(
      'woocommerce_checkout_create_order', 
      array($this->inc_order, 'handle_shipping_on_order'), 
      20, 2
    );

    add_action(
      'woocommerce_admin_order_data_after_shipping_address', 
      array($this->inc_order, 'admin_dashboard_shipping_area_ui'), 
    );

  }

  public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

  public function checkout_react() {
    require_once(SHBDHCST2_ROOTPATH."templates/checkout.php");
  }

  public function add_total_price_div() {
    echo '<div id="shbdhcst2_total_calculated_price" class="custom-div"></div>';
  }


}



