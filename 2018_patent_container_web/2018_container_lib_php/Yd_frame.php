<?php

/**
 * 容器数据结构，二维框架
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_frame {
    private $CI;

    private $names;
    private $keys;
    private $lists;

    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd/Yd_mat');

        $this->names = array();
        $this->keys = array();
        $this->lists = array();

        log_message('debug', 'yd/Yd_frame Class Initialized');
    }

    // 输入
    public function initNamesKeysLists($names, $keys, $lists) {
        
        $this->names = $names;
        $this->keys = $keys;
        $this->lists = $lists;

        return $this;
    }
    public function initMatNamesKeysLists($mat) {
        // 默认第一列是names，第一行是keys，剩下的是lists
        $this->CI->load->library('yd/Yd_mat');
        $clists = $this->CI->yd_mat->init($mat)->getTranspose();

        $this->names = array_shift($clists);
        array_shift($this->names);

        $this->lists = $this->CI->yd_mat->init($clists)->getTranspose();
        
        $this->keys = array_shift($this->lists);
        return $this;
    }
    public function initNamesDicts($names, $dicts) {
        $this->keys = tf_get_keys_from_dicts($dicts);
        $this->lists = tf_get_lists_from_dicts($dicts);

        $this->names = $names;

        return $this;
    }
    
    public function setNames($names) {
        $this->names = $names;
        return $this;
    }
    
    // 输出
    public function getNamesDicts() {
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
        return count($this->lists);
    }
    public function len2() {
        return count($this->keys);
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
        return tf_get_dicts_from_keys_and_lists($this->keys, $this->lists);
    }

    // 转换输出
    
    public function getScatter() {
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
    
    public function toGroup(){
        
        
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
