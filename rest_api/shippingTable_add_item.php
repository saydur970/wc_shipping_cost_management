<?php

namespace SHBDHCST2\Rest_Api;

function shippingTable_add_item($data){

  try {

    $shippingTable = new \SHBDHCST2\Include\Custom_Table\Shipping_Table();

    
    // check admin
    if (!\SHBDHCST2\Include\Utils::restrict_to_admin()) {
      throw new \Exception('You do not have permission to access this endpoint');
    }


    $req_body = $data->get_params();

    // validate input
    if(
      !isset($req_body['policeStation']) || empty($req_body['policeStation']) ||
      !isset($req_body['area']) || empty($req_body['area']) ||
      !isset($req_body['cost']) ||
      !\SHBDHCST2\Include\Utils::is_integer($req_body['cost']) ||
      (int)($req_body['cost']) < 0
    ) {
      throw new \Exception('Invalid data');
    }


    $insert_res = $shippingTable->add_item(
      $req_body['policeStation'],
      $req_body['area'],
      $req_body['cost']
    );

    if(!$insert_res) {
      throw new \Exception('Failed to insert Item');
    }


    return new \WP_REST_Response(array('status' => 'success'), 200);

  } 
  catch (\Exception $e) {
    return new \WP_Error(
      'rest_forbidden',
      $e->getMessage(),
      array('status' => 404)
    );
  }
}