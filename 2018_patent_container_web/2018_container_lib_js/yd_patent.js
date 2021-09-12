
function yd_patent_hist_type(t_pub) {
  function filter_func(pub_num) {
    var patent_type_num = pub_num[2]; //第三位数字
    switch (patent_type_num){
      case '1':
        patent_type = '发明';
        break;
      case '2':
        patent_type = '实用新型';
        break;
      case '3':
        patent_type = '外观';
        break;
      default:
        patent_type = '其他';
    }
    return patent_type;
  } 
  var t_hist = new Yd_list().init(t_pub).toIter(filter_func).getHistogram(["发明", "实用新型", "外观"]);

  return t_hist;
}

function yd_patent_hist_year(t_appli_date) {
  var patent_year_array = new Array(),
    patent_year_index = new Array(),
    patent_year_histogram = new Array(),
    i,
    appli_date,
    appli_year,
    index_min,
    index_max;

  for(i=0; i<t_appli_date.length; i++) {
    appli_date = t_appli_date[i];
    appli_year = appli_date.substr(0, 4);
    appli_year = parseInt(appli_year);
    patent_year_array.push(appli_year);
  }

  index_min = Array.min(patent_year_array);
  index_max = Array.max(patent_year_array);

  for(i=index_min; i<=index_max; i++) {
    patent_year_index.push(i);
  }

  patent_year_histogram = new Yd_list().init(patent_year_array).getHistogram(patent_year_index);

  return patent_year_histogram;
}

function yd_patent_hist_region(t_pub_num) {
  var t_array = new Array(),
    patent_histogram = new Array(),
    i,
    t_priority,
    pr;

  for(i=0; i<t_pub_num.length; i++) {
    t_priority = t_pub_num[i];

    pr = t_priority.substring(0,2); //前两位字母

    t_array.push(pr);
  }

  t_index = Array.unique(t_array);

  patent_histogram = new Yd_list().init(t_array).getHistogram(t_index);

  return patent_histogram;
}

function yd_patent_hist_law(t_legal_valid) {
  var t_array = new Array(),
    t_index = new Array(),
    t_histogram = new Array(),
    i,
    appli_status;

  for(i=0; i<t_legal_valid.length; i++) {
    appli_status = t_legal_valid[i];
    t_array.push(appli_status);
  }

  t_index = ['公开', '授权', '驳回', '其他'];

  t_histogram = new Yd_list().init(t_array).getHistogram(t_index);

  return t_histogram;
}

function yd_patent_hist_first_applicant(t_applicant, trunc_len) {
  var t_array = new Array(),
    t_index = new Array(),
    t_histogram = new Array(),
    t_trunc = new Array(),
    i,
    t_item,
    t_1st;

  function tf_get_first_item(t_item) {
    var t_array;

    // 替换空格
    var regSpace = new RegExp(" ", "g");
    t_item = t_item.replace(regSpace, "");

    // 增加结尾的
    t_item = t_item + ';';
    t_array = t_item.split(";");
    return t_array[0];
  }


  for(i=0; i<t_applicant.length; i++) {
    t_item = t_applicant[i];

    t_1st = tf_get_first_item(t_item);
    t_array.push(t_1st);
  }

  t_index = Array.unique(t_array);

  t_histogram = new Yd_list().init(t_array).getHistogram(t_index);

  var t_trunc = new Yd_dict().init(t_histogram).toSortIndex().bldTrunc(trunc_len).get();

  return t_trunc;
}


// function yd_patent_hist_ipc(t_ipc) {
//   var t_array = new Array(),
//     t_index = new Array(),
//     t_histogram = new Array(),
//     i,
//     t_item,
//     t_1st;

//   for(i=0; i<t_data.length; i++) {
//     t_item = t_ipc[i];

//     t_1st = tf_get_first_item(t_item);

//     t_ipc = t_1st.substring(0,4); //前四位字母，大组

//     t_array.push(t_ipc);
//   }

//   t_index = Array.unique(t_array);

//   t_histogram = new Yd_list().init(t_array).getHistogram(t_index);

//   return t_histogram;
// }