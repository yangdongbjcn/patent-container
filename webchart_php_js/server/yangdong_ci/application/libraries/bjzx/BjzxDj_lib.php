<?php

/**
 * 每日学习配置文件
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190101
 */

class BjzxDj_lib {
    private $CI;

    public function __construct() {
        $this->CI = & get_instance();
        log_message('debug', 'daily_lib Class Initialized');
    }

    public $g_daily_types = array(
        'yzyh100'=>'应知应会100题',
        'yzyh50'=>'应知应会50条',
        'yqzq'=>'疫情专区',
        'wen30'=>'严格党内组织生活30问',);

    public function in_daily_types($type) {
        $daily_types_keys = array_keys($this->g_daily_types);
        return in_array($type, $daily_types_keys);
    }

}

?>
