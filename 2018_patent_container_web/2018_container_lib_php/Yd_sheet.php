<?php

/**
 * 容器数据结构，二维框架
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_sheet {
    private $CI;

    private $keys;
    private $lists;

    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd/Yd_mat');

        $this->names = array();
        $this->keys = array();
        $this->lists = array();

        log_message('debug', 'yd/yd_sheet Class Initialized');
    }

    // 输入
    public function initKeysLists($keys, $lists) {
        $this->keys = $keys;
        $this->lists = $lists;        
        return $this;
    }
    public function initKeysClists($keys, $clists) {
        $this->CI->load->library('yd/Yd_mat');
        $lists = $this->CI->yd_mat->init($clists)->getTranspose();
        return $this->initKeysLists($keys, $lists);
    }
    public function initMatKeysLists($mat) {
        // 默认第一行是keys，剩下的是lists
        $this->keys = array_slice($mat, 0, 1)[0];
        $this->lists = array_slice($mat, 1);
        return $this;
    }
    public function initDicts($dicts) {
        $this->keys = tf_get_keys_from_dicts($dicts);
        $this->lists = tf_get_lists_from_dicts($dicts);
        return $this;
    }

    // 输出
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
        return count($this->keys);
    }
    public function getKeys() {
        return $this->keys;
    }
    public function getLists() {
        return $this->lists;
    }
    public function getDicts() {
        return tf_get_dicts_from_keys_and_lists($this->keys, $this->lists);
    }
    public function getClist($key) {
        $col = array();

        
        return $col;
    }
}


function tf_get_dict_from_keys_and_values($keys, $clists) {
    $cdicts = array();
    for($i=0; $i<count($clists); $i++) {
        $col = $clists[$i];
        $key = $keys[$i];
        $cdicts[$key] = $col;
    }
    return $cdicts;
}

function tf_get_keys_from_dicts($dicts) {
    $dict_row = $dicts[0];
    $keys = array_keys($dict_row);
    return $keys;
}

function tf_get_lists_from_dicts($dicts) {
    $lists = array();
    for($i=0; $i<count($dicts); $i++) {
        $dict_row = $dicts[$i];
        $row = array_values($dict_row);
        array_push($lists, $row);
    }
    return $lists;
}

function tf_get_dicts_from_keys_and_lists($keys, $lists) {
    $dicts = array();
    for($i=0; $i<count($lists); $i++) {
        $row = $lists[$i];
        $dict_row = tf_get_dict_from_keys_and_values($keys, $row);
        array_push($dicts, $dict_row);
    }
    return $dicts;
}

?>
