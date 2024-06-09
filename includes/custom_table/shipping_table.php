<?php

namespace SHBDHCST2\Include\Custom_Table;

use Exception;

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');


class Shipping_Table {

  private string $table_name;
  private string $charset;

  function __construct() {

    global $wpdb;
    $this->table_name = $wpdb->prefix . "shbdhcst2_shipping_area";
    $this->charset = $wpdb->get_charset_collate();
    
  }


  public function create_table() {

    global $wpdb;

    dbDelta("
      CREATE TABLE IF NOT EXISTS  $this->table_name (

        id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        district varchar(50) NOT NULL,
        police_station varchar(50) NOT NULL,
        area varchar(50) NOT NULL,
        cost int NOT NULL,

        PRIMARY KEY  (id)
      ) 
      $this->charset;"
    );

    if ($wpdb->last_error) {
      // Log the error or handle it as needed
      error_log('Error creating table: ' . $wpdb->last_error);
    }

  }


  public function add_item($police_station, $area, $cost) {

    try {

      global $wpdb;
  
      // Validate and sanitize data
      $police_station = sanitize_text_field($police_station);
      $area = sanitize_text_field($area);
      $cost = intval($cost);
  
      $wpdb->insert(
        $this->table_name,
        array(
            'district' => 'Amsterdam',
            'police_station' => $police_station,
            'area' => $area,
            'cost' => $cost
        )
      );

      if ($wpdb->last_error) {
        throw new Exception('Failed to insert');
      }
  
      return true;

    }
    catch(Exception $e) {
      return false;
    }

  }


  public function get_all_items() {

    try {

      global $wpdb;

      $query = "
        SELECT
          police_station,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', id,
              'area', area,
              'cost', cost
            )
        ) AS list
        FROM $this->table_name
        GROUP BY police_station
      ";

      // $wpdb->prepare("SELECT * FROM {$this->table_name} WHERE age > %f", $min_age)
  
      $results = $wpdb->get_results(
        $wpdb->prepare($query)
      );


      if ($wpdb->last_error) {
        throw new Exception('Failed to insert');
      }

      $item_list = [];

      foreach($results as $item) {

        array_push($item_list, [
          'ps' => $item->police_station,
          'list' => json_decode($item->list, true)
        ]);

      }
  
      return $item_list;

    }
    catch(Exception $e) {
      return null;
    }

  }

  public function get_one_by_id($id) {

    try {

      global $wpdb;

      $id = intval($id);
  
      $result = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT * FROM {$this->table_name} WHERE id = %d", $id
        )
      );

      if(!$result) {
        throw new Exception('Failed to get Item');
      }

      if ($wpdb->last_error) {
        throw new Exception('Failed to get Item');
      }

      $result = json_decode(json_encode($result), true);


      return $result;

    }
    catch(Exception $e) {
      return false;
    }

  }


  public function delete_one_by_id($id) {

    try {

      global $wpdb;

      $id = intval($id);
  
      $wpdb->get_results(
        $wpdb->prepare(
          "DELETE FROM {$this->table_name} WHERE id = %d", $id
        )
      );

      if ($wpdb->last_error) {
        throw new Exception('Failed to get Item');
      }

      return true;

    }
    catch(Exception $e) {
      return false;
    }

  }


}