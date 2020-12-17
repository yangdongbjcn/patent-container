<?php

/**
 * 容器数据结构，二维矩阵
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20200408
 */

class yd_dict {
    private $CI;

    private $dict;

    public function __construct() {
        $this->CI = & get_instance();

        $this->dict = array();

        log_message('debug', 'yd_dict Class Initialized');
    }

    // 输入
    public function init($dict) {
        $this->dict = $dict;
        return $this;
    }
    public function initKeysValues($keys, $values) {
        $this->dict = $this->CombineKeysValues($keys, $values);
        return $this;
    }
    public function CombineKeysValues($keys, $values) {
        $dict = array();
        for ($i = 0; $i < count($keys); $i++) {
            $key = $keys[$i];
            $value = $values[$i];
            $dict[$key] = $value;
        }
        return $dict;
    }
    public function initByHist($list) {
        $hist = array();
        for ($i=0; $i<count($list); $i++) {
            $item = $list[$i];
            $hist[$item] = 0;
        }
        for ($i=0; $i<count($list); $i++) {
            $item = $list[$i];
            $hist[$item] = $hist[$item] + 1;
        }
        $this->dict = $hist;
        return $this;
    }
    public function merge($new_dict){
          
        return $this;
    }
    public function push($new_key, $new_value) {
          
        return $this;
    }
    public function unshift($new_key, $new_value){
          
        return $this;
    }

    // 输出
    public function get() {
        return $this->dict;
    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        return count($this->dict);
    }
    public function getValue($key) {
        return $this->dict[$key];
    }
    public function getSomeValues($keys) {
        $new_list = array();
        for($i = 0; $i < count($keys); $i++) {
            $key = $keys[$i];
            $value = $this->dict[$key];
            array_push($new_list, $value);
        }
        return $new_list;
    }
    public function getKeys() {
        return array_keys($this->dict);
    }
    public function getValues() {
        return array_values($this->dict);
    }
    public function getPartDict($keys) {
        

    }

    // 判断
    public function has($value) {
        

    }
    public function hasKey($key) {
        

    }

    // 改变
    public function iterFunc($f_filter){


    }
    public function filterFunc($f_filter){


    }
    public function cloneItem($key) {
      

    }
    public function pop() {
      

    }
    public function shift() {
      

    }
    public function slice($p_start, $p_length) {
      

    }
    public function reverse() {
      

    }
    public function reIndex($p_index){


    }
    public function trunc($len) {
      

    }

    // 排序
    public function sortIndex() {
    

    }
    public function getSortIndex(){
    

    }
    public function getSortKeys(){
    

    }
    public function getSortValues(){
    

    }

    // 转换输出
    // clone function 不必 PHP 值复制，而非引用复制
    public function toGroup(){
        
        
    }

}
        
?>
