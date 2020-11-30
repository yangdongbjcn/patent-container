<?php

/**
 * 容器数据结构，二维矩阵
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class ydbj_matrix {
    private $CI;

    private $rows;
    private $cols;

    public function __construct() {
        $this->CI = & get_instance();

        $this->rows = array();
        $this->cols = array();

        log_message('debug', 'YdbjMatrix Class Initialized');
    }

    public function initRows($rows) {
        $this->rows = $rows;
        return $this;
    }

    public function initCols($cols) {
        $this->cols = $cols;
        return $this;
    }

    public function getRows() {
        return $this->rows;
    }

    public function getCols() {
        return $this->cols;
    }

    public function transRowsToCols() {
        $this->cols = $this->Transpose($this->rows);
        return $this;
    }

    public function transColsToRows() {
        $this->rows = $this->Transpose($this->cols);
        return $this;
    }

    public function getCol($col_num) {
        return $this->cols[$col_num];
    }

    public function addCol($col) {
        $this->cols[] = $col;
        return $this;
    }

    public function addColToRows($col) {
        foreach($this->rows as $i => &$row){
            $item = $col[$i];
            $row[] = $item;
        }
        return $this;
    }

    public function Transpose($rows) {
        $cols = array();
        $col_num = $this->GetColNum($rows);
        for($i=0; $i<$col_num; $i++) {
            $col = array();
            array_push($cols, $col);
        }
        for($i=0; $i<count($rows); $i++) {
            $row = $rows[$i];
            for($j=0; $j<count($row); $j++) {
                $item = $row[$j];
                $cols[$j][$i] = $item;
            }
        }   
        return $cols;
    }

    public function GetColNum($rows) {
        $row = $rows[0];
        $col_num = count($row);
        return $col_num;
    }

    public function SeperateRows($rows) {
        $rowss = array();
        // var_dump($rows);
        foreach($rows as $i => &$row){
            array_push($rowss, [$row]);
        }
        return $rowss;
    }
}

?>
