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

        $map_str = $this->input->post('map');

        $map = $this->initTextMap($map_str);

        $text_arr = explode("\n", $text);
        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];
            $match = 0;
            foreach ($map as $key => $value) {
                if (preg_match('/' . $key . '(\s|$)/i', $item, $result)){
                    $match = 1;
                    echo $value;
                    echo "\t";
                    echo $item;
                    echo 'rrnn';
                    break;
                }
            }
            if ($match == 0) {
                echo '未匹配';
                echo "\t";
                echo $item;
                echo 'rrnn';
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

    public function apiTextExtractNumAndNation() {
        $text = $this->input->post('text');
        $text_arr = $this->getLinesArray($text);

        $num_nation = $this->getNumAndNation($text_arr);

        $nation_arr = $this->getLastItemArray($num_nation);
        $num_arr = $this->getFristItemArray($num_nation);

        $final = array();
        for ($i=0; $i<count($nation_arr); $i++) {
            $key = $nation_arr[$i];
            $num = $num_arr[$i];
            $final[$key] = $num;
        }

        arsort($final);

        foreach ($final as $key => $value) {
            echo $value;
            echo "\t";
            echo $key;
            echo 'rrnn';
        }
    }

    public function apiTextMatch() {
        $text = $this->input->post('text');
        $key = $this->input->post('key');

        $text_arr = $this->getLinesArray($text);
        $key_arr = $this->getSpaceSeparatedArray($key);

        $num_nation = $this->getNumAndNation($text_arr);
        $result = $this->filterText($num_nation, $key_arr);

        $return = implode("rrnn", $result);
        echo $return;
    }

    private function getNations($key) {
        $arr = explode(' ', $key);
        return $arr;
    }

    private function getLinesArray($text) {
        $text_arr = explode("\n", $text);
        return $text_arr;
    }

    private function getSpaceSeparatedArray($text) {
        $text_arr = preg_split('/\s{1,}/', $text);
        return $text_arr;
    }


    private function getNumAndNation($text_arr) {
        $numAndNation = array();
        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            if (preg_match('/[0-9]{1,}\s{1,}[a-z]{2}/i', $item, $result)){
                array_push($numAndNation, $result[0]);
            }
        }
        return $numAndNation;
    }

    private function getFristItemArray($text_arr) {
        $final = array();
        $other_num = 0;
        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];
            if (preg_match('/^\s{0,}\S{1,}/i', $item, $result)){
                $key = $result[0];
                $key = trim($key);
                array_push($final, $key);
            }
        }
        return $final;
    }

    private function getLastItemArray($text_arr) {
        $final = array();
        $other_num = 0;
        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];
            if (preg_match('/\S{1,}\s{0,}$/i', $item, $result)){
                $key = $result[0];
                $key = trim($key);
                array_push($final, $key);
            }
        }
        return $final;
    }

    private function filterText($text_arr, $key_arr) {
        $final = array();
        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            for ($j=0; $j<count($key_arr); $j++) {
                $key = $key_arr[$j];
                if(stristr($item, $key)){
                    array_push($final, $item);
                    break;  // 匹配一次就可以了
                }
            }
        }
        return $final;
    }


    ///////////////////////////////

    public function apiMapPa() {
        // echo 'ok';
        $text = $this->input->post('text');
        $postfix = $this->input->post('postfix');

        $map_str = $this->input->post('map');
        $map = $this->initTextMap($map_str);

        // echo count($map);

        $text_arr = explode("\n", $text);
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
            echo 'rrnn';
        }
        
    }

    public function apiFormatPa() {
        // echo 'ok';
        $text = $this->input->post('text');
        $text = preg_replace('/\s{1,}\n\s\s{1,}/i', ' ', $text);
        // echo $text;
        $text_arr = explode("\n", $text);
        $name_arr = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            $item = preg_replace('/\s{1,}$/i', '', $item);
            $item = preg_replace('/^\d{1,10}\s{1,}/i', '', $item);
            // echo $item;
            // echo 'rrnn';

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
            echo 'rrnn';
        }
    }

    public function apiGetIpc1() {
        // echo 'ok';
        $text = $this->input->post('text');
        // echo $text;
        $text_arr = explode("\n", $text);
        $final = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            $item = preg_replace('/\s{0,}\|.{0,}$/i', '', $item);

            $item = preg_replace('/\s/i', '', $item);
            
            array_push($final, $item);
        }

        for ($i=0; $i<count($final); $i++) {
            $item = $final[$i];
            echo $item;
            echo 'rrnn';
        }
    }

    public function apiIpcHistogram() {
        // echo 'ok';
        $text = $this->input->post('text');

        $text = preg_replace('/\-/i', '', $text);
        $text = preg_replace('/\n{2,}/i', "\n", $text);
        
        $text = preg_replace('/\n{1,}$/i', "", $text);

        // echo $text;
        $text_arr = explode("\n", $text);
        $item_arr = array();
        $hist = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            $item = preg_replace('/\s{0,}\/.{0,}$/i', '', $item);
            
            array_push($item_arr, $item);
        }

        for ($i=0; $i<count($item_arr); $i++) {
            $item = $item_arr[$i];
            $hist[$item] = 0;
        }

        for ($i=0; $i<count($item_arr); $i++) {
            $item = $item_arr[$i];
            $hist[$item] = $hist[$item] + 1;
        }

        arsort($hist);

        foreach($hist as $key => $value) {
            echo $value;
            echo "\t\t";
            echo $key;
            echo 'rrnn';
        }
    }

    public function apiAddHistogram() {
        // echo 'ok';
        $text = $this->input->post('text');

        $text = preg_replace('/\n{2,}/i', "\n", $text);
        $text = preg_replace('/\n{1,}$/i', "", $text);

        // echo $text;
        $text_arr = explode("\n", $text);
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
            echo 'rrnn';
        }
    }

    public function apiGetYearHist() {
        // echo 'ok';
        $text = $this->input->post('text');        
        $text_arr = explode("\n", $text);
        // echo count($text_arr);

        $min_year = 3000;
        $max_year = 1000;

        $year = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            if (preg_match('/\d{4}/i', $item, $result)){

                if ($min_year > $result[0]){
                    $min_year = $result[0];
                }
                if ($max_year < $result[0]){
                    $max_year = $result[0];
                }

                array_push($year, $result[0]);
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

        // echo count($year);


        for ($i=0; $i<count($year); $i++) {
            $item = $year[$i];

            $hist[$item] = $hist[$item] + 1;
        }

        foreach($hist as $key => $value) {
            echo $value;
            echo "\t\t";
            echo $key;
            echo 'rrnn';
        }
    }


    public function apiFormatYearHist() {
        // echo 'ok';
        $text = $this->input->post('text');   
        $text_arr = explode("\n", $text);

        $min_year = 3000;
        $max_year = 1000;

        $num_arr = array();
        $year_arr = array();

        for ($i=0; $i<count($text_arr); $i++) {
            $item = $text_arr[$i];

            if (preg_match('/\d{1,10}\s{1,}\d{4}\s{0,}$/i', $item, $result)){
                // 20190802--YDBJ \d{1,10}表示专利数最多10位数
                $num_year_s = $result[0];
                preg_match('/^\d{1,10}/i', $num_year_s, $result_num);
                $num = $result_num[0];
                preg_match('/\d{4}\s{0,}$/i', $num_year_s, $result_year_s);
                $year_s = $result_year_s[0];
                preg_match('/^\d{4}/i', $year_s, $result_year);
                $year = $result_year[0];

                array_push($num_arr, $num);
                array_push($year_arr, $year);

                if ($min_year > $year){
                    $min_year = $year;
                }
                if ($max_year < $year){
                    $max_year = $year;
                }
            }
        }

        // echo $min_year;
        // echo $max_year;
            
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

        foreach($hist as $key => $value) {
            echo $value;
            echo "\t\t";
            echo $key;
            echo 'rrnn';
        }
    }



}

?>
