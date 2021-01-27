<?php

/**
 * 检索
 * Encoding		:  UTF-8
 * Created on	:  2019-7-11 by YDBJ, yangdongbjcn@hotmail.com
 */


error_reporting( E_ALL&~E_NOTICE );

class SearchInput extends CI_Controller {

    private $indent = '    ';

    public function __construct() {
        parent::__construct();
       
    }

    public function index() {
    }

    public function apiFormatSearchInput() {
        $text = $this->input->post('text');

        $text = $this->formatSearchInput($text);
    }

    public function formatSearchInput($text) {
        $text = $this->cleanSearchInput($text);

        // $text = '(' . $text . ')';
        $text = $this->matchBracketsIteratively($text, 0);
        return $text;
    }

    public function cleanSearchInput($str) {
        $str = str_replace("（", "(", $str);
        $str = str_replace("）", ")", $str);
        $str = str_replace("\n", "", $str);

        $indent = $this->indent;
        $str = str_replace($indent, "", $str);
        return $str;
    }

    public function matchBracketsIteratively($text, $depth) {
        $indent = $this->indent;

        if ($depth < 0) {
            echo '【' . $text . '《缩进为负值》】';
            return $depth;
        }

        $first_right = $this->isPos($text, ')');

        $first_left = $this->isPos($text, '(');

        if (($first_left==-1) and ($first_right==-1)){
            echo str_repeat($indent, $depth);
            echo $text;
            return $depth;
        }

        if (($first_left!=-1) and ($first_right==-1)){
            echo str_repeat($indent, $depth);
            echo '【' . $text . '《有左括号但没有右括号》】';
            return $depth;
        }

        if (($first_left==-1) and ($first_right!=-1)){

            $before_first_right = substr($text, 0, $first_right);
            $after_first_right = substr($text, $first_right + 1); 

            if (strlen($before_first_right)>0){
                echo str_repeat($indent, $depth);
                echo $before_first_right;
                echo 'rrrrnnnn';
            }

            $depth = $depth - 1;
            echo str_repeat($indent, $depth);
            echo ')';
            echo 'rrrrnnnn';
            if (strlen($after_first_right)>0) {
                $depth = $this->matchBracketsIteratively($after_first_right, $depth);
            }
        }

        if (($first_left!=-1) and ($first_right!=-1)){

            $before_first_left = substr($text, 0, $first_left);
            $after_first_left = substr($text, $first_left + 1);

            $from_first_left_to_first_right = substr($text, $first_left, $first_right-$first_left+1);

            $until_first_right = substr($text, 0, $first_right + 1);
            $after_first_right = substr($text, $first_right + 1);  

            if ($first_right < $first_left) {
                $depth = $depth - 1;    //结束右括号，深度上升一层
                echo str_repeat($indent, $depth);
                
                echo $until_first_right;

                echo 'rrrrnnnn';
                // var_dump('【' . $after_first_right . '】');

                $depth = $this->matchBracketsIteratively($after_first_right, $depth);
            }

            if ($first_left < $first_right) {
                if (strlen($before_first_left)>0){
                    echo str_repeat($indent, $depth);
                    echo $before_first_left;
                    echo 'rrrrnnnn';
                }
                
                echo str_repeat($indent, $depth);

                $second_left = $this->find2nd($text, '(');

                if ($second_left==-1) {
                    echo $from_first_left_to_first_right;
                    echo 'rrrrnnnn';
                    // echo str_repeat($indent, $depth);
                    // echo $after_first_right;
                    if (strlen($after_first_right)>0) {
                        $depth = $this->matchBracketsIteratively($after_first_right, $depth);
                    }else{
                        return $depth; //结束右括号，但没有进入迭代，所以不必深入一层
                    }
                }

                if (($second_left!=-1) and ($first_right<$second_left)) {


                    echo $from_first_left_to_first_right;
                    echo 'rrrrnnnn';
                    // var_dump('【' . $after_first_right . '】');
                    $depth = $this->matchBracketsIteratively($after_first_right, $depth); //结束右括号，但没有进入迭代，所以不必深入一层
                }

                if (($second_left!=-1) and ($second_left<$first_right)) {
                    $between_12_left = substr($text, $first_left, $second_left-$first_left);    //20190712YDBJ 注意不是y-x+1
                    echo $between_12_left;
                    echo 'rrrrnnnn';

                    $from_first_left = substr($text, $second_left);
                    // var_dump('【' . $from_first_left . '】');
                    $depth = $this->matchBracketsIteratively($from_first_left, $depth+1);   //两个左括号，深度下降一层
                }
            
            }

        }        
    }

    private function isPos($text, $substr){
        if (strlen($text)<1) {
            return -1;
        }
        if (strlen($substr)<1) {
            return -1;
        }

        $text_begin = substr($text, 0, strlen($substr));
        if ($text_begin == $substr) {
            return 0;
        }else{
            $pos = strpos($text, $substr);
            if (!$pos){
                return -1;
            }
            return $pos;
        }   
    }

    private function find2nd($text, $substr) {
        if (strlen($text)<1) {
            return -1;
        }
        if (strlen($substr)<1) {
            return -1;
        }

        $pos1 = $this->isPos($text, $substr);
        if ($pos1 == -1){
            return -1;
        }

        $text2 = substr($text, $pos1 + 1);
        $pos2 = $this->isPos($text2, $substr);
        if ($pos2 == -1){
            return -1;
        }else{
            $pos2 = $pos1 + 1 + $pos2;
            return $pos2;
        }
    }
}

?>
