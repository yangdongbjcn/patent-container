<?php

/**
 * 
 * Encoding		:  UTF-8
 * Created on	:  20200102 by YDBJ, yangdongbjcn@hotmail.com
 */


error_reporting( E_ALL&~E_NOTICE );

class TextLines extends CI_Controller {

    public function __construct() {
        parent::__construct();
       
    }

    public function index() {
    }

    public function apiTextMap() {

        $text = $this->input->post('text');
        $text_arr = $this->getArrayByLines($text);

        $map_str = $this->input->post('map');
        $map = $this->initTextMap($map_str);

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];
            $match = 0;
            foreach ($map as $key => $value) {
                if (preg_match('/' . $key . '(\s|$)/i', $item, $result)){
                    $match = 1;
                    echo $value;
                    echo "\t";
                    echo $item;
                    echo 'rrrrnnnn';
                    break;
                }
            }
            if ($match == 0) {
                echo '未匹配';
                echo "\t";
                echo $item;
                echo 'rrrrnnnn';
            }
        }   
    }

    private function initTextMap($map_str) {
        $text_arr = explode("\n", $map_str);
 
        $map = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            if (preg_match('/.*\t/i', $item, $result)){
                $key = $result[0];
                $key = preg_replace('/\t/', '', $key);
                // echo $key;

                $value = $key;
                if (preg_match('/\t.*/i', $item, $result)){
                    $value = $result[0];
                    $value = preg_replace('/\t/', '', $value);
                }
                $map[$key] = $value;
            }
        }

        return $map;
    }

    public function apiTextMatchNumNation() {
        
        $text = $this->input->post('text');
        $text_arr = $this->getArrayByLines($text);

        $reg_str = $this->getRegExpNumAndNation();
        $match_arr = $this->matchTextArray($text_arr, $reg_str);
        $rows = $this->matchTextArray2Mat($match_arr);

        $this->load->library('yd_mat');
        $this->yd_mat->init($rows);
        $col0 = $this->yd_mat->getClist(0);
        $col1 = $this->yd_mat->getClist(1);

        for ($i=0; $i<count($col0); $i++) {
            $key = $col0[$i];
            $value = $col1[$i];
            echo $value;
            echo "\t";
            echo $key;
            echo 'rrrrnnnn';
        }
    }

    public function apiTextMatchNumKeys() {
        $text = $this->input->post('text');
        $text_arr = $this->getArrayByLines($text);

        $key = $this->input->post('key');
        $key_arr = $this->getArrayBySep($key);

        $reg_str = $this->getRegExpNumAndKeys($key_arr);
        $match_arr = $this->matchTextArray($text_arr, $reg_str);

        $return = implode("rrrrnnnn", $match_arr);
        echo $return;
    }

    private function getNations($key) {
        $arr = explode(' ', $key);
        return $arr;
    }

    private function getArrayByLines($text) {
        $text_arr = explode("\n", $text);
        return $text_arr;
    }

    private function getArrayBySep($text) {
        $text_arr = preg_split('/\s{1,}/', $text);
        return $text_arr;
    }

    private function matchTextArray($text_arr, $reg_str) {
        $match_str_array = array();
        for ($i=0; $i<count($text_arr); $i++) {
            $text = $text_arr[$i];
            $match_str = $this->matchText($text, $reg_str);
            array_push($match_str_array, $match_str);
        }
        return $match_str_array;
    }

    private function getUnmatched() {
        $match_str = '';
        return $match_str;
    }

    private function matchText($text, $reg_str) {
        $match_str = $this->getUnmatched();
        if (preg_match($reg_str, $text, $result)){
            $match_str = $result[0];
        }
        return $match_str;
    }

    private function sepByTab($text) {
        $reg_str = $this->getRegExpTab();
        $reg_str = $this->wrapRegExp($reg_str);
        $result = preg_split($reg_str, $text);
        // var_dump($result);
        return $result;
    }

    private function isMatched($match) {
        $unmatched = $this->getUnmatched();
        if ($match == $unmatched){
            return false;
        }else{
            return true;
        }
    }

    private function removeUnmatched($match_arr) {

        $new_arr = array();
        for ($i=0; $i<count($match_arr); $i++) {
            $item = $match_arr[$i];

            $matched = $this->isMatched($item);

            if ($matched){
                array_push($new_arr, $item);
            }            
        }
        return $new_arr;
    }

    private function matchTextArray2Mat($match_str_array) {
        $rows = array();
        for ($i=0; $i<count($match_str_array); $i++) {
            $item = $match_str_array[$i];
            $key_arr = $this->getArrayBySep($item);

            array_push($rows, $key_arr);
        }
        return $rows;
    }

    private function getRegExpNumAndNation() {
        $reg_arr = [$this->getRegExpNum(), $this->getRegExpChar2()];
        $reg_str = $this->wrapRegExpArrayWithSep($reg_arr);
        return $reg_str;
    }

    private function getRegExpNumAndYear() {
        $reg_arr = [$this->getRegExpNum(), $this->getRegExpYear()];
        $reg_str = $this->wrapRegExpArrayWithSep($reg_arr);
        return $reg_str;
    }

    private function getRegExpBegin() {
        return '/';
    }

    private function getRegExpEnd() {
        return '/i';
    }

    private function getRegExpNum() {
        return '[0-9]{1,}';
    }

    private function getRegExpSep() {
        return '\s{1,}';
    }

    private function getRegExpTab() {
        return '\t';
    }

    private function getRegExpChar2() {
        return '[a-z]{2}';
    }

    private function getRegExpYear() {
        return '(1|2)[0-9]{3}';
    }

    private function getRegExpIpc() {
        return '[a-z][0-9]{2}[a-z]\S{0,}';
    }

    private function getRegExpIpc2() {
        return '[a-z][0-9]{2}[a-z][0-9]{0,}';
    }

    private function getRegExpIpc3() {
        return '[a-z][0-9]{2}[a-z]';
    }

    private function getRegExpKeys($keys) {
        $reg_str = '(';
        $reg_str = $reg_str . $keys[0];
        for ($j=1; $j<count($keys); $j++) {
            $key = $keys[$j];
            $reg_str = $reg_str . '|' . $key;
        }
        $reg_str = $reg_str . ')';
        return $reg_str;
    }

    private function wrapRegExpArrayWithSep($text_arr) {
        $text_comb = $this->getRegExpBegin();
        $text_comb = $text_comb . $text_arr[0];
        for ($i=1; $i<count($text_arr); $i++) {
            $text_comb = $text_comb . $this->getRegExpSep();
            $item = $text_arr[$i];      
            $text_comb = $text_comb . $item;
        }
        $text_comb = $text_comb . $this->getRegExpEnd();
        return $text_comb;
    }

    private function wrapRegExp($text_str) {
        $text_comb = $this->getRegExpBegin();
        $text_comb = $text_comb . $text_str;
        $text_comb = $text_comb . $this->getRegExpEnd();
        return $text_comb;
    }

    private function getRegExpNumAndKeys($keys) {
        $reg_arr = [$this->getRegExpNum(), $this->getRegExpKeys($keys)];
        $reg_str = $this->wrapRegExpArrayWithSep($reg_arr);
        return $reg_str;
    }

    private function getRegExpPN() {
        return '/[a-z]{2}\d+/i';
    }

    private function getRegExpPnOne($key) {
        return '/' . $key . '\d+/i';
    }


    private function getRegExpDWPI() {
        return '/[0-9]{4}([0-9]|[a-z]){6}/i';
    }



    public function apiTextMatchPN() {
        $text = $this->input->post('text');
        $text_arr = $this->getArrayByLines($text);
        $reg_str = $this->getRegExpPN();
        $match_arr = $this->matchTextArray($text_arr, $reg_str);

        $return = implode("rrrrnnnn", $match_arr);
        echo $return;
    }

    public function apiTextMatchPnOne() {
        $text = $this->input->post('text');
        $key = $this->input->post('key');

        $text_arr = $this->getArrayByLines($text);

        $reg_str = $this->getRegExpPnOne($key);

        $match_arr = $this->matchTextArray($text_arr, $reg_str);

        $return = implode("rrrrnnnn", $match_arr);
        echo $return;
    }

    public function apiTextMatchDWPI() {
        $text = $this->input->post('text');

        $text_arr = $this->getArrayByLines($text);

        $reg_str = $this->getRegExpDWPI();

        $match_arr = $this->matchTextArray($text_arr, $reg_str);

        $return = implode("rrrrnnnn", $match_arr);
        echo $return;
    }

    public function apiTextMatchNumYear() {
        
        $text = $this->input->post('text');
        $text_arr = $this->getArrayByLines($text);

        $reg_str = $this->getRegExpNumAndYear();
        $match_arr = $this->matchTextArray($text_arr, $reg_str);

        $match_arr = $this->removeUnmatched($match_arr);
        $rows = $this->matchTextArray2Mat($match_arr);


        $this->load->library('yd_mat');
        $this->yd_mat->init($rows)->Transpose();
        $num_arr =  $this->yd_mat->getClist(0);
        $year_arr = $this->yd_mat->getClist(1);

        $final = $this->sortYear($year_arr, $num_arr);

        foreach ($final as $key => $value) {
            echo $value;
            echo "\t";
            echo $key;
            echo 'rrrrnnnn';
        }
    }

    public function sortYear($year_arr, $num_arr) {
        $min_year = 3000;
        $max_year = 1000;

        for ($i=0; $i<count($year_arr); $i++) {
            $year = $year_arr[$i];
            if ($min_year > $year){
                $min_year = $year;
            }
            if ($max_year < $year){
                $max_year = $year;
            }
        }

        if ($min_year > $max_year) {
            echo 'error: min year > max year';
            return ;
        }

        $hist = array();
        for ($i=$min_year; $i<=$max_year; $i++) {
            $hist[$i] = 0;
        }

        for ($i=0; $i<count($year_arr); $i++) {
            $year = $year_arr[$i];
            $num = $num_arr[$i];

            $hist[$year] = $num;
        }

        return $hist;
    }

    public function apiGetYearHist() {
        $text = $this->input->post('text');        
        $text_arr = $this->getArrayByLines($text);

        $reg_str = $this->getRegExpYear();
        $reg_str = $this->wrapRegExp($reg_str);
        $match_arr = $this->matchTextArray($text_arr, $reg_str);
        $match_arr = $this->removeUnmatched($match_arr);

        $this->load->library('yd_dict');
        $hist = $this->yd_dict->initByHist($match_arr);

        $keys = $hist->getKeys();
        $values = $hist->getValues();

        $final = $this->sortYear($keys, $values);

        foreach($final as $key => $value) {
            echo $value;
            echo "\t\t";
            echo $key;
            echo 'rrrrnnnn';
        }
    }

    public function apiGetIpc1() {
        
        $text = $this->input->post('text');
        
        $text_arr = $this->getArrayByLines($text);

        $final = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            // 去除第一个|
            $item = preg_replace('/\s{0,}\|.{0,}$/i', '', $item);

            array_push($final, $item);
        }

        for ($i=0; $i<count($final); $i++) {
            $item = $final[$i];
            echo $item;
            echo 'rrrrnnnn';
        }
    }

    public function apiIpcHist() {
        // echo 'ok';
        $text = $this->input->post('text');        
        $text_arr = $this->getArrayByLines($text);

        $reg_str = $this->getRegExpIpc2();
        $reg_str = $this->wrapRegExp($reg_str);
        $match_arr = $this->matchTextArray($text_arr, $reg_str);
        $match_arr = $this->removeUnmatched($match_arr);

        $this->load->library('yd_dict');
        $final = $this->yd_dict->initByHist($match_arr)->get();

        foreach($final as $key => $value) {
            echo $value;
            echo "\t\t";
            echo $key;
            echo 'rrrrnnnn';
        }
    }


    // 20200513
    public function apiTextMatToJson() {
        $text = $this->input->post('text');

        $text_arr = $this->getArrayByLines($text);

        $mat = $this->transTextArrayToMat($text_arr);
        
        $this->load->library('yd_frame');
        $json = $this->yd_frame->initMatNamesKeysLists($mat)->getFrame();

        echo json_encode($json);
    }

    private function transTextArrayToMat($text_arr) {
        
        $mat = array();
        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];
            $row = $this->sepByTab($item);
            array_push($mat, $row);
        }
        return $mat;
    }

    // 20201125
    public function apiTextMatToJson2() {
        $text = $this->input->post('text');

        $text_arr = $this->getArrayByLines($text);

        $mat = $this->transTextArrayToMat($text_arr);
        
        $this->load->library('yd_frame');
        $json = $this->yd_frame->initMatKeysLists($mat)->getDicts();

        echo json_encode($json);
    }

    // 20200513
    public function apiTextMatToMat() {
        $text = $this->input->post('text');

        $text_arr = $this->getArrayByLines($text);

        $mat = $this->transTextArrayToMat($text_arr);
        echo json_encode($mat);
    }

    ///////////////////////////////

    public function apiMapPa() {
        // echo 'ok';
        $text = $this->input->post('text');
        $postfix = $this->input->post('postfix');

        $map_str = $this->input->post('map');
        $map = $this->initTextMap($map_str);

        // echo count($map);

        $text_arr = $this->getArrayByLines($text);
        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];
            echo ' ( ';

            $first_match = 0;
            foreach ($map as $key => $value) {
                if ($value == $item){
                    if ($first_match) {
                        echo ' or ';
                    }
                    echo ' ( ';
                    echo $key;
                    echo ' ) ';
                    $first_match = 1;
                }
            }
            echo ' )/PA ';
            echo $postfix;
            echo 'rrrrnnnn';
        }
        
    }

    public function apiFormatPa() {
        // echo 'ok';
        $text = $this->input->post('text');
        $text = preg_replace('/\s{1,}\n\s\s{1,}/i', ' ', $text);
        // echo $text;
        $text_arr = $this->getArrayByLines($text);
        $name_arr = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            $item = preg_replace('/\s{1,}$/i', '', $item);
            $item = preg_replace('/^\d{1,10}\s{1,}/i', '', $item);
            // echo $item;
            // echo 'rrrrnnnn';

            if (preg_match('/\d{1,10}\s{1,}.{0,}$/i', $item, $result)){
                // 20190802--YDBJ \d{1,10}表示专利数最多10位数
                $num_s_name = $result[0];

                preg_match('/^\d{1,10}/i', $num_s_name, $result_num);
                $num = $result_num[0];

                $name = preg_replace('/^\d{1,10}\s{1,}/i', '', $num_s_name);
                $name_arr[$name] = $num;
            }
        }


        arsort($name_arr);
            

        foreach ($name_arr as $key => $value) {
            echo $value;
            echo "\t";
            echo $key;
            echo 'rrrrnnnn';
        }
    }

    
    
    public function apiAddHistogram() {
        // echo 'ok';
        $text = $this->input->post('text');

        $text = preg_replace('/\n{2,}/i', "\n", $text);
        $text = preg_replace('/\n{1,}$/i', "", $text);

        // echo $text;
        $text_arr = $this->getArrayByLines($text);
        $item_arr = array();
        $hist = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            if (preg_match('/\d{4}\s{1,}\d{1,10}/i', $item, $result)){
                // 20191224--YDBJ \d{1,10}表示专利数最多10位数
                $num_year_s = $result[0];
                preg_match('/\d{1,10}$/i', $num_year_s, $result_num);
                $num = $result_num[0];
                preg_match('/^\d{4}/i', $num_year_s, $result_year);
                $year = $result_year[0];

                $hist[$year] = 0;
            }
        }

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            if (preg_match('/\d{4}\s{1,}\d{1,10}/i', $item, $result)){
                // 20191224--YDBJ \d{1,10}表示专利数最多10位数
                $num_year_s = $result[0];
                preg_match('/\d{1,10}$/i', $num_year_s, $result_num);
                $num = $result_num[0];
                preg_match('/^\d{4}/i', $num_year_s, $result_year);
                $year = $result_year[0];

                $hist[$year] = $hist[$year] + $num;
            }
        }

        foreach($hist as $key => $value) {
            echo $value;
            echo "\t\t";
            echo $key;
            echo 'rrrrnnnn';
        }
    }

    public function apiCombineHistogram() {
        // echo 'ok';
        $text = $this->input->post('text');
        // 匹配text每一行，需要在最后一行补充换行符。
        $text = $text . "\n";

        $index = $this->input->post('index');

        $index_arr = $this->getArrayByLines($index);

        $output_arr = array();

        for ($i=0; $i<count($index_arr); $i++) {
            $item = $index_arr[$i];

            // 有的包含 |
            $item = preg_replace('/\|/i', "\|", $item);

            $preg_str = "/" . $item . "\t+.*/i";
            if (preg_match($preg_str, $text, $result)){
                var_dump($result[0]);
                $output_line = $result[0];                
            }else{
                $output_line = $item;
            }

            array_push($output_arr, $output_line);
        }

        foreach($output_arr as $value) {
            echo $value;
            echo 'rrrrnnnn';
        }
    }

    

}

?>
