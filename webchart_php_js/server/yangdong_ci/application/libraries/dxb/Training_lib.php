<?php

/**
 * 培训工作配置文件
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190101
 */

class training_lib {
    private $CI;

    public function __construct() {
        $this->CI = & get_instance();
        
        $this->CI->load->library('Excel/Spreadsheet_Excel_Reader'); //导入数据库表自定义类

        log_message('debug', 'dxb/training_lib Class Initialized');
    }

    public $g_types = array(
        'Search'=>'检索',  
        'Law'=>'法律',
        'Exam'=>'审查',
        'Tech'=>'技术', 
        'Eng'=>'外语');

    public $g_levels = array(
        '1'=>'见习级',
        '2'=>'初级',
        '3'=>'中级',
        '4'=>'高级',
        '5'=>'专家级');

    private $next_level = array(
        '1'=>'2',
        '2'=>'3',
        '3'=>'4',
        '4'=>'5',
        '5'=>'5');

    private $previous_level = array(
        '1'=>'1',
        '2'=>'1',
        '3'=>'2',
        '4'=>'3',
        '5'=>'4');

    public $g_ups = array(
        '1'=>'见习级->初级',
        '2'=>'初级->中级',
        '3'=>'中级->高级',
        '4'=>'高级->专家级',
        '5'=>'专家级');

    public function get_next_level($level) {
        return $this->next_level[$level];
    }

    public function get_previous_level($level) {
        return $this->previous_level[$level];
    }

    //20180601
    public function load_acts() {
        $g_types = $this->g_types;
        $g_levels = $this->g_levels;

        $reader = $this->CI->spreadsheet_excel_reader;
        $reader->setOutputEncoding('UTF-8');

        $basedir = dirname(__FILE__); 
        $reader->read($basedir . '/actlist.xls');

        error_reporting(E_ALL ^ E_NOTICE);

        for($i = 0; $i < count($reader->sheets); $i++ ) {
            $name = $reader->boundsheets[$i]['name'];
            $map[$name] = $i;
        }

        foreach($g_types as $type => $type_chn) {
            foreach($g_levels as $level => $level_chn) {

                $e_level = $level;

                $name = $type . $e_level;
                $sheet_i = $map[$name];

                $rows = $reader->sheets[$sheet_i]['numRows'];

                for ($i = 4; $i <= $rows; $i++){
                    $group = $reader->sheets[$sheet_i]['cells'][$i][1];
                    $min_score = $reader->sheets[$sheet_i]['cells'][$i][2];
                    $max_score = $reader->sheets[$sheet_i]['cells'][$i][3];
                    $tip = $reader->sheets[$sheet_i]['cells'][$i][4];
                    $code = $reader->sheets[$sheet_i]['cells'][$i][5];
                    $sub_type = $reader->sheets[$sheet_i]['cells'][$i][6];
                    $credit = $reader->sheets[$sheet_i]['cells'][$i][7];
                    if ($sub_type != ""){
                        $g_act_credits[$type][$level][$code] = $credit;
                        $g_act_sub_types[$type][$level][$code] = $sub_type;
                        $g_act_tips[$type][$level][$code] = $tip;   
                    }
                }

                $g_levelup_credits[$type][$level] = $reader->sheets[$sheet_i]['cells'][1][7];
            }   
        }

        $data = array();
        $data['pre_act_credits'] = $g_act_credits;
        $data['pre_act_sub_types'] = $g_act_sub_types;
        $data['pre_act_tips'] = $g_act_tips;
        $data['pre_levelup_credits'] = $g_levelup_credits;
        return $data;
    }

}

?>
