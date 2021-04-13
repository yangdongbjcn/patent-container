<?php


class Event_Model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->library('yd/Yd_sql', NULL, 'yd_event');
        $this->yd_event->set_table_name('event');
        // $this->yd_event->set_fields_dict('e_id, e_u_eng_name, e_u_office, e_u_dept, 
        //     e_type, e_a_type, e_level, 
        //     e_begin_time, e_end_time, e_time, 
        //     e_content, e_statis,
        //     e_approver_eng_name');
    }

    public function get_last_levelup($e_u_eng_name, $e_a_type){
        $e_type = 'Agree';
        $where = "e_u_eng_name = '". $e_u_eng_name
            ."' and e_a_type = '". $e_a_type
            ."' and e_type = '". $e_type
            ."'";

        $last_levelup = $this->yd_event->query_more_order('e_time', TRUE, $where);

        if(empty($last_levelup)){
            $last_levelup_time = "";
        }else{
            $last_levelup_time = $last_levelup[0]['e_time'];
        }
        
        return $last_levelup_time;
    }

    public function get_last_levelups($e_u_eng_name){

        $last_levelup_time = 
            array('Law' => $this->get_last_levelup($e_u_eng_name, 'Law'),
                'Search' => $this->get_last_levelup($e_u_eng_name, 'Search'),
                'Exam' => $this->get_last_levelup($e_u_eng_name, 'Exam'),
                'Tech' => $this->get_last_levelup($e_u_eng_name, 'Tech'),
                'Eng' => $this->get_last_levelup($e_u_eng_name, 'Eng'),);

        return $last_levelup_time;
    }

    public function get_dept_statis() {
        $where = array('e_type' => 'Dept');
        $this->load->library('yd/Yd_lib');
        $where_string = $this->yd_lib->gen_dict_compare($where);
        $event = $this->Event_Model->yd_event->query_last_one('e_time', TRUE, $where_string);
        $json = $event['e_statis'];
        $counts = json_decode($json,true);
        return $counts;
    }
}

?>
