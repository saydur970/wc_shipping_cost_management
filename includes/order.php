<?php

namespace SHBDHCST2\Include;

use Exception;

class Order {

  private Custom_Table\Shipping_Table $shipping_table;
  private string $meta_shipping_address;

  public function __construct(){

    $this->shipping_table = new Custom_Table\Shipping_Table();
    $this->meta_shipping_address = 'shbdhcst2_shipping_area';


  }

  // ================== add shipping data on the order ==================
  public function handle_shipping_on_order($order, $shippingData) {
    try {

      $current_total = $order->get_total();

      $items = $order->get_items();

      $total_weight = 0;

      foreach ($items as $item_id => $item) {

        $product = $item->get_product();

        $weight = $product->get_weight();
        $quantity = $item->get_quantity();

        if(!$quantity || !$weight) continue;

        $total_weight = $total_weight + ((int)$quantity * (int)$weight);

      }

      $total_weight = Utils::convert_weight_in_kg($total_weight);

      // set min total_weight is 1 kg
      if($total_weight < 1) {
        $total_weight = 1;
      }

      // get shipping area
      if(
        !isset($shippingData['shbdhcst2_area_id']) ||
        !Utils::is_integer($shippingData['shbdhcst2_area_id'])
      ) {
        throw new Exception('Invalid area id');
      }

      $shippingArea = $this->shipping_table->get_one_by_id($shippingData['shbdhcst2_area_id']);

      if(!$shippingArea) {
        throw new Exception('Area not found');
      }

      $shipping_cost = (int)($shippingArea['cost']) * $total_weight;

      $new_total = $current_total + $shipping_cost;


      $order_shipping_data = [
        'district' => $shippingArea['district'],
        'police_station' => $shippingArea['police_station'],
        'area' => $shippingArea['area'],
        'total_weight' => $total_weight,
        'total_cost' => $shipping_cost,
      ];

      $order->set_shipping_total($shipping_cost);

      $order->set_total($new_total);

      $order->update_meta_data(
        $this->meta_shipping_address,
        json_encode($order_shipping_data)
      );

      $order->set_shipping_address_1($shippingData['billing_address_1']);

      $order->save();

    }
    catch(Exception $e) {

    }
  }



  public function admin_dashboard_shipping_area_ui($order) {

    if (!$order) return null;

    $order_id = $order->get_id();

    if (!$order_id) return null;


    $shipping_html = "";

    // check order is already booked
    // $saved_data = get_post_meta(
    //   $order_id, 
    //   $this->meta_shipping_address, 
    //   true
    // );

    $saved_data = $order->get_meta($this->meta_shipping_address, true);

    if($saved_data) {

      $saved_data = json_decode($saved_data, false);

      $shipping_html = "
        <p> City: $saved_data->district </p>
        <p> Postal Code: $saved_data->police_station </p>
        <p> Street: $saved_data->area </p>
        <p> Total weight: $saved_data->total_weight KG </p>
        <p> Cost: $saved_data->total_cost € </p>
      ";

      $shipping_html = "
        <div>
          $shipping_html
        </div>
      ";

    }

    echo $shipping_html;


  }


}

