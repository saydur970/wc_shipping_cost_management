<?php

// $utils_cls = new SHBDHCST2\Include\Utils();

$cart = WC()->cart->get_cart();

$total_weight = 0;

foreach ( $cart as  $cart_item ) {

  $product = $cart_item['data'];

  $quantity = $cart_item['quantity'];
  $weight = $product->get_weight();


  if(!$quantity || !$weight) continue;

  $total_weight = $total_weight + ((int)$quantity * (int)$weight);

}

// $total_weight = $utils_cls->convert_weight_in_kg($total_weight);
$total_weight = SHBDHCST2\Include\Utils::convert_weight_in_kg($total_weight);
$total_price = floatval(WC()->cart->get_total('edit'));
?>

<div id="react_root"></div>
<div style="display: none;" id="SHBDHCST2_cart_clc_weight"> <?php echo $total_weight; ?> </div>
<div style="display: none;" id="SHBDHCST2_cart_clc_price"> <?php echo $total_price; ?> </div>