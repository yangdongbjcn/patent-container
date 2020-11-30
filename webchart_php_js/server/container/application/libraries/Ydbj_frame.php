<?php

/**
 * 容器数据结构，二维框架
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class ydbj_frame {
    private $CI;

    private $dict_rows;
    // private $dict_cols;
    private $index;
    private $keys;
    private $rows;

    public function __construct() {
        $this->CI = & get_instance();

        $this->dict_rows = array();
        // $this->dict_cols = array();
        $this->index = array();
        $this->keys = array();
        $this->rows = array();

        log_message('debug', 'YdbjFrame Class Initialized');
    }

    public function initDictRows($dict_rows) {
        $this->dict_rows = $dict_rows;
        $this->keys = $this->GenKeys($dict_rows);
        $this->rows = $this->GenRows($dict_rows);

        // $this->CI->load->library('ydbj_matrix');
        // $this->cols = $this->CI->ydbj_matrix->Transpose($rows);
        // $this->dict_cols = $this->GenDictCols($this->keys, $cols);
        return $this;
    }

    public function initKeysCols($keys, $cols) {
        $this->keys = $keys;

        $this->CI->load->library('ydbj_matrix');
        $this->rows = $this->CI->ydbj_matrix->Transpose($cols);
        $this->dict_rows = $this->GenDictRows($keys, $this->rows);
        return $this;
    }

    public function initKeysRows($keys, $rows) {
        $this->keys = $keys;
        $this->rows = $rows;
        $this->dict_rows = $this->GenDictRows($keys, $rows);
        
        return $this;
    }

    public function GenKeys($dict_rows) {
        $dict_row = $dict_rows[0];
        $keys = array_keys($dict_row);
        return $keys;
    }

    public function GenRows($dict_rows) {
        $rows = array();
        for($i=0; $i<count($dict_rows); $i++) {
            $dict_row = $dict_rows[$i];
            $row = array_values($dict_row);
            array_push($rows, $row);
        }
        return $rows;
    }

    public function GenDict($keys, $values) {
        $dict_row = array();
        for($i=0; $i<count($keys); $i++) {
            $key = $keys[$i];
            $value = $values[$i];
            $dict_row[$key] = $value;
        }
        return $dict_row;
    }

    public function GenDictRows($keys, $rows) {
        $dict_rows = array();
        for($i=0; $i<count($rows); $i++) {
            $row = $rows[$i];
            $dict_row = $this->GenDict($keys, $row);
            array_push($dict_rows, $dict_row);
        }
        return $dict_rows;
    }

    // public function GenDictCols($keys, $cols) {
    //     $dict_cols = array();
    //     for($i=0; $i<count($keys); $i++) {
    //         $key = $keys[$i];
    //         $col = $cols[$i];
    //         $dict_cols[$key] = $col;
    //     }
    //     return $dict_cols;
    // }


    public function setIndex($index) {
        $this->index = $index;
        return $this;
    }

    public function getDictRows() {
        return $this->dict_rows;
    }

    public function toScatter() {
        $rows = $this->rows;
        $keys = $this->keys;
        $index = $this->index;
        $array_rows = array();
        for($i=0; $i<count($rows); $i++) {
            $this_row = $rows[$i];
            for($j=0; $j<count($this_row); $j++) {
                $node = array();
                array_push($node, $keys[$j]);
                array_push($node, $index[$i]);
                array_push($node, $this_row[$j]);
                // array_push($node, $this_row[$j]);
                array_push($array_rows, $node);
          }
        }
        return $array_rows;
    }
}

?>
