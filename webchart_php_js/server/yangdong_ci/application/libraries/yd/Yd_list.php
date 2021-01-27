<?php

/**
 * 容器数据结构，二维矩阵
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20200408
 */

class yd_list {
    private $CI;

    private $list;

    public function __construct() {
        $this->CI = & get_instance();

        $this->dict = array();

        log_message('debug', 'yd/Yd_list Class Initialized');
    }

    // 输入
    public function init($list) {
        $this->list = $list;
        return $this;
    }
    public function init1N($len) {
        $this->list = array(); 
        for ($i = 0; $i < $len; $i++) {
          array_push($this->list, $i);
        }
        return $this;
    }
    public function initMN($m, $n) {
        
        
        return $this;
    }
    public function merge($new_list) {
        $this->list = array_merge($this->list, $new_list);
        return $this;
    }
    public function push($new_value) {
        array_push($this->list, $new_value);
        return $this;
    }
    public function unshift($new_value) {
        $this->list = array_unshift($this->list, $new_value);
        return $this;
    }

    // 输出
    public function get() {
        return $this->list;
    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        return count($this->list);
    }
    public function getValue($index) {
        return $this->list[$index];
    }
    public function getSomeValues($index_array) {
        $new_list = array();
        for($i = 0; $i < count($index_array); $i++) {
            $index = $index_array[$i];
            $value = $this->list[$index];
            array_push($new_list, $value);
        }
        return $new_list;
    }

    // 判断
    public function has($value){
        // 返回 键名 或 false
        return array_search($value, $this->list);
    }
    public function getIndexByValue($value){
        // 返回 键名 或 false
        return array_search($value, $this->list);
    }

    // 改变
    public function iterFunc($func_name){
        $this->list = array_map($func_name, $this->list);
        return $this;
    }
    public function filterFunc($func_name){
        $this->list = array_filter($this->list, $func_name);
        return $this;
    }
    public function filterValue($value_array){
        
        
        return $this;
    }
    public function deleteValue($value_array){
        
        
        return $this;
    }
    public function cloneItem($index) {

    }
    public function pop() {
        array_pop($this->list);
        return $this;
    }
    public function shift() {
        array_shift($this->list);
        return $this;
    }
    public function slice($start, $length) {
        $this->list = array_slice($this->list,$start,$length);
        return $this;
    }
    public function reverse() {
        $this->list = array_reverse($this->list);
        return $this;
    }
    public function flip() {
        $this->list = array_flip($this->list);
        return $this;
    }
    public function accum() {
        
        
        return $this;
    }
    public function reIndex($re_index) { // 1 4 3 2
        assert(count($re_index) == $this->len());
        $re_index_flip = array_flip($re_index); // 1 4 3 2 
        $old_list = $this->list;
        for ($i = 0; $i < $this->len(); $i++) {
            $re_i = $re_index_flip[$i];
            $old_item = $old_list[$re_i];
            array_push($this->list[$i], $old_item);
        }
        return $this;
    }
    public function trunc($len) {
        
        return $this;
    }
    public function format($format_string) {
        
        return $this;
    }

    // 排序
    public function sortIndex() {
        asort($this->list);
        return $this;
    }
    public function getSortIndex() {
        

    }
    
    // 数字
    public function toNumber() {
        for ($i = 0; $i < $this->len(); $i++) {
            $this->list[$i] = floatval($this->list[$i]);
        }
        return $this;
    }
    public function max() {
        return max($this->list);
    }
    public function min() {
        return min($this->list);
    }
    public function sum() {
        return array_sum($this->list);
    }
    public function average() {
        $average = $this->sum() / $this->len();
        return $average;
    }
    
    // 转换输出
    // clone function 不必 PHP 值复制，而非引用复制
    public function toDict($index_array) {
        if ($this->len() != count($index_array)) {
          return FALSE;
        }

        $dict = array();
        for ($i = 0; $i < $this->len(); $i++) {
          $index = $index_array[$i];
          $value = $this->list[$i];
          $dict[$index] = $value;
        }
        return $dict;
    }
    public function toString($sep=',') {
        return implode($sep, $this->list);
    }
    public function toStringLines() {
        $sep = "\r\n";  // PHP 单引号 双引号
        return implode($sep, $this->list);
    }
    public function unique(){
        return array_unique($this->list);
    }
    public function toHistogram($p_value){
        $p_input = $this->list;
        $t_length = count($p_value);
        $t_hist = array();
        for($i=0; $i<$t_length; $i++){
          $t_hist[$p_value[$i]] = 0;
        }
        for($i=0; $i<count($p_input); $i++){
          $item = $p_input[$i];
          $t_in = array_search($item, $p_value);
          if ($t_in) {
            $t_hist[$item] = $t_hist[$item] + 1;
          }
        }
        return $t_hist;
    }
    public function toGroup(){
        
        
    }
}
        
?>
