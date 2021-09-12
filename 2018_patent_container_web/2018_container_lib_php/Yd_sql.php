<?php

/**
 * 容器数据结构：操作SQL数据库
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190901
 */

class yd_sql {

    private $table_name;
    private $fields_dict;
    
    public function __construct() {
        $this->CI = & get_instance();
        $this->CI->load->library('yd/Yd_lib');

        $this->get_db();

        $this->fields_dict = array();
    }

    /**
     * 选择数据库组
     * @param type $dbgroup 数据库组
     */
    public function get_db($dbgroup = 'default') {
        $this->db = $this->CI->load->database($dbgroup, TRUE);
    }

    public function set_table_name($table_name) {
        $this->table_name = $table_name;
    }
    
    public function get_table_name() {
        return $this->table_name;
    }

    public function set_fields_dict($fields_dict){
        $this->fields_dict = $fields_dict;
    }

    public function get_fields_dict(){
        return $this->fields_dict;
    }

    public function add_fields_dict($field_name, $field_meaning){
        $this->fields_dict = $this->fields_dict + [$field_name => $field_meaning];
    }

    public function get_fields_array(){
        $fields_dict = $this->get_fields_dict();
        $fields_array = $keys = array_keys($fields_dict);
        return $fields_array;
    }

    public function table_query_one($table_name, $where_array, $fields_string = '*'){
        $this->set_table_name($table_name);
        return $this->query_one($where_array, $fields_string); 
    }

    public function query_one($where_array, $fields_string = '*'){
        $table_name = $this->get_table_name();
        $this->db->select($fields_string);
        $this->db->where($where_array);
        $query = $this->db->get($table_name);
        return $query->row_array() ? $query->row_array() : array();
    }

    public function table_query_last_one($table_name, $orderby, $is_desc, $where_string, $fields_string = '*'){
        $this->set_table_name($table_name);
        return $this->query_last_one($orderby, $is_desc, $where_string, $fields_string); 
    }

    public function query_last_one($orderby, $is_desc, $where_string = '1', $fields_string = '*'){
        $more = $this->query_more_order($orderby, $is_desc, $where_string, $fields_string);
        $last_one = $more[0];     
        return $last_one;
    }

    public function table_query_more($table_name, $where_string = '1', $fields_string = '*'){
        $this->set_table_name($table_name);
        return $this->query_more($where_string, $fields_string); 
    }

    public function query_more($where_string = '1', $fields_string = '*'){
        $select_string = 'select ';
        $table_name = $this->get_table_name();
        $from_string = ' from ' . $table_name . ' where ( ';
        $end_string = ' )';      
        $sql_string = $select_string . $fields_string . $from_string . $where_string . $end_string;
        $result = $this->db->query($sql_string)->result_array();
        return $result ? $result : array(); 
    }

    public function table_query_more_order($table_name, $orderby, $is_desc, $where_string = '1', $fields_string = '*'){
        $this->set_table_name($table_name);
        return $this->query_more_order($orderby, $is_desc, $where_string, $fields_string); 
    }

    public function query_more_order($orderby, $is_desc, $where_string = '1', $fields_string = '*'){
        $orderby_string = $this->CI->yd_lib->gen_orderby($orderby, $is_desc);
        $table_name = $this->get_table_name();
        $sql_string = $this->CI->yd_lib->gen_select($fields_string, $table_name, $where_string, $orderby_string, '');
        $result = $this->db->query($sql_string)->result_array();
        return $result ? $result : array(); 
    }

    public function table_query_more_order_limit($table_name, $orderby, $is_desc, $begin, $end, $where_string = '1', $fields_string = '*'){
        $this->set_table_name($table_name);
        return $this->query_more_order_limit($orderby, $is_desc, $begin, $end, $where_string, $fields_string); 
    }

    public function query_more_order_limit($orderby, $is_desc, $begin, $end, $where_string = '1', $fields_string = '*'){     
        $orderby_string = $this->CI->yd_lib->gen_orderby($orderby, $is_desc);
        $limit_string = $this->CI->yd_lib->gen_limit($begin, $end);
        $table_name = $this->get_table_name();
        $sql_string = $this->CI->yd_lib->gen_select($fields_string, $table_name, $where_string, $orderby_string, $limit_string);
        $result = $this->db->query($sql_string)->result_array();
        return $result ? $result : array(); 
    }

