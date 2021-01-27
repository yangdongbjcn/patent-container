<?php

/**
 * 检索
 * Encoding		:  UTF-8
 * Created on	:  2016-12-23 by xuxiao , xuxiao19861016@163.com
 */


error_reporting( E_ALL&~E_NOTICE );

class Search extends CI_Controller {


    public function __construct() {
        parent::__construct();

        $this->load->library('yd/Yd_sql', NULL, 'simple_sql');

        $this->load->model('yd/Patent_Data_Model');
    }
  
    public function index($info = '') {
    }

    /**
     *  获取导航树各节点的名字，如“设备-键盘”。
     */
    public function api_node_names(){

        $result =array();
        $field = "s_set_route";
        $where = "s_lib_type = 'data'";
        $table = "patent_search_set";

        $tmp = $this->simple_sql->table_query_more($table, $where, $field);
        if(!empty($tmp)){
            foreach ($tmp as $row) {
                array_push($result,$row["s_set_route"]);
            }
         }
        echo cf_json($result);
    }

    public function api_node_data($begin, $end){
        header("Content-type: text/html; charset=utf-8");

        $path = cf_yd_get_post($_POST['path']);
        $list_tables= $this->tf_get_tree_node_tables($path);

        $return = $this->tf_search_tables_order_limit($list_tables, '1', $begin, $end, $_POST);

        echo cf_json($return);
    }

    // public function api_node_all_data(){
    //     header("Content-type: text/html; charset=utf-8");
    //     $path = cf_yd_get_post($_POST['path']);
    //     $list_tables= $this->tf_get_tree_node_tables($path);
    //     $return = $this->tf_search_tables($list_tables, '1');
    //     echo cf_json($return);
    // }

    public function api_node_brief(){
        header("Content-type: text/html; charset=utf-8");

        $return = array();

        $path = cf_yd_get_post($_POST['path']);
        $list_tables = $this->tf_get_tree_node_tables($path);

        if (empty($list_tables)) return;

        $t_brief_fields = explode(',',$_POST['brief_fields']);

        $t_where_string = $_POST['where_string'];

        foreach ($t_brief_fields as $item) {
            $item = trim($item);
            $return[$item] = $this->tf_count_switch_field($item, $list_tables, $t_where_string);
        }

        echo cf_json($return);
    }

    public function tf_count_switch_field($item, $list_tables, $t_where_string){
        $return = array();
        if ($this->Patent_Data_Model->is_date_field($item)) {
            foreach ($list_tables as $i => $list_table) {
                $return[$i] = $this->simple_sql->table_groupby_count_year($list_table, $item, 'new_count',$t_where_string);    
            }                
            return $return;
        }

        if ($item == 't_pub_num') {
            foreach ($list_tables as $i => $list_table) {
                $return[$i] = $this->simple_sql->table_groupby_count_region($list_table, $item, 'new_count', $t_where_string);
            }
            return $return;
        }

        foreach ($list_tables as $i => $list_table) {
            $return[$i] = $this->simple_sql->table_groupby_count($list_table, $item, 'new_count', 50, $t_where_string);
        }
        return $return;
    }
    
    public function api_node_brief_applicant_date(){
        header("Content-type: text/html; charset=utf-8");

        $return = array();

        $path = cf_yd_get_post($_POST['path']);
        $list_tables = $this->tf_get_tree_node_tables($path);
        
        if (empty($list_tables)) return;
        
        $item = $_POST['brief_field'];
        $item = trim($item);

        
        if ($this->Patent_Data_Model->is_date_field($item)) {
            foreach ($list_tables as $i => $list_table) {
                $return[$i]  = $this->simple_sql->table_applicant_groupby2_count_year($list_table, 't_applicant_std', $item);
            }
        }
        
        echo cf_json($return);
    }

