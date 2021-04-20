<?php

/**
 * 常用函数库
 * Encoding     :  UTF-8
 * Created on   :  YDBJ 20190101
 */

class yd_lib {

    public function __construct() {
        $this->CI = & get_instance();
        log_message('debug', 'yd_lib Class Initialized');
    }

    public function gen_dict_values_compare($field_name_values_dict, $opt = 'like', $values_conn = 'and', $dict_conn = 'or') {
        if (strcasecmp($values_conn, "or") == 0){
            $vlues_conn_end = "0";
        }else{
            $vlues_conn_end = "1";
        }
        $where = '';
        foreach ($field_name_values_dict as $field_name => $field_value_array){
            $where = $where . " ( ";
            foreach ($field_value_array as $field_value){
                $one_compare = $this->gen_one_compare($field_name, $opt, $field_value);
                $where = $where . $one_compare . " " . $values_conn . " ";
            }
            $where = $where . $vlues_conn_end;
            $where = $where . " ) " . $dict_conn . " ";
        }
        if (strcasecmp($dict_conn, "or") == 0){
            $where = $where . '0';
        }else{
            $where = $where . '1';
        }
        return $where;
    }
    
    public function gen_values_compare($field_name, $field_value_array, $opt = '=', $conn = 'or') {
        $where = '';
        foreach ($field_value_array as $field_value){
            $one_compare = $this->gen_one_compare($field_name, $opt, $field_value);
            $where = $where . $one_compare . " " . $conn . " ";
        }
        if (strcasecmp($conn, "or") == 0){
            $where = $where . '0';
        }else{
            $where = $where . '1';
        }
        return $where;
    }

    public function gen_dict_compare($field_name_value_dict, $opt = '=', $conn = 'and') {
        $where = '';
        foreach ($field_name_value_dict as $field_name => $field_value){
            $one_compare = $this->gen_one_compare($field_name, $opt, $field_value);
            $where = $where . $one_compare . " " . $conn . " ";
        }
        if (strcasecmp($conn, "or") == 0){
            $where = $where . '0';
        }else{
            $where = $where . '1';
        }
        return $where;
    }

    public function gen_one_compare($field_name, $opt, $field_value) {
        if (strcasecmp($opt, 'like') == 0) {
            $string0 = "(" . $field_name . " " . $opt . " " . "'%" . $field_value . "%'" . ")";
        }else{
            $string0 = "(" . $field_name . $opt . "'" . $field_value . "'" . ")";
        }        
        return $string0;
    }

    public function gen_orderby($orderby, $is_desc) {
        
        $orderby_string = ' ORDER BY ';
        if ($is_desc) {
            $desc_string = ' DESC ';    
        }else {
            $desc_string = "";
        }
        $sql_string = $orderby_string . $orderby . $desc_string;

        return $sql_string;
    }

    public function gen_limit($begin, $end) {
        $limit_string = ' limit ';
        if ($end < $begin) {
            $temp = $begin;
            $begin = $end;
            $end = $temp;    
        }
        $length = $end - $begin + 1;
        $sql_string = $limit_string . $begin . ',' . $length;

        return $sql_string;
    }

    public  function gen_select($fields_string, $table_name, $where_string, $orderby_string, $limit_string) {
        $sql_string = 'select ' . $fields_string . ' from ' . $table_name . ' where ( ' . $where_string . ' ) ' . $orderby_string . ' ' . $limit_string; 

        return $sql_string;
    }

    public  function gen_count($groupby_field_as, $groupby_field, $count_field, $orderby_string, $table_name, $where_string) {
        $sql_string = 'select ' . $groupby_field_as . ', COUNT(*) as ' . $count_field. ' from ' . $table_name . ' where ( ' . $where_string . ' ) ' . ' GROUP BY ' . $groupby_field . " ORDER BY " . $orderby_string; 

        return $sql_string;
    }

    // public  function gen_where_sub($table_name, $where_string, $groupby_field, $appl_count_limit) {
    //     $sql_string = $groupby_field . ' in ( select ' . $groupby_field . ' from ' . $table_name . ' where ( ' . $where_string . ' ) ' . ' GROUP BY ' . $groupby_field . ' HAVING COUNT(*) ' . ' >= ' . $appl_count_limit . ')'; 

    //     return $sql_string;
    // }

}

?>
