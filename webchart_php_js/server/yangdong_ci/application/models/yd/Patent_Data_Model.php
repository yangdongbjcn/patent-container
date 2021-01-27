<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * 索引表的数据库操作模型
 * @since 2014-02-15
 * @author xuxiao <xuxiao19861016@163.com>
 * @since 2020-05-01
 * @author YDBJ <yangdongbjcn@hotmail.com>
 */
class Patent_Data_Model extends CI_Model {

    public function __construct() {
        parent::__construct();

        $this->load->library('yd/Yd_sql');

        $this->yd_sql->add_fields_dict('t_id', 'ID');
        $this->yd_sql->add_fields_dict('t_pub_num', '公开号');
        $this->yd_sql->add_fields_dict('t_appli_num', '申请号');
        $this->yd_sql->add_fields_dict('t_title', '标题');
        $this->yd_sql->add_fields_dict('t_appli_date', '申请日');
        $this->yd_sql->add_fields_dict('t_pub_date', '公开日');
        $this->yd_sql->add_fields_dict('t_grant_date', '授权日');
        $this->yd_sql->add_fields_dict('t_applicant', '申请人');
        $this->yd_sql->add_fields_dict('t_applicant_std', '标准化申请人');
        $this->yd_sql->add_fields_dict('t_inventor', '发明人');
        $this->yd_sql->add_fields_dict('t_inventor1', '第一发明人');
        $this->yd_sql->add_fields_dict('t_legal_valid', '法律有效性');
        $this->yd_sql->add_fields_dict('t_ipc', 'IPC分类号');
        $this->yd_sql->add_fields_dict('t_ipc1', '第一IPC大组');
        $this->yd_sql->add_fields_dict('t_claim_num', '权利要求数');
        $this->yd_sql->add_fields_dict('t_tech_feature_num', '特征度');
        $this->yd_sql->add_fields_dict('t_fam_num', '同族数');
        $this->yd_sql->add_fields_dict('t_cite_patent_num', '引用数');
        $this->yd_sql->add_fields_dict('t_cited_patent_num', '被引用数');
        $this->yd_sql->add_fields_dict('t_cite_self_patent_num', '引用自己数');
        $this->yd_sql->add_fields_dict('t_cite_others_patent_num', '引用其他数');
        $this->yd_sql->add_fields_dict('t_cited_self_patent_num', '被自己引用数');
        $this->yd_sql->add_fields_dict('t_cited_others_patent_num', '被其他其他引用数');
    }

    public function get_date_fields() {
        return ['t_pub_date','t_appli_date','t_grant_date'];
    }

    public function is_date_field($field_name) {
        $t_fields = $this->get_date_fields();

        return array_search($field_name, $t_fields);
    }

    public function get_region_fields() {
        return ['t_pub_num','t_appli_num'];
    }

    public function is_region_field($field_name) {
        $t_fields = $this->get_region_fields();
        return array_search($field_name, $t_fields);
    }

    public function get_ipc_fields() {
        return ['t_ipc','t_ipc1'];
    }

    public function get_cite_fields() {
        return ['t_cite_patent_num','t_cited_patent_num','t_cite_self_patent_num','t_cite_others_patent_num','t_cited_self_patent_num','t_cited_others_patent_num'];
    }

    public function get_num_fields() {
        return ['t_claim_num', 't_fam_num', 't_tech_feature_num'];
    }

}

 
?>