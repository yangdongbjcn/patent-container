<?php

/**
 * 容器数据结构，二维矩阵
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_mat {
    private $CI;

    private $rows;
    private $cols;

    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd_list');

        $this->rows = array();
        $this->cols = array();

        log_message('debug', 'YdbjMatrix Class Initialized');
    }

    // 输入
    public function init($rows) {
        $this->rows = $rows;
        return $this;
    }
    public function initCols($cols) {
        $this->rows = $cols;
        $this->rows = $this->Transpose();
        $this->cols = $cols;
        return $this;
    }
    public function merge($new_rows) {
        $this->rows = array_merge($this->rows, $new_rows);
        return $this;
    }
    public function push($new_item) {
        array_push($this->rows, $new_item);
        return $this;
    }
    public function pushCol($col) {
        foreach($this->rows as $i => &$row){
            $item = $col[$i];
            $row[] = $item;
        }
        return $this;
    }
    public function unshift($new_item) {
        $this->rows = array_unshift($this->rows, $new_item);
        return $this;
    }
    

    // 输出
    public function get() {
        return $this->rows;
    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        return count($this->rows);
    }
    public function len2() {
        return count($this->rows[0]);
    }
    public function getRow($row_num) {
        return $this->rows[$row_num];
    }
    public function getSomeRows($keys) {
        $new_rows = array();
        for($i = 0; $i < count($keys); $i++) {
            $key = $keys[$i];
            $row = $this->rows[$key];
            array_push($new_rows, $row);
        }
        return $new_rows;
    }
    public function getCol($col_num) {
        $col = array();
        foreach($this->rows as $i => $row){
            $item = $row[$col_num];
            array_push($col, $item);
        }
        return $col;
    }
    public function getSomeCols($col_num_array) {
      //未验证
      $new_rows = array();
      for($i=0; $i< $this->len(); $i++) {
          $row = $this->getRow($i);
          $new_row = $this->CI->yd_lib->init($row).getSomeValues($col_num_array);
          array_push($new_rows, $new_row);
      }
      return $new_rows;
    }
    public function getCols() {
        if(!$this->cols){
            $this->Transpose();    
        }        
        return $this->cols;
    }
    public function Transpose() {
        $this->cols = tf_mat_transpose($this->rows);
        return $this;
    }

    // 改变
    public function iterFunc($func_name){
        $this->rows = array_map($func_name, $this->rows);
        return $this;
    }
    public function filterFunc($func_name){
        $this->rows = array_filter($this->rows, $func_name);
        return $this;
    }
    public function filterValue($col_num, $value_array){
        
        
        return $this;
    }
    public function cloneRow($row_num) {

    }
    public function cloneCol($col_num) {

    }
    public function pop() {
        array_pop($this->rows);
        return $this;
    }
    public function shift() {
        array_shift($this->rows);
        return $this;
    }
    public function slice($start, $length) {
        $this->rows = array_slice($this->rows,$start,$length);
        return $this;
    }
    public function reverse() {
        $this->rows = array_reverse($this->rows);
        return $this;
    }
    public function reIndex($re_index) {
        
        return $this;
    }
    public function trunc($len) {
        
        return $this;
    }

    // 排序
    public function sortIndex() {
        asort($this->rows);
        return $this;
    }
    public function getSortIndex() {
        
    }
    
    // 数字
    public function toNumber() {
        for ($i = 0; $i < $this->len(); $i++) {
            $this->rows[$i] = floatval($this->rows[$i]);
        }
        return $this;
    }
    public function max() {
        return max($this->rows);
    }
    public function min() {
        return min($this->rows);
    }
    public function sum() {
        $sum = 0;
        foreach ($this->rows as $i => $row) {
            $sum = $sum + array_sum($row);
        }
        return $sum;
    }
    public function average() {
        $average = $this->sum() / $this->len() / $this->len2();
        return $average;
    }

    // 转换输出
    // clone function 不必 PHP 值复制，而非引用复制
    public function complete($default_value) {
        
    }
    public function toDict($key_col_num, $value_col_num) {
        
    }
    public function toDataPivot($key_col_num, $value_col_num) {
        
    }
    public function toJsonRows($keys) {
        
    }
    public function toString($sep) {
        
    }
}    
 

function tf_mat_transpose($rows) {
    $cols = array();
    $col_num = tf_mat_get_colnum($rows);
    for($i=0; $i<$col_num; $i++) {
        $col = array();
        array_push($cols, $col);
    }
    for($i=0; $i<count($rows); $i++) {
        $row = $rows[$i];
        for($j=0; $j<count($row); $j++) {
            $item = $row[$j];
            $cols[$j][$i] = $item;
        }
    }   
    return $cols;
}

function tf_mat_get_colnum($rows) {
    $row = $rows[0];
    $col_num = count($row);
    return $col_num;
}

?>
