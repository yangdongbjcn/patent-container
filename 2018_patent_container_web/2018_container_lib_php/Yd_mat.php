<?php

/**
 * 容器数据结构，二维矩阵
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_mat {
    private $CI;

    private $lists;
    private $clists;

    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd/Yd_list');

        $this->lists = array();
        $this->clists = array();

        log_message('debug', 'yd/Yd_mat Class Initialized');
    }

    // 输入
    public function init($lists) {
        $this->lists = $lists;
        return $this;
    }
    public function merge($new_rows) {
        $this->lists = array_merge($this->lists, $new_rows);
        return $this;
    }
    public function push($new_item) {
        array_push($this->lists, $new_item);
        return $this;
    }
    public function pushClist($col) {
        foreach($this->lists as $i => &$row){
            $item = $col[$i];
            $row[] = $item;
        }
        return $this;
    }
    public function unshift($new_item) {
        $this->lists = array_unshift($this->lists, $new_item);
        return $this;
    }
    
    // 输出
    public function get() {
        return $this->lists;
    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        return count($this->lists);
    }
    public function len2() {
        return count($this->lists[0]);
    }
    public function getSomeLists($keys) {
        $new_rows = array();
        for($i = 0; $i < count($keys); $i++) {
            $key = $keys[$i];
            $row = $this->lists[$key];
            array_push($new_rows, $row);
        }
        return $new_rows;
    }
    public function getClist($col_num) {
        $col = array();
        foreach($this->lists as $i => $row){
            $item = $row[$col_num];
            array_push($col, $item);
        }
        return $col;
    }
    public function getSomeClists($keys) {
      //未验证
      $new_rows = array();
      for($i=0; $i< $this->len(); $i++) {
          $row = $this->lists[$i];
          $new_row = $this->CI->yd_lib->init($row).getSomeValues($col_num_array);
          array_push($new_rows, $new_row);
      }
      return $new_rows;
    }
    public function getTranspose() {
        $clists = tf_mat_transpose($this->lists);
        return $clists;
    }

    // 改变
    public function toIter($func_name){
        $this->lists = array_map($func_name, $this->lists);
        return $this;
    }
    public function toIterListFunc($func_name){
        
        return $this;
    }
    public function toIterClistFunc($func_name){
        
        return $this;
    }
    public function toFilterByFunc($func_name){
        $this->lists = array_filter($this->lists, $func_name);
        return $this;
    }

    public function cloneList($row_num) {

    }
    public function toCloneClist($col_num) {

    }
    public function pop() {
        array_pop($this->lists);
        return $this;
    }
    public function shift() {
        array_shift($this->lists);
        return $this;
    }
    public function slice($start, $length) {
        $this->lists = array_slice($this->lists,$start,$length);
        return $this;
    }
    public function reverse() {
        $this->lists = array_reverse($this->lists);
        return $this;
    }

    // 排序
    public function sortIndex() {
        asort($this->lists);
        return $this;
    }
    public function getSortIndex() {
        
    }
    
    // 数字
    public function toNumber() {
        for ($i = 0; $i < $this->len(); $i++) {
            $this->lists[$i] = floatval($this->lists[$i]);
        }
        return $this;
    }
    public function max() {
        return max($this->lists);
    }
    public function min() {
        return min($this->lists);
    }
    public function sum() {
        $sum = 0;
        foreach ($this->lists as $i => $row) {
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
    public function toCdict($key_col_num, $value_col_num) {
        
    }
    public function toDataPivot($key_col_num, $value_col_num) {
        
    }
    public function toDicts($keys) {
        
    }
    public function toString($sep) {
        
    }
    public function toGroup(){
        
        
    }
}    
 

function tf_mat_transpose($lists) {
    $clists = array();
    $col_num = tf_mat_get_colnum($lists);
    for($i=0; $i<$col_num; $i++) {
        $col = array();
        array_push($clists, $col);
    }
    for($i=0; $i<count($lists); $i++) {
        $row = $lists[$i];
        for($j=0; $j<count($row); $j++) {
            $item = $row[$j];
            $clists[$j][$i] = $item;
        }
    }   
    return $clists;
}

function tf_mat_get_colnum($lists) {
    $row = $lists[0];
    $col_num = count($row);
    return $col_num;
}

?>
