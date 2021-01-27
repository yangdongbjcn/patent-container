<?php

/**
 * 
 * Encoding		:  UTF-8
 * Created on	:  20200215 by YDBJ, yangdongbjcn@hotmail.com
 */


error_reporting( E_ALL&~E_NOTICE );

class ChartData extends CI_Controller {

    public function __construct() {
        parent::__construct();
       
    }

    public function index() {
    }

    public function apiKeysRowsToDictRows() {
        $keys = $this->input->post('keys');
        $rows = $this->input->post('rows');
        // var_dump($keys);
        // var_dump($rows);

        if (count($keys)!=count($rows[0])) {
            echo cf_json('数据个数不等');
            return;
        }

        $this->load->library('yd/Yd_frame');
        $this->yd_frame->initKeysLists($keys, $rows);
        $dicts = $this->yd_frame->getDicts();
        echo cf_json($dicts);
    }

    public function apiKeysColsToDictRows() {
        $keys = $this->input->post('keys');
        $cols = $this->input->post('cols');

        if (count($cols[0])!=count($cols[1])) {
            echo cf_json('数据个数不等');
            return;
        }

        $this->load->library('yd/Yd_frame');
        $this->yd_frame->initKeysClists($keys, $cols);
        $dicts = $this->yd_frame->getDicts();
        echo cf_json($dicts);
    }

    public function apiColsToMat() {
        $cols = $this->input->post('cols');

        if (count($cols[0])!=count($cols[1])) {
            echo cf_json('数据个数不等');
            return;
        }

        $this->load->library('yd/Yd_mat');
        $this->yd_mat->init($cols);
        $rows = $this->yd_mat->Transpose();
        echo cf_json($rows);
    }

    public function apiEmpty() {
        echo '';
    }

    public function apiFrameToScatterMat() {
        $keys = $this->input->post('keys');
        $index = $this->input->post('index');
        $rows = $this->input->post('rows');

        // var_dump($rows);

        $this->load->library('yd/Yd_mat');
        $rowss = $this->tf_rows_to_array($rows);
        $indexx = $this->tf_rows_to_array($index);

        $series = array();
        for($i=0; $i<count($rowss); $i++) {
            $scatter = $this->tf_frame_to_scatter_array($keys, $indexx[$i], $rowss[$i]);
            array_push($series, $scatter);
        }
        echo cf_json($series);
    }

    private function tf_rows_to_array($rows) {
        $rowss = array();
        foreach($rows as $i => $row){
            array_push($rowss, [$row]);
        }
        return $rowss;
    }



    public function tf_frame_to_scatter_array($keys, $index, $rows) {

        $this->load->library('yd/Yd_frame');
        $this->yd_frame->initKeysLists($keys, $rows);
        $this->yd_frame->setNames($index);
        $rows = $this->yd_frame->toScatter();

        $this->load->library('yd/Yd_mat');
        $this->yd_mat->init($rows);
        $col = $this->yd_mat->getClist(2);
        $this->yd_mat->pushClist($col);
        $rows = $this->yd_mat->get();
 
        return $rows;
    }
}


?>
