<?php


class Duty_Model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->library('yd/Yd_sql', NULL, 'yd_duty');
        $this->yd_duty->set_table_name('duty');
        // $this->yd_duty->set_fields_dict('u_eng_name, 
        //     d_examiner, d_office, d_dept, 
        //     d_search, d_law, d_tech, d_exam, d_eng, d_training, d_submitter,
        //     d_admin');
    }

    public function get_examiner_duty() {
        $u_duty['d_examiner'] = 1;
        $u_duty['d_search'] = 0;
        $u_duty['d_law'] = 0;
        $u_duty['d_exam'] = 0;
        $u_duty['d_tech'] = 0;
        $u_duty['d_eng'] = 0;
        $u_duty['d_submitter'] = 0;
        $u_duty['d_training'] = 0;
        $u_duty['d_office'] = 0;
        $u_duty['d_dept'] = 0;
        $u_duty['d_admin'] = 0;

        return $u_duty;
    }

    public function get_duty_by($u_eng_name) {
        $where = array('u_eng_name' => $u_eng_name);

        $duty = $this->yd_duty->query_one($where);

        if (! $duty) {
            $duty = $this->get_examiner_duty();
        }

        return $duty;
    }
}

?>
