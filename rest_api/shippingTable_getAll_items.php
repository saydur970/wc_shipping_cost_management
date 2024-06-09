<?php

namespace SHBDHCST2\Rest_Api;

function shippingTable_getAll_items(){

  try {

    $shippingTable = new \SHBDHCST2\Include\Custom_Table\Shipping_Table();


    $item_res = $shippingTable->get_all_items();

    if(!isset($item_res)) {
      throw new \Exception('Failed to get items');
    }


    return new \WP_REST_Response($item_res, 200);

  } 
  catch (\Exception $e) {
    return new \WP_Error(
      'rest_forbidden',
      $e->getMessage(),
      array('status' => 404)
    );
  }
}