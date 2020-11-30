<?php

/**
 * 检索
 * Encoding		:  UTF-8
 * Created on	:  2019-7-11 by YDBJ, yangdongbjcn@hotmail.com
 */


error_reporting( E_ALL&~E_NOTICE );

class MultiCols extends CI_Controller {

    private $indent = '    ';

    public function __construct() {
        parent::__construct();
       
    }

    public function index() {
    }

    public function apiGetOneCol() {
        $text = $this->input->post('text');
        $key = $this->input->post('key');

        $this->getOneCol($text, $key);
    }

    public function getOneCol($text, $key) {
        $text = str_replace("\r\n", "rrnn", $text);

        $arr = explode(' ', $text);
        // $arr = array_filter($arr);
        for ($i=0; $i<count($arr); $i++) {
            $item = $arr[$i];

            $this->echoStringHasString($item, $key);
            // echo $item;
            // echo 'rrnn';
        }
    }

    private function echoStringHasString($item, $key) {
        if (strlen($item) >= strlen($key)){
            $item_key = substr($item, 0, strlen($key));
            if ($item_key == $key){
                echo $item;
                echo 'rrnn';
            }
        }
    }

    public function apiGetOneCol2() {
        $text = $this->input->post('text');

        $this->getOneCol2($text);
    }

    public function getOneCol2($text) {
        $text = str_replace("\r\n", "rrnn", $text);

        $arr = explode(' ', $text);
        // $arr = array_filter($arr);
        for ($i=0; $i<count($arr); $i++) {
            $item = $arr[$i];

            $this->echoStringHasString2($item);
            // echo $item;
            // echo 'rrnn';
        }
    }

    private function echoStringHasString2($item) {
        if (strlen($item) >= 2){
            if (preg_match('/^[a-z]{2}\d+/i', $item)){
                echo $item;
                echo 'rrnn';
            }
        }
    }

    public function apiGetOneCol3() {
        $text = $this->input->post('text');

        $this->getOneCol3($text);
    }

    public function getOneCol3($text) {
        $text = str_replace("\r\n", "rrnn", $text);

        $arr = explode(' ', $text);
        // $arr = array_filter($arr);
        for ($i=0; $i<count($arr); $i++) {
            $item = $arr[$i];

            $this->echoStringHasString3($item);
            // echo $item;
            // echo 'rrnn';
        }
    }

    private function echoStringHasString3($item) {
        if (strlen($item) >= 2){
            if (preg_match('/^[0-9]{4}([0-9]|[a-z]){6}$/i', $item)){
                echo $item;
                echo 'rrnn';
            }
        }
    }
}

?>
