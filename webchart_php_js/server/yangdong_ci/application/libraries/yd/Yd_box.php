<?php

/**
 * 容器数据结构，二维框架
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_box {
    private $CI;

    private $layers;
    private $names;
    private $keys;
    private $listss;

    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd/Yd_cube');

        $this->layers = array();
        $this->names = array();
        $this->keys = array();
        $this->listss = array();

        log_message('debug', 'yd/Yd_box Class Initialized');
    }

    // 输入
    public function initLayersNamesKeysLists($layers, $names, $keys, $listss) {
        

        return $this;
    }
    

    // 输出
    public function getBox() {
        

    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        return count($this->layers);
    }
    public function len2() {
        
    }
    public function len3() {
        
    }
    
}

?>
