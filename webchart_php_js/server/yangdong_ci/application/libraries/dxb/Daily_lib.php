<?php

/**
 * 每日学习配置文件
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190101
 */

class daily_lib {
    private $CI;

    public function __construct() {
        $this->CI = & get_instance();
        log_message('debug', 'daily_lib Class Initialized');
    }

    public $g_daily_types = array(
        'party'=>'党建',  
        'training'=>'培训',
        'quality'=>'质量',
        'others'=>'其他');

    public function in_daily_types($type) {
        $daily_types_keys = array_keys($this->g_daily_types);
        return in_array($type, $daily_types_keys);
    }

}

?>