    public function table_modify_more($table_name, $set, $where_array) {
        $this->set_table_name($table_name);
        return $this->modify_more($set, $where_array);
    }

    public function modify_more($set, $where_array) {
        $table_name = $this->get_table_name();
        $this->db->update($table_name,$set,$where_array);
        return $this->db->affected_rows();
    }

    public function table_insert_one($table_name, $values_array) {
        $this->set_table_name($table_name);
        return $this->insert_one($values_array);
    }

    public function insert_one($values_array) {
        $table_name = $this->get_table_name();
        $this->db->insert($table_name, $values_array);
        return $this->db->insert_id();
    }

    public function table_query_insert_one($table_name, $where_array, $values_array) {
        $this->set_table_name($table_name);
        return $this->query_insert_one($where_array, $values_array);
    }

    public function query_insert_one($where_array, $values_array) {
        if ($one = $this->query_one($where_array)) {
            return $one;
        }else{
            return $this->insert_one($values_array);
        }
    }

    public function table_delete_one($table_name, $where_array) {
        $this->set_table_name($table_name);
        return $this->delete_one($where_array);
    }

    public function delete_one($where_array) {
        $table_name = $this->get_table_name();
        $this->db->delete($table_name, $where_array);
        return $this->db->affected_rows();
    } 

    public function table_groupby_count($table_name, $groupby_field, $count_field = 'new_count', $appl_count_limit = 20, $where_string = '1') {


        $having = ' HAVING ' . $count_field . ' >= ' . $appl_count_limit;       
        $sql_string = $this->CI->yd_lib->gen_count($groupby_field, $groupby_field . $having, 'new_count', 'new_count DESC', $table_name, $where_string);
        // var_dump($sql_string);

        $result = $this->db->query($sql_string)->result_array();
        return $result ? $result : array(); 
    }

    public function table_groupby_count_year($table_name, $groupby_field, $count_field = 'new_count', $where_string = '1') {
        $new_groupby_field_as = "YEAR(" . $groupby_field . ') as ' . $groupby_field;
        $new_groupby_field = "YEAR(" . $groupby_field . ') ';

        $sql_string = $this->CI->yd_lib->gen_count($new_groupby_field_as, $new_groupby_field, 'new_count', $new_groupby_field, $table_name, $where_string);

        $result = $this->db->query($sql_string)->result_array();
        return $result ? $result : array(); 
    }

    public function table_groupby_count_region($table_name, $groupby_field, $count_field = 'new_count', $where_string = '1') {
        $new_groupby_field_as = "LEFT(" . $groupby_field . ',2) as ' . $groupby_field;
        $new_groupby_field = "LEFT(" . $groupby_field . ',2) ';

        $sql_string = $this->CI->yd_lib->gen_count($new_groupby_field_as, $new_groupby_field, 'new_count', $new_groupby_field, $table_name, $where_string);

        $result = $this->db->query($sql_string)->result_array();
        return $result ? $result : array(); 
    }

    public function table_applicant_groupby2_count_year($table_name, $appl_field, $groupby_field, $count_field = 'new_count') {
        $groupby_field_string = "YEAR(" . $groupby_field . ')';
        $new_groupby_field_as =  $appl_field . ', ' . $groupby_field_string . ' as ' . $groupby_field;
        $new_groupby_field = $appl_field . ', ' . $groupby_field_string;

        $sql_string = $this->CI->yd_lib->gen_count($new_groupby_field_as, $new_groupby_field . $having, $count_field, $new_groupby_field, $table_name, '1');

        // var_dump($sql_string);

        $result = $this->db->query($sql_string)->result_array();
        return $result ? $result : array(); 
    }

    public function table_applicant_groupby2_count_region($table_name, $appl_field, $groupby_field, $count_field = 'new_count') {
        $groupby_field_string = "LEFT(" . $groupby_field . ',2)';
        $new_groupby_field_as = $appl_field . ', ' . $groupby_field_string . ' as ' . $groupby_field;
        $new_groupby_field = $appl_field . ', ' . $groupby_field_string;

        $sql_string = $this->CI->yd_lib->gen_count($new_groupby_field_as, $new_groupby_field, $count_field, $new_groupby_field, $table_name, '1');

        $result = $this->db->query($sql_string)->result_array();
        return $result ? $result : array(); 
    }

}

?>
