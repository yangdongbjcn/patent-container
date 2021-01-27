<?php

class Map_World_Model extends CI_Model {
    
    public function __construct() {
        parent::__construct();

        $this->load->library('yd/Yd_sql', NULL, 'map_world_sql');
        $this->map_world_sql->set_table_name('map_world');
        // $this->map_world_sql->set_fields_dict('m_longitude, m_latitude, 
        //     m_cn_name, m_en_name, m_nationid');
    }

    public function getNationIds() {
        $result = $this->map_world_sql->query_more('1', 'm_cn_name, m_en_name, m_nationid');
        return $result;
    }
}

?>