<?php

/**
 * 容器数据结构，二维矩阵
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_cube {
    private $CI;

    private $listss;
    public function __construct() {
        $this->CI = & get_instance();

        $this->CI->load->library('yd_mat');

        $this->listss = array();
        log_message('debug', 'yd_cube Class Initialized');
    }

    // 输入
    public function init($listss) {
        $this->listss = $listss;
        return $this;
    }
        

    // 输出
    public function get() {
        return $this->listss;
    }
    public function isEmpty() {
        if ($this->len() == 0) {
          return TRUE;
        }else{
          return FALSE;
        }
    }
    public function len() {
        return count($this->listss);
    }
    public function len2() {
        return count($this->listss[0]);
    }
    public function len3() {
        return count($this->listss[0][0]);
    }
    
}    
 

?>
