<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * 处理form 提交的参数过滤
 * $string	string  需要处理的字符串或者数组
 * $force	boolean  强制进行处理
 * @return	string 返回处理之后的字符串或者数组
 */
if (!function_exists("cf_daddslashes")) {

    function cf_daddslashes($string, $force = 1) {
        if (is_array($string)) {
            $keys = array_keys($string);
            foreach ($keys as $key) {
                $val = $string[$key];
                unset($string[$key]);
                $string[addslashes($key)] = cf_daddslashes($val, $force);
            }
        } else {
            $string = addslashes($string);
        }
        return $string;
    }

}
/**

 * 处理form 提交的参数过滤
 * $string	string  需要处理的字符串
 * @return	string 返回处理之后的字符串或者数组
 */
if (!function_exists("cf_dowith_sql")) { 

    function cf_dowith_sql($str) {
        $str = str_replace("and", "", $str);
        $str = str_replace("execute", "", $str);
        $str = str_replace("update", "", $str);
        $str = str_replace("count", "", $str);
        $str = str_replace("chr", "", $str);
        $str = str_replace("mid", "", $str);
        $str = str_replace("master", "", $str);
        $str = str_replace("truncate", "", $str);
        $str = str_replace("char", "", $str);
        $str = str_replace("declare", "", $str);
        $str = str_replace("select", "", $str);
        $str = str_replace("create", "", $str);
        $str = str_replace("delete", "", $str);
        $str = str_replace("insert", "", $str);
        // $str = str_replace("'","",$str);
        // $str = str_replace('"',"",$str);
        // $str = str_replace(" ","",$str);
        $str = str_replace("or", "", $str);
        $str = str_replace("=", "", $str);
        $str = str_replace("%20", "", $str);
        //echo $str;
        return $str;
    }

}


if (!function_exists("cf_yd_get_post")) {

    function cf_yd_get_post($str) {
        $str = cf_dowith_sql(cf_daddslashes(html_escape(strip_tags($str))));
        return $str;
    }

}


// /**
//  *  使用特定function对数组中所有元素做处理 
//  *  @param  string  &$array     要处理的字符串 
//  *  @param  string  $function   要执行的函数 
//  *  @return boolean $apply_to_keys_also     是否也应用到key上 
//  *  @access public 
// */
// function cf_array_recursive(&$array, $function, $apply_to_keys_also = false)  
// {  
//     static $recursive_counter = 0;  
//     if (++$recursive_counter > 1000) {  
//         die('possible deep recursion attack');  
//     }  
//     foreach ($array as $key => $value) {  
//         if (is_array($value)) {  
//             cf_array_recursive($array[$key], $function, $apply_to_keys_also);  
//         } else {  
//             $array[$key] = $function($value);  
//         }  
   
//         if ($apply_to_keys_also && is_string($key)) {  
//             $new_key = $function($key);  
//             if ($new_key != $key) {  
//                 $array[$new_key] = $array[$key];  
//                 unset($array[$key]);  
//             }  
//         }  
//     }  
//     $recursive_counter--;  
// } 


/**
 *  将数组转换为JSON字符串（兼容中文） 
 *  @param  array   $array      要转换的数组 
 *  @return string      转换得到的json字符串 
 *  @access public 
 * 
*/  
function cf_json($array) {  
    // cf_array_recursive($array, 'urlencode', true);
    $json = json_encode($array);  
    // return urldecode($json);
    return $json;
}


?>