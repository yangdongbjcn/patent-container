<?php


class Daily_Model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->library('yd/Yd_sql', NULL, 'yd_daily');
        $this->yd_daily->set_table_name('daily');
        // $this->yd_daily->set_fields_dict('d_id,d_type,d_sub_type,d_date,d_enddate,d_title,d_url,d_submitter,d_comment');
    }  
    
}

?>