    public function api_node_brief_applicant_region(){
        header("Content-type: text/html; charset=utf-8");

        $return = array();

        $path = cf_yd_get_post($_POST['path']);
        $list_tables = $this->tf_get_tree_node_tables($path);

        if (empty($list_tables)) return;

        $item = $_POST['brief_field'];
        $item = trim($item);

        foreach ($list_tables as $i => $list_table) {                         
            $return[$i] = $this->simple_sql->table_applicant_groupby2_count_region($list_table, 't_applicant_std', $item);
        }

        echo cf_json($return);
    }

    public function api_node_brief_applicant(){
        header("Content-type: text/html; charset=utf-8");

        $return = array();

        $path = "";
        $list_tables = $this->tf_get_tree_node_tables($path);

        $t_applicant_std = cf_yd_get_post($_POST['t_applicant_std']);

        if (empty($list_tables)) return;

        $where_string = "t_applicant_std='" . $t_applicant_std . "'";

        $t_brief_fields = ['t_pub_num', 't_appli_date', 't_legal_valid', 't_fam_num', 't_tech_feature_num', 't_cite_patent_num', 't_cited_patent_num'];

        foreach ($t_brief_fields as $item) {
            $item = trim($item);
            $return[$item] = $this->tf_count_switch_field($item, $list_tables, $where_string);
        }
      
        echo cf_json($return);
    }


    /**
     * 获取待查询的表
    */
    private function tf_get_tree_node_tables($path){

        $list_tables = array();

        $where_string =  "s_lib_type = 'data'";
        $fields_string = "s_table_name, s_set_route";
        $t_all_tables = $this->simple_sql->table_query_more('patent_search_set', $where_string, $fields_string);

        if(empty($path)){
            foreach ($t_all_tables as $item){
                array_push($list_tables, $item["s_table_name"]);
            }
        }else{
            foreach ($t_all_tables as $item){
                $t_route = $item["s_set_route"];
                if ($this->tf_string_in($t_route, $path)) {
                    // array_push($list_tables, $item["s_table_name"]);
                    $list_tables[$t_route] = $item["s_table_name"];
                }
            }
        }
        return $list_tables;
    }

    private function tf_string_in($big_string, $small_string) {
        $t_len = strlen($small_string);
        $big_string1 = substr($big_string, 0, $t_len);
        if ($big_string1 == $small_string) {
            return true;
        }else{
            return false;
        }
    }
    
    
    private function tf_search_tables_order_limit($list_tables, $where, $begin, $end){

        $result_all = array();

        foreach ($list_tables as $list_table){

            $orderby = 't_id';
            $is_desc = FALSE;
            $tmp = $this->simple_sql->table_query_more_order_limit($list_table, $orderby, $is_desc, $begin, $end, $where);
            
            if(!empty($tmp)){
                $result_all = array_merge($result_all, $tmp);
            }
        }

        return $result_all;
    }

    public function tf_save_search_history($user_id, $keyword){
        if(!empty($user_id)  && !empty($keyword)){
            $data["h_user_id"] = $user_id;
            $data["h_search_input"] = $keyword;

            $this->simple_sql->table_insert_one("patent_search_history",$data);
        }
    }

    public function tf_load_last_search($user_id){
        $return = array();
        if(!empty($user_id)){
            $where_string = "h_user_id = '".$user_id."'";
            $result = $this->simple_sql->table_query_last_one("patent_search_history",'h_id', TRUE, $where_string);
            $return =  $result["h_search_input"];
        }

        return $return;
    }

    public function tf_load_search($h_id){
        $return = array();
        $where_array = array("h_id" => $h_id);
        $result = $this->simple_sql->table_query_one("patent_search_history",$where_array);
        $return =  $result["h_search_input"];
        return $return;
    }

    private function tf_search_tables($list_tables, $where){

        $result_all = array();
        
        if (!empty($list_tables)){

            foreach ($list_tables as $list_table){

                $tmp = $this->simple_sql->table_query_more($list_table,$where);

                if(!empty($tmp)){
                    $result_all = array_merge($result_all, $tmp);
                }
            }
        }

        return $result_all;
    }
   
