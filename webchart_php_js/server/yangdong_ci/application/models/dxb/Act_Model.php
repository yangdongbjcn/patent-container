<?php


class Act_Model extends CI_Model {

    // public $yd_sql;
    
    public function __construct() {
        parent::__construct();

        $this->load->library('yd/Yd_sql', NULL, 'yd_act');
        $this->yd_act->set_table_name('act');
    //     $this->yd_act->set_fields_dict('a_id, a_u_id, 
    //         a_type, a_level,
    //         a_code, a_sub_type, 
    //         a_content, a_time, a_credit,
    //         a_finished, a_approved, a_submitter');
    }
}

?>
