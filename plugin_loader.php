<?php

namespace SHBDHCST2;

class Plugin_Loader {

  private static $instance = null;

  private function __construct() {
    $this->load_classes();
  }

  public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function load_classes() {
		Hooks\Init::get_instance();
		Hooks\Checkout::get_instance();
	}


}

Plugin_Loader::get_instance();