    public function api_batch_search(){
        $pub_nums = explode(',',$_POST['pub_nums']);

        $this->load->library('yd/Yd_lib');
        $where = $this->yd_lib->gen_values_compare('t_pub_num', $pub_nums, 'like');

        $list_tables= $this->tf_get_tree_node_tables("");
        $return = $this->tf_search_tables($list_tables, $where);
        echo cf_json($return);
    }

    public function api_last_search(){

        $where = '';

        $user_id = cf_yd_get_post($_POST['user_id']);

        if(empty($user_id)){
            return;
        }
        
        $t_string = $this->tf_load_last_search($user_id);
        $t_posts = json_decode($t_string);

        $return = $this->tf_patent_search($t_posts);

        echo cf_json($return);
    }

    public function api_load_search(){

        $where = '';

        $h_id = cf_yd_get_post($_POST['h_id']);
        
        $t_string = $this->tf_load_search($h_id);
        $t_posts = json_decode($t_string);

        $return = $this->tf_patent_search($t_posts);

        echo cf_json($return);
    }

    public function api_patent_mining() {

        $this->load->model('yd/Map_World_Model');
        $nation_ids = $this->Map_World_Model->getNationIds();

        echo cf_json($nation_ids);
    }

    public function api_patent_search() {
        $t_posts = $this->tf_receive_post();

        $t_string = json_encode($t_posts, JSON_UNESCAPED_UNICODE);
        $this->tf_save_search_history($_POST['user_id'], $t_string);

        $return = $this->tf_patent_search($t_posts);

        echo cf_json($return);
    }

    private function tf_patent_search($p_posts) {
        $t_map = $this->tf_get_post_where_map();
        $where = $this->tf_gen_where_by_map($p_posts, $t_map);
        
        $t_tables = $p_posts->path;
        $list_tables= $this->tf_get_tree_node_tables($t_tables);

        $return = $this->tf_search_tables($list_tables, $where);

        return $return;
    }

    private function tf_receive_post(){
        if ($_POST['keyword']) {
            $_POST['keyword'] = urldecode($_POST['keyword']);
        }

        return $_POST;
    }

    private function tf_get_post_where_map(){
        $t_map = array();

        $t_map["keyword"] = ['t_title', 't_applicant', 't_inventor'];

        $t_fields_array = $this->Patent_Data_Model->yd_sql->get_fields_array();

        foreach ($t_fields_array as $t_field) {
            $t_map[$t_field] = [$t_field];
        }

        return $t_map;
    }

    private function tf_gen_where_by_map($p_posts, $p_map) {
        $t_dict_values = array();

        foreach ($p_posts as $key => $value) {

            if ($key == 'path') continue;
            if ($key == 'user_id') continue;

            if ($key == 'keyword') {
                $t_values = $this->tf_split_search_input($value);
                $t_words = $p_map[$key];
                foreach ($t_words as $t_word) {
                    $t_dict_values[$t_word] = $t_values;
                }
                continue;
            }

            $t_words = $p_map[$key];
            foreach ($t_words as $t_word) {
                $t_dict_values[$t_word] = [$value];
            }
        }
        $this->load->library('yd/Yd_lib');
        $where = $this->yd_lib->gen_dict_values_compare($t_dict_values);
        return $where;
    }

    private function tf_split_search_input($text) {
        $text_values = preg_split('/\s{1,}/', $text);
        return $text_values;
    }    


    public function api_add_favourite(){
  
        $user_id = cf_yd_get_post($this->input->get_post("id"));
        $pub_num = cf_yd_get_post($this->input->get_post("pub_num"));

        $where_array = array("f_user_id" =>$user_id);
        $table_name = "patent_search_favourite";
        $user = $this->simple_sql->table_query_one($table_name, $where_array);

        if(!empty($user)){

            $f_item = $user["f_item"];
            $userid =  $user["f_user_id"];

            $f_item_array = explode(',',$f_item);
            $is_in_fav = in_array($pub_num, $f_item_array);


            if($is_in_fav == 1){
                $this->return['statusCode'] = '400';
                $this->return['message'] = '已经收藏过了';
                echo cf_json($this->return);
                return;
            }

            if($is_in_fav == 0)
            {
                $where = array("f_user_id" => $user_id);
                $set = array("f_item" => $f_item.",".$pub_num);

                $this->simple_sql->table_modify_more("patent_search_favourite",$set,$where);

                $this->return['statusCode'] = '200';
                $this->return['message'] = '收藏成功';
                echo cf_json($this->return);
                return;
            }

        }else{
            $data = array();
            $data["f_user_id"] = $user_id;
            $data["f_item"] = $pub_num;

            $this->simple_sql->table_insert_one("patent_search_favourite", $data);
            
            $this->return['statusCode'] = '200';
            $this->return['message'] = '收藏成功';

            echo cf_json($this->return);  
            return;
        }

    }

    public function api_get_favourite(){

        $return =array();

        $user_id = cf_yd_get_post($this->input->get_post("id"));
        $where_array = array("f_user_id" => $user_id);

        $user = $this->simple_sql->table_query_one("patent_search_favourite", $where_array);

        if(empty($user)){
            echo cf_json($return);
            return;
        }

        $f_item = $user["f_item"];
        $pub_group = explode(',', $f_item);

        foreach ($pub_group as $key => $pub_num) {
            $tmp_array = array('t_pub_num' => $pub_num);
            array_push($return, $tmp_array);
        };
        echo cf_json($return);
    }

    public function api_del_favourite(){
        $user_id = cf_yd_get_post($this->input->get_post("id"));
        $pub_num = cf_yd_get_post($this->input->get_post("pub_num"));


        $where_array = array("f_user_id" => $user_id);

        $user = $this->simple_sql->table_query_one("patent_search_favourite", $where_array);

        if(!empty($user)){

            $f_item = $user["f_item"];

            if(empty($f_item))
                return;

            $userid =  $user["f_user_id"];

            $f_item_array = explode(',',$f_item);

            $is_in_fav = in_array($pub_num, $f_item_array);

            $del_pos = array_keys($f_item_array,$pub_num,true);

            $offset = array_keys($f_item_array,$pub_num,true);

            $pos = $offset[0];
            array_splice($f_item_array,$pos,1);

            //重组，用逗号连接
            $item = implode(',',$f_item_array);

            if(empty($item)){
                $where_array = array('f_user_id' => $user_id);
                $this->simple_sql->table_delete_one("patent_search_favourite",$where_array);

                $this->return['statusCode'] = '200';
                $this->return['message'] = '删除成功';
                echo cf_json($this->return);
                return;
            }

            $where = array("f_user_id" => $user_id);
            $set = array("f_item" => $item);
            $this->simple_sql->table_modify_more("patent_search_favourite",$set,$where);

            $this->return['statusCode'] = '200';
            $this->return['message'] = '删除成功';
            echo cf_json($this->return);
            return;
        }
    }

    public function api_get_search_history(){
        $user_id = cf_yd_get_post($this->input->get_post("id"));
        $where_string = "h_user_id = '" . $user_id . "'";

        $result = $this->simple_sql->table_query_more_order("patent_search_history", 'h_id', TRUE, $where_string);
        echo cf_json($result);        
    }

    public function api_available_fields(){

        $result =array();
        
        $t_fields_string = $this->Patent_Data_Model->get_groupby_fields_string();
        $t_fields_array = explode(',',$t_fields_string);


        foreach ($t_fields_array as $t_field) {
          array_push($result,$t_field);
        }

        echo cf_json($result);
    }

    
}

?>
