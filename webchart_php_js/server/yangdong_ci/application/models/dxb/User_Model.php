<?php


class User_Model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->library('dxb/training_lib');

        $this->load->library('yd/Yd_sql', NULL, 'yd_user');
        $this->yd_user->set_table_name('user');
        // $this->yd_user->set_fields_dict('u_id, u_name, u_eng_name, u_psd, 
        //     u_office, u_dept, u_role, u_code, u_job_id, u_openid, u_json, 
        //     u_tech_level,u_eng_level,u_search_level,
        //     u_law_level,u_exam_level,
        //     u_tech_credit,u_eng_credit,u_search_credit,
        //     u_law_credit,u_exam_credit,
        //     u_tech_isapply, u_eng_isapply, u_search_isapply,
        //     u_law_isapply, u_exam_isapply');
    }

    public function save_to_cookie($data)
    {
        if (is_array($data))
        {
            foreach ($data as $key => &$value)
            {
                $this->input->set_cookie($key,$value,172800);
            }

            return;
        }
    }

    public function delete_cookie($data)
    {
        if (is_array($data))
        {
            foreach ($data as $key => &$value)
            {
                $this->input->set_cookie($key,'','');
            }

            return;
        }
    }

    public function check_cookie($key) {

        if(!isset($_COOKIE[$key])){
            return NULL;
        } else {
            return array($key => $_COOKIE[$key]);
        }
    }

    public function trans_to_user_pro($user) {
        $user['level']['Search'] = $user['u_search_level'];
        $user['level']['Exam'] = $user['u_exam_level'];
        $user['level']['Law'] = $user['u_law_level'];
        $user['level']['Tech'] = $user['u_tech_level'];
        $user['level']['Eng'] = $user['u_eng_level'];

        $user['credit']['Search'] = $user['u_search_credit'];
        $user['credit']['Exam'] = $user['u_exam_credit'];
        $user['credit']['Law'] = $user['u_law_credit'];
        $user['credit']['Tech'] = $user['u_tech_credit'];
        $user['credit']['Eng'] = $user['u_eng_credit'];

        $user['isapply']['Search'] = $user['u_search_isapply'];
        $user['isapply']['Exam'] = $user['u_exam_isapply'];
        $user['isapply']['Law'] = $user['u_law_isapply'];
        $user['isapply']['Tech'] = $user['u_tech_isapply'];
        $user['isapply']['Eng'] = $user['u_eng_isapply'];

        return $user;
    }

    public function trans_user_pro($user) {
        $user['u_search_level'] = $user['level']['Search'];
        $user['u_exam_level'] = $user['level']['Exam'];
        $user['u_law_level'] = $user['level']['Law'];
        $user['u_tech_level'] = $user['level']['Tech'];
        $user['u_eng_level'] = $user['level']['Eng'];

        $user['u_search_credit'] = $user['credit']['Search'];
        $user['u_exam_credit'] = $user['credit']['Exam'];
        $user['u_law_credit'] = $user['credit']['Law'];
        $user['u_tech_credit'] = $user['credit']['Tech'];
        $user['u_eng_credit'] = $user['credit']['Eng'];

        $user['u_search_isapply'] = $user['isapply']['Search'];
        $user['u_exam_isapply'] = $user['isapply']['Exam'];
        $user['u_law_isapply'] = $user['isapply']['Law'];
        $user['u_tech_isapply'] = $user['isapply']['Tech'];
        $user['u_eng_isapply'] = $user['isapply']['Eng'];
        
        return $user;
    }

    public function trans_to_type_level($a_type) {
        switch ($a_type ){
            case 'Tech':
                $name = 'u_tech_level';
               break;
            case 'Eng':
                $name = 'u_eng_level';
                break;
            case 'Search':
                $name = 'u_search_level';
                break;
            case 'Law':
                $name = 'u_law_level';
                break;
            case 'Exam':
                $name = 'u_exam_level';
                break;
        }
        return $name;
    }

    public function trans_to_type_credit($a_type) {
        switch ($a_type ){
            case 'Tech':
                $name = 'u_tech_credit';
               break;
            case 'Eng':
                $name = 'u_eng_credit';
                break;
            case 'Search':
                $name = 'u_search_credit';
                break;
            case 'Law':
                $name = 'u_law_credit';
                break;
            case 'Exam':
                $name = 'u_exam_credit';
                break;
        }
        return $name;
    }

    public function trans_to_type_isapply($a_type) {
        switch ($a_type ){
            case 'Tech':
                $name = 'u_tech_isapply';
               break;
            case 'Eng':
                $name = 'u_eng_isapply';
                break;
            case 'Search':
                $name = 'u_search_isapply';
                break;
            case 'Law':
                $name = 'u_law_isapply';
                break;
            case 'Exam':
                $name = 'u_exam_isapply';
                break;
        }
        return $name;
    }

    public function query_examiners($where = '1'){

        $sql_string = "(u_role= 'role_Examiner')";

        $sql_string = $sql_string . ' and (' . $where . ')';

        return $this->yd_user->query_more($sql_string); 
    }


    public function count_examiner($field, $values, $where='1') {

        foreach ($values as $t_value){        

            $where_string = $where . ' and ' . $field . '=' . "'" . $t_value . "'";
            
            $result = $this->query_examiners($where_string);

            $count[$t_value] = count($result); 
        }
        return $count;
    }

    public function count_examiner_level($field, $where='1') {

        $values = array('1','2','3','4','5');
        return $this->count_examiner($field, $values, $where);
    }

    public function count_examiners($where = '1'){
        
        $counts['Search'] = $this->count_examiner_level('u_search_level', $where);

        $counts['Exam'] = $this->count_examiner_level('u_exam_level', $where);

        $counts['Law'] = $this->count_examiner_level('u_law_level', $where);        

        $counts['Tech'] = $this->count_examiner_level('u_tech_level', $where);

        $counts['Eng'] = $this->count_examiner_level('u_eng_level', $where);

        return $counts;
    
    }


    public function add_credit($u_eng_name, $a_type, $a_credit){
        $where = array('u_eng_name' => $u_eng_name);
        $user = $this->yd_user->query_one($where);

        switch ($a_type ){
            case 'Tech':
                $credit = $user['u_tech_credit'] + $a_credit;
                $set = array('u_tech_credit'=>$credit);
               break;
            case 'Eng':
                $credit = $user['u_eng_credit'] + $a_credit;
                $set = array('u_eng_credit'=>$credit);
                break;
            case 'Search':
                $credit = $user['u_search_credit'] + $a_credit;
                $set = array('u_search_credit'=>$credit);
                break;
            case 'Law':
                $credit = $user['u_law_credit'] + $a_credit;
                $set = array('u_law_credit'=>$credit);
                break;
            case 'Exam':
                $credit = $user['u_exam_credit'] + $a_credit;
                $set = array('u_exam_credit'=>$credit);
                break;
        }

        $where = array('u_eng_name'=>$u_eng_name);

        if( $this->yd_user->modify_more($set,$where) ){
            return TRUE;
        }else{
            return FALSE;
        }
    }

    public function del_credit($u_eng_name, $a_type, $a_credit){
        $where = array('u_eng_name' => $u_eng_name);
        $user = $this->yd_user->query_one($where);

        switch ($a_type ){
            case 'Tech':
                $credit = $user['u_tech_credit'] + $a_credit;
                $set = array('u_tech_credit'=>$credit);
               break;
            case 'Eng':
                $credit = $user['u_eng_credit'] + $a_credit;
                $set = array('u_eng_credit'=>$credit);
                break;
            case 'Search':
                $credit = $user['u_search_credit'] + $a_credit;
                $set = array('u_search_credit'=>$credit);
                break;
            case 'Law':
                $credit = $user['u_law_credit'] + $a_credit;
                $set = array('u_law_credit'=>$credit);
                break;
            case 'Exam':
                $credit = $user['u_exam_credit'] + $a_credit;
                $set = array('u_exam_credit'=>$credit);
                break;
        }

        $where = array('u_eng_name'=>$u_eng_name);

        if( $this->yd_user->modify_more($set,$where) ){
            return TRUE;
        }else{
            return FALSE;
        }
    }

    // user.php 和 dept.php 公用的函数
    public function get_levels($user){

        $user_pro = $this->trans_to_user_pro($user);
        $types = $this->training_lib->g_types;
        foreach ($types as $type => $type_chn){
            $user_levelups[$type] = array('isapply' => $user_pro['isapply'][$type],
                                            'credit'=> $user_pro['credit'][$type],
                                            'level'=> $user_pro['level'][$type]); 
        }

        return $user_levelups;
    }


}

?>
