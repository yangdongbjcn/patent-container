<?php

/**
 * 容器数据结构，二维框架
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_tree {
    private $CI;

    private $superior;
    private $members;
    private $names;
    private $keys;
    private $listss;

    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd/Yd_cube');

        $this->superior;
        $this->members = array();
        $this->names = array();
        $this->keys = array();
        $this->listss = array();

        log_message('debug', 'yd/Yd_tree Class Initialized');
    }

    // 输入
    public function init($superior, $members, $names, $keys, $listss) {
        

        return $this;
    }
    

    // 输出
    public function getTree() {
        

    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        
    }
    public function len2() {
        
    }
    public function len3() {
        
    }
    
}

?>
