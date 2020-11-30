<?php

/**
 * 
 * Encoding		:  UTF-8
 * Created on	:  20200215 by YDBJ, yangdongbjcn@hotmail.com
 */


error_reporting( E_ALL&~E_NOTICE );

class DataTransform extends CI_Controller {

    public function __construct() {
        parent::__construct();
       
    }

    public function index() {
    }

    public function apiKeysColsToDictRows() {
        $keys = $this->input->post('keys');
        $cols = $this->input->post('cols');

        if (count($cols[0])!=count($cols[1])) {
            echo JSON('数据个数不等');
            return;
        }

        $this->load->library('ydbj_frame');
        $this->ydbj_frame->initKeysCols($keys, $cols);
        $dict_rows = $this->ydbj_frame->getDictRows();
        echo JSON($dict_rows);
    }

    public function apiColsToMat() {
        $cols = $this->input->post('cols');

        if (count($cols[0])!=count($cols[1])) {
            echo JSON('数据个数不等');
            return;
        }

        $this->load->library('ydbj_matrix');
        $this->ydbj_matrix->initCols($cols);
        $rows = $this->ydbj_matrix->transColsToRows()->getRows();
        echo JSON($rows);
    }

    public function apiEmpty() {
        echo '';
    }

    public function apiFrameToScatterSeries() {
        $keys = $this->input->post('keys');
        $index = $this->input->post('index');
        $rows = $this->input->post('rows');

        $this->load->library('ydbj_matrix');
        $rowss = $this->ydbj_matrix->SeperateRows($rows);
        $indexx = $this->ydbj_matrix->SeperateRows($index);

        $series = array();
        for($i=0; $i<count($rowss); $i++) {
            $scatter = $this->FrameToScatter($keys, $indexx[$i], $rowss[$i]);
            array_push($series, $scatter);
        }
        echo JSON($series);
    }


    public function FrameToScatter($keys, $index, $rows) {
        $this->load->library('ydbj_frame');
        $this->ydbj_frame->initKeysRows($keys, $rows);
        $this->ydbj_frame->setIndex($index);
        $rows = $this->ydbj_frame->toScatter();

        $this->load->library('ydbj_matrix');
        $this->ydbj_matrix->initRows($rows);
        $this->ydbj_matrix->transRowsToCols();
        $col = $this->ydbj_matrix->getCol(2);
        $this->ydbj_matrix->addCol($col);
        $this->ydbj_matrix->transColsToRows();
        $rows = $this->ydbj_matrix->getRows();        
        return $rows;
    }

    // public function apiFrameToScatter() {
    //     $keys = $this->input->post('keys');
    //     $index = $this->input->post('index');
    //     $rows = $this->input->post('rows');

    //     $scatter = $this->FrameToScatter($keys, $index, $rows);
    //     echo JSON($scatter);
    // }

}

function JSON($array) {  
    $json = json_encode($array);  
    return urldecode($json);  
}

?>
