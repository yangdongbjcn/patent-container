<?php

/**
 * 容器数据结构，二维框架
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_frame {
    private $CI;

    private $dicts;
    private $names;
    private $keys;
    private $lists;

    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd/Yd_mat');

        $this->dicts = array();
        $this->names = array();
        $this->keys = array();
        $this->lists = array();

        log_message('debug', 'yd/Yd_frame Class Initialized');
    }

    // 输入
    public function initNamesKeysLists($names, $keys, $lists) {
        

        return $this;
    }
    public function initMatNamesKeysLists($mat) {
        // 默认第一列是names，第一行是keys，剩下的是lists
        $this->CI->load->library('yd/Yd_mat');
        // $clists = $this->CI->yd_mat->Transpose($mat);
        $clists = $this->CI->yd_mat->init($mat)->Transpose();

        $this->names = array_shift($clists);
        array_shift($this->names);

        // $this->lists = $this->CI->yd_mat->Transpose($clists);
        $this->lists = $this->CI->yd_mat->init($clists)->Transpose();
        
        $this->keys = array_shift($this->lists);
        return $this;
    }
    public function initNamesDicts($names, $dicts) {
        $this->dicts = $dicts;
        $this->keys = tf_get_keys_from_dict_rows($dicts);
        $this->lists = tf_get_rows_from_dict_rows($dicts);

        $this->names = $names;

        return $this;
    }
    public function initKeysClists($keys, $clists) {
        
        $this->CI->load->library('yd/Yd_mat');
        $lists = $this->CI->yd_mat->init($clists)->Transpose();

        return $this->initKeysLists($keys, $lists);
    }

    // 无names 输入

    public function setNames($names) {
        $this->names = $names;
        return $this;
    }
    public function initKeysLists($keys, $lists) {
        $this->keys = $keys;
        $this->lists = $lists;
        $this->dicts = tf_combine_keys_rows($keys, $lists);

        $index_num = count($this->dicts);
        $this->names = $this->CI->yd_list->init1N($index_num)->get();
        
        return $this;
    }
    public function initMatKeysLists($mat) {
        // 默认第一行是keys，剩下的是lists
        $this->keys = array_slice($mat, 0, 1)[0];
        $this->lists = array_slice($mat, 1);
        $this->dicts = tf_combine_keys_rows($this->keys, $this->lists);

        $index_num = count($this->dicts);
        $this->names = $this->CI->yd_list->init1N($index_num)->get();

        return $this;
    }
    public function initDicts($dicts) {
        $index_num = count($dicts);
        $names = $this->CI->yd_list->init1N($index_num)->get();

        $this->initNamesDicts($names, $dicts);

        return $this;
    }
    public function initCdicts($cdicts) {
        

        return $this;
    }  

    // push 输入
    public function merge($new_frame) {
        

        return $this;
    }
    public function pushKeyClist($key, $col) {
        

        return $this;
    }
    public function pushKeyClistOfSameValue($key, $value) {
        

        return $this;
    }
    public function pushNameList($new_index, $new_row) {
        

        return $this;
    }

    // 输出
    public function getFrame() {
        // key, names, value
        $lists = $this->lists;
        $keys = $this->keys;
        $names = $this->names;
        $frame = array();
        for($i=0; $i<count($lists); $i++) {
            $this_row = $lists[$i];
            $item = array();
            for($j=0; $j<count($this_row); $j++) {
                $key = $keys[$j];
                $item[$key] = $this_row[$j];
            }
            $indice = $names[$i];
            $frame[$indice] = $item;
        }
        return $frame;
    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        return count($this->dicts);
    }
    public function len2() {
        
    }
    public function getKeys() {
        return $this->keys;
    }
    public function getNames() {
        return $this->names;
    }
    public function getLists() {
        return $this->lists;
    }
    public function getClists() {
        
    }
    public function getNamesLists() {
        
        
    }
    public function getDicts() {
        return $this->dicts;
    }
    public function getClist($p_key) {
        

    }
    public function updateClist($p_key, $p_clist) {
        

    }
    public function getKeysClists() {
        
        
    }
    public function getCdicts() {
        // $clists = $this->CI->yd_mat->Transpose($this->lists);
        $clists = $this->CI->yd_mat->init($this->lists)->Transpose();

        $cdicts = tf_combine_keys_values($this->keys, $clists);
        return $cdicts;
    }
    public function Transpose() {
        
        return $this;
    }

    // 改变
    public function filterValue($key, $value_array){
        
        
        return $this;
    }
    public function iterFunc(){
        
        
        return $this;
    }
    public function iterMatFunc(){
        
        
        return $this;
    }
    public function iterListFunc(){
        
        
        return $this;
    }
    public function iterClistFunc(){
        
        
        return $this;
    }
    public function trunc($p_num){
        
        
        return $this;
    }
    public function reIndexAndTrunc($p_index, $p_num){
        
        
        return $this;
    }

    // 数字
    public function sumClists($f_stat){
        
        
        return $this;
    }

    // 转换输出
    // clone function 不必 PHP 值复制，而非引用复制
    public function complete($default_value) {
        
    }
    public function toScatter() {
        // key, names, value
        $lists = $this->lists;
        $keys = $this->keys;
        $names = $this->names;
        $array_rows = array();
        for($i=0; $i<count($lists); $i++) {
            $this_row = $lists[$i];
            for($j=0; $j<count($this_row); $j++) {
                $node = array();
                array_push($node, $keys[$j]);
                array_push($node, $names[$i]);
                array_push($node, $this_row[$j]);
                array_push($array_rows, $node);
          }
        }
        return $array_rows;
    }

    // public function toScatter2() {
    //     // names, key, value
    //     $lists = $this->lists;
    //     $keys = $this->keys;
    //     $names = $this->names;
    //     $array_rows = array();
    //     for($i=0; $i<count($lists); $i++) {
    //         $this_row = $lists[$i];
    //         for($j=0; $j<count($this_row); $j++) {
    //             $node = array();
    //             array_push($node, $names[$i]);
    //             array_push($node, $keys[$j]);
    //             array_push($node, $this_row[$j]);
    //             array_push($array_rows, $node);
    //       }
    //     }
    //     return $array_rows;
    // }
    
    
    public function toGroup(){
        
        
    }


}


function tf_combine_keys_values($keys, $clists) {
    $cdicts = array();
    for($i=0; $i<count($clists); $i++) {
        $col = $clists[$i];
        $key = $keys[$i];
        $cdicts[$key] = $col;
    }
    return $cdicts;
}

function tf_get_keys_from_dict_rows($dicts) {
    $dict_row = $dicts[0];
    $keys = array_keys($dict_row);
    return $keys;
}

function tf_get_rows_from_dict_rows($dicts) {
    $lists = array();
    for($i=0; $i<count($dicts); $i++) {
        $dict_row = $dicts[$i];
        $row = array_values($dict_row);
        array_push($lists, $row);
    }
    return $lists;
}

function tf_combine_keys_rows($keys, $lists) {
    $dicts = array();
    for($i=0; $i<count($lists); $i++) {
        $row = $lists[$i];
        $dict_row = tf_combine_keys_values($keys, $row);
        array_push($dicts, $dict_row);
    }
    return $dicts;
}

?>
