<?php

namespace SHBDHCST2\Rest_Api;

use Exception;

function shippingTable_deleteOne_item(\WP_REST_Request $request){

  try {


    // check admin
    if (!\SHBDHCST2\Include\Utils::restrict_to_admin()) {
      throw new \Exception('You do not have permission to access this endpoint');
    }

    $shippingTable = new \SHBDHCST2\Include\Custom_Table\Shipping_Table();

    $id = $request->get_param('id');

    if(
      !isset($id) || !$id ||
      !\SHBDHCST2\Include\Utils::is_integer($id) ||
      ((int)$id) < 0
    ) {
      throw new Exception('Invalid Item id');
    }


    $delete_res = $shippingTable->delete_one_by_id($id);

    if(!$delete_res) {
      throw new \Exception('Failed to delete item');
    }


    return new \WP_REST_Response([ 'message' => 'item deleted' ], 200);

  } 
  catch (\Exception $e) {
    return new \WP_Error(
      'rest_forbidden',
      $e->getMessage(),
      array('status' => 404)
    );
  }
}