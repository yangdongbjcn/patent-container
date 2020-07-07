<?php

/**
 * 容器数据结构，二维框架
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_frame {
    private $CI;

    private $dict_rows;
    // private $dict_cols;
    private $index;
    private $keys;
    private $rows;

    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd_list');
        $this->CI->load->library('yd_mat');

        $this->dict_rows = array();
        // $this->dict_cols = array();
        $this->index = array();
        $this->keys = array();
        $this->rows = array();

        log_message('debug', 'YdbjFrame Class Initialized');
    }

    // 输入
    public function setIndex($index) {
        $this->index = $index;
        return $this;
    }
    public function initDictRows($dict_rows) {
        $index_num = count($dict_rows);
        $index = $this->CI->yd_list->init1N($index_num).get();

        $this->initDictRowsIndex($dict_rows, $index);

        return $this;
    }
    public function initDictRowsIndex($dict_rows, $index) {
        $this->dict_rows = $dict_rows;
        $this->keys = tf_get_keys_from_dict_rows($dict_rows);
        $this->rows = tf_get_rows_from_dict_rows($dict_rows);

        $this->index = $index;

        return $this;
    }
    public function initKeysRows($keys, $rows) {
        $this->keys = $keys;
        $this->rows = $rows;
        $this->dict_rows = tf_combine_keys_rows($keys, $rows);

        $index_num = count($dict_rows);
        $this->index = $this->CI->yd_list->init1N($index_num)->get();
        
        return $this;
    }
    public function initKeysRowsMat($mat) {
        // 默认第一行是keys，剩下的是rows
        $this->keys = array_slice($mat, 0, 1)[0];
        $this->rows = array_slice($mat, 1);
        $this->dict_rows = tf_combine_keys_rows($this->keys, $this->rows);

        $index_num = count($dict_rows);
        $this->index = $this->CI->yd_list->init1N($index_num).get();

        return $this;
    }
    public function initIndexKeysRows($index, $keys, $rows) {
        

        return $this;
    }  
    public function initIndexKeysRowsMat($mat) {
        // 默认第一列是index，第一行是keys，剩下的是rows
        $this->CI->load->library('yd_mat');
        // $cols = $this->CI->yd_mat->Transpose($mat);
        $cols = $this->CI->yd_mat->init($mat)->Transpose()->getCols();

        $this->index = array_shift($cols);
        array_shift($this->index);

        // $this->rows = $this->CI->yd_mat->Transpose($cols);
        $this->rows = $this->CI->yd_mat->init($cols)->Transpose()->getCols();
        
        $this->keys = array_shift($this->rows);
        return $this;
    }
    public function initKeysCols($keys, $cols) {
        $this->keys = $keys;

        $this->CI->load->library('yd_mat');
        $this->rows = $this->CI->yd_mat->init($cols)->Transpose()->getCols();

        $this->dict_rows = $this->GenDictRows($keys, $this->rows);

        $index_num = count($dict_rows);
        $this->index = $this->CI->yd_list->init1N($index_num).get();

        return $this;
    }
    public function initDictCols($dict_cols) {
        

        return $this;
    }  
    public function merge($new_frame) {
        

        return $this;
    }
    public function pushKeyCol($key, $col) {
        

        return $this;
    }
    public function pushKeyColOfSameValue($key, $value) {
        

        return $this;
    }
    public function pushIndexRow($new_index, $new_row) {
        

        return $this;
    }

    // 输出
    public function get() {
        

    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        return count($this->dict_rows);
    }
    public function len2() {
        
    }
    public function getKeys() {
        return $this->keys;
    }
    public function getIndex() {
        return $this->index;
    }
    public function getRows() {
        return $this->rows;
    }
    public function getRow($p_index) {
        

    }
    public function getIndexRows() {
        
        
    }
    public function getDictRows() {
        return $this->dict_rows;
    }
    public function getCol($p_key) {
        

    }
    public function getIndexCols() {
        
        
    }
    public function getDictCols() {
        // $cols = $this->CI->yd_mat->Transpose($this->rows);
        $cols = $this->CI->yd_mat->init($this->rows)->Transpose()->getCols();

        $dict_cols = tf_combine_keys_values($this->keys, $cols);
        return $dict_cols;
    }
    public function Transpose() {
        
        return $this;
    }

    // 改变
    public function filterValue($key, $value_array){
        
        
        return $this;
    }
    public function reIndexAndTrunc($p_index, $p_num){
        
        
        return $this;
    }

    // 数字
    public function sumAlongCol($f_stat){
        
        
        return $this;
    }

    // 转换输出
    // clone function 不必 PHP 值复制，而非引用复制
    public function complete($default_value) {
        
    }
    public function toScatter() {
        // key, index, value
        $rows = $this->rows;
        $keys = $this->keys;
        $index = $this->index;
        $array_rows = array();
        for($i=0; $i<count($rows); $i++) {
            $this_row = $rows[$i];
            for($j=0; $j<count($this_row); $j++) {
                $node = array();
                array_push($node, $keys[$j]);
                array_push($node, $index[$i]);
                array_push($node, $this_row[$j]);
                array_push($array_rows, $node);
          }
        }
        return $array_rows;
    }

    // public function toScatter2() {
    //     // index, key, value
    //     $rows = $this->rows;
    //     $keys = $this->keys;
    //     $index = $this->index;
    //     $array_rows = array();
    //     for($i=0; $i<count($rows); $i++) {
    //         $this_row = $rows[$i];
    //         for($j=0; $j<count($this_row); $j++) {
    //             $node = array();
    //             array_push($node, $index[$i]);
    //             array_push($node, $keys[$j]);
    //             array_push($node, $this_row[$j]);
    //             array_push($array_rows, $node);
    //       }
    //     }
    //     return $array_rows;
    // }
    public function toJson() {
        // key, index, value
        $rows = $this->rows;
        $keys = $this->keys;
        $index = $this->index;
        $json_rows = array();
        for($i=0; $i<count($rows); $i++) {
            $this_row = $rows[$i];
            $item = array();
            for($j=0; $j<count($this_row); $j++) {
                $key = $keys[$j];
                $item[$key] = $this_row[$j];
            }
            $indice = $index[$i];
            $json_rows[$indice] = $item;
        }
        return $json_rows;
    }


}


function tf_combine_keys_values($keys, $cols) {
    $dict_cols = array();
    for($i=0; $i<count($cols); $i++) {
        $col = $cols[$i];
        $key = $keys[$i];
        $dict_cols[$key] = $col;
    }
    return $dict_cols;
}

function tf_get_keys_from_dict_rows($dict_rows) {
    $dict_row = $dict_rows[0];
    $keys = array_keys($dict_row);
    return $keys;
}

function tf_get_rows_from_dict_rows($dict_rows) {
    $rows = array();
    for($i=0; $i<count($dict_rows); $i++) {
        $dict_row = $dict_rows[$i];
        $row = array_values($dict_row);
        array_push($rows, $row);
    }
    return $rows;
}

function tf_combine_keys_rows($keys, $rows) {
    $dict_rows = array();
    for($i=0; $i<count($rows); $i++) {
        $row = $rows[$i];
        $dict_row = tf_combine_keys_values($keys, $row);
        array_push($dict_rows, $dict_row);
    }
    return $dict_rows;
}

?>
