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

        log_message('debug', 'yd/Yd_dict Class Initialized');
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

    public function toSortByYear() {
        $year_arr = $this->getKeys();
        $num_arr = $this->getValues();
        $min_year = 3000;
        $max_year = 1000;

        for ($i=0; $i<count($year_arr); $i++) {
            $year = $year_arr[$i];
            if ($min_year > $year){
                $min_year = $year;
            }
            if ($max_year < $year){
                $max_year = $year;
            }
        }

        if ($min_year > $max_year) {
            echo 'error: min year > max year';
            return ;
        }

        $hist = array();
        for ($i=$min_year; $i<=$max_year; $i++) {
            $hist[$i] = 0;
        }

        for ($i=0; $i<count($year_arr); $i++) {
            $year = $year_arr[$i];
            $num = $num_arr[$i];

            $hist[$year] = $num;
        }
        $this->dict = $hist;
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
    

}
        
?>
