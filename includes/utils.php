<?php

namespace SHBDHCST2\Include;

class Utils {

  function __construct() {

  }

  public static function convert_weight_in_kg(float $weight) {

    $weight_unit = get_option('woocommerce_weight_unit');

    // set default in kg
    if(!$weight_unit) {
      $weight_unit = 'kg';
    }

    $rates = array(
      'kg' => 1,
      'g' => 0.001,
      'lbs' => 0.453592,
      'oz' => 0.0283495
    );

    $converted_weights = $weight * $rates[$weight_unit];

    return $converted_weights;

  }


  public static function is_integer($num) {

    if(!isset($num) || !is_numeric($num)) {
      return false;
    }

    if (is_string($num) && ctype_digit($num)) {
      return true;
    } 

    if(!is_int($num)) {
      return false;
    }
     
    return true;
  }
  

  public static function restrict_to_admin() {
    return current_user_can('manage_options');
  }

}