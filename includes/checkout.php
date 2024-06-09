<?php

namespace SHBDHCST2\Include;

class Checkout {


  public function __construct(){
  }

  // ================== modify checkout form ==================
  public function modify_checkout_form($fields) {

    // set required
    $fields['billing']['billing_phone']['required'] = true;
    $fields['billing']['billing_address_1']['required'] = true;

    $fields['billing']['billing_city']['required'] = false;
    $fields['billing']['billing_last_name']['required'] = false;
    $fields['billing']['billing_email']['required'] = false;
    $fields['billing']['billing_country']['required'] = false;
    $fields['billing']['billing_address_2']['required'] = false;
    $fields['billing']['billing_state']['required'] = false;
    $fields['billing']['billing_postcode']['required'] = false;

    // remove fileds
    unset($fields['billing']['billing_last_name']);
    unset($fields['billing']['billing_email']);
    unset($fields['billing']['billing_company']);
    unset($fields['billing']['billing_country']);
    unset($fields['billing']['billing_address_2']);
    unset( $fields[ 'billing' ][ 'billing_city' ] );
    unset($fields['billing']['billing_state']);
    unset($fields['billing']['billing_postcode']);

    // change label
    $fields['billing']['billing_first_name']['label'] = 'Your Name';


    $fields['billing'][ 'shbdhcst2_area_id' ]   = array(
      'label'        => 'Shipping Area ID',
      'required'     => true,
      'class'        => array( 'form-row-wide', 'hide_field' ), // hide_field
      'priority'     => 200,
      'placeholder'  => '',
    );


    // add classes
    $fields['billing']['billing_first_name']['class'] = ['form-row-wide'];
    array_push($fields[ 'billing' ][ 'billing_address_1' ][ 'class' ], 'hide_field');

    // add id
    $fields['billing']['billing_address_1']['id'] = 'inputShippingAddress';
    $fields['billing']['shbdhcst2_area_id']['id'] = 'inputShippingAreaId';


    return $fields;
  }

}

