function yd_cookie_set(cookie_name, cookie_value)
{
    var cookie_string = cookie_name + '=' + cookie_value; 
    
    var d = new Date();
    d.setMonth(d.getMonth()+1);
    d = d.toGMTString();
    
    cookie_string += ';' + 'expires=' + d;
    
    cookie_string += ';' + 'path=/';
    
    document.cookie = cookie_string;
};
            

function yd_cookie_get(name){
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (arr)
        return arr[2];
    else
        return null;
};


function yd_url_get_params(page_name)
{
    var param_array = new Array();

    var t_site = location.href;
    var t_split = t_site.split(page_name);
    var t_split_after = t_split[1];

    if (t_split_after) {
        var param_array = t_split_after.split('/');
        param_array.splice(0, 1);
    }
    
    return param_array;
};

function YdMenuActive(){
    return {
        init: function(id){
            this.id = id;
            this.menu_id = 'left_' + this.id;
        },
        getId: function(){
            return this.id;
        },
        getMenuLeftId: function() {
            return this.menu_id;
        },
        activeMenuLeft: function() {
            $('#' + this.menu_id).addClass('active');
        },
        initMenu: function(id){
            this.init(id);
            this.activeMenuLeft();
        }
    };
};

function YdHtml(){
}
YdHtml.prototype = {
  init: function(){
      this.html = "";
      return this;
  },
  addButtonHtml: function(p_href, p_text) {
    var t_html = "<a class= 'btn btn-info' href='" + p_href + "'>" + p_text + "</a>";
    this.html = this.html + t_html;
    return this;
  },
  addInputHtml: function(p_id) {
    var t_html = "<input class='form-control' id='" + p_id + "'></input>";
    this.html = this.html + t_html;
    return this;
  },
  addAHtml: function(p_href, p_text, p_attr_dict) {
    var t_html = "<a href='" + p_href + ' ';

    for (var t_key in p_attr_dict) {
        var t_value = p_attr_dict[t_key];
        t_html = t_html + t_key + " = " + "'" + t_value + "'" + " ";
    }

    t_html = t_html + ">" + p_text + "</a>";
    this.html = this.html + t_html;
    return this;
  },
  addAClickHtml: function(p_click_text, p_text, p_attr_dict) {
    var t_html = "<a onclick='" + p_click_text + "'" + " ";

    for (var t_key in p_attr_dict) {
        var t_value = p_attr_dict[t_key];
        t_html = t_html + t_key + "=" + "'" + t_value + "'" + " ";
    }

    t_html = t_html + ">" + p_text + "</a>";
    this.html = this.html + t_html;
    return this;
  },
  addABCDRadioCheckboxHtml: function(p_id, options, p_type) {
    var p_type = p_type || 'radio';
    var t_values = "ABCDEFG";
    var t_html = "";
    for (var i = 0; i < options.length; i++) {
      t_html = t_html +  "<div class='"
                      + p_type
                      +"'> <label> <input type='"
                      + p_type
                      +"' name='"
                      + p_id
                      +"' id='"
                      + p_id
                      +"' value='"
                      + t_values[i]
                      +"'>   "
                      + options[i]
                      +"  </label></div>";
    }

    this.html = this.html + t_html;
    return this;
  },
  addSpace: function(p_num) {
    var t_space = "&nbsp";
    var t_html = "";
    for (var i = 0; i < p_num; i++) {
        t_html = t_html + t_space;
    }
    this.html = this.html + t_html;
    return this;
  },
  addChartDiv: function(id, height) {
    var height = height || 300;
    var t_html = "<div style='width:100%;height:" + height + "px;' id='" + id + "'></div>";
    this.html = this.html + t_html;
    return this;
  },
  addTableDiv: function(id) {
    var t_html = "<div class='row-fluid yd_layout_border yd_layout_margin_top_s'>\
  <table class='table table-bordered table-condensed search_result_bg_text' id='" + id + "'>\
      <thead>\
        <tr>\
        </tr>\
      </thead>\
      <tbody>\
      </tbody>\
  </table>\
</div>";
    this.html = this.html + t_html;
    return this;
  },
  get: function() {
    return this.html;
  }
};

function YdColumnDefs(){
}
YdColumnDefs.prototype = {
  init: function(){
      this.list = [];
      return this;
  },
  addColumnDef: function(def_targets, def_name, def_value) {
    var column_def = {};
    column_def["targets"] = def_targets;
    column_def[def_name] = def_value;
    this.list.push(column_def);
    return this;
  },
  addButton: function(target_column, button_text, href_base, param_column_arr){
    var render_func = function(data, type, row, meta) {
      var p_ref = href_base + '/';

      for (var i in param_column_arr) {
        var item = param_column_arr[i];
        p_ref = p_ref + row[item] + '/';
      }

      var html = new YdHtml().init().addButtonHtml(p_ref, button_text).get();
      return html;
    };
    var column_def = {
      "render": render_func, 
      "targets": target_column
    };
    this.list.push(column_def);
    return this;
  },
  addButtonJson: function(target_column, button_text, href_base, param_column_arr){
    var render_func = function(data, type, row, meta) {
      var p_ref = href_base + '/';

      var t_obj = {};
      for (var i in param_column_arr) {
        var item = param_column_arr[i];
        t_obj[item] = row[item];
      }
      var t_json = JSON.stringify(t_obj);
      p_ref = p_ref + t_json + '/';

      var html = new YdHtml().init().addButtonHtml(p_ref, button_text).get();
      return html;
    };
    var column_def = {
      "render": render_func, 
      "targets": target_column
    };
    this.list.push(column_def);
    return this;
  },
  addInput: function(target_column, id_base, id_row){
    var render_func = function(data, type, row, meta) {
      var input_id = id_base + row[id_row];
      var html = new YdHtml().init().addInputHtml(input_id).get();
      return html;
    };
    var column_def = {
      "render": render_func, 
      "targets": target_column
    };
    this.list.push(column_def);
    return this;
  },
  addABCDRadioCheckbox: function(target_column, id_base, id_row, option_row, p_type){
    var render_func = function(data, type, row, meta) {
      var input_id = id_base + row[id_row];
      var options = row[option_row];
      options = options.replace(/[\n]$/g, ''); // 20190604 删除结尾换行符。
      var option_arr = options.split("\n");
      var html = new YdHtml().init().addABCDRadioCheckboxHtml(input_id, option_arr, p_type).get();
      return html;
    };
    var column_def = {
      "render": render_func, 
      "targets": target_column,
      "width": "40%"  // 20200603 党建单选多选
    };
    this.list.push(column_def);
    return this;
  },
  get: function() {
    return this.list;
  }
};

function YdColumns() {
  this.columns = new Array();
  this.addSimpleColumns = function(p_column_name_list) {
    for(var i in p_column_name_list){
      var item = p_column_name_list[i];
      var obj = {};
      obj.data = item;
      obj.width = '50px';
      this.columns.push(obj);
      // this.columns.push( { "data": p_column_name_list[i]} );
    }
  };

  this.addComplexColumns = function(p_column_name_dict) {
    var t_keys = Object.keys(p_column_name_dict);
    for (var i = 0; i < t_keys.length; i++) {
      var key = t_keys[i];
      var value = p_column_name_dict[key];
      this.columnAddDict(key, value);
    }
  };

  // this.columnAddProperty = function(column_data_name, property) {
  //   var the_column = this.findColumn(column_data_name);
  //   // 2018-2-12 . object.Assign IE9不支持
  //   if (typeof Object.assign != 'function') {
        
  //   } else {
  //     Object.assign(the_column, property);
  //   }
  // };

  this.columnAddKeyValue = function(column_data_name, key_name, value_name) {
    // var t_object = {};
    // t_object[key_name] = value_name;
    // this.columnAddProperty(column_data_name, t_object);
    var the_column = this.findColumn(column_data_name);
    the_column[key_name] = value_name;
  };

  this.columnAddClass = function(column_data_name, class_name) {
    this.columnAddKeyValue(column_data_name, 'class', class_name);
  };

  this.columnAddDict = function(column_data_name, p_dict) {
    var t_keys = Object.keys(p_dict);
    for (var i = 0; i < t_keys.length; i++) {
      var key = t_keys[i];
      var value = p_dict[key];
      this.columnAddKeyValue(column_data_name, key, value);
    }
  };

  this.findColumn = function(column_data_name) {
    for(var i = 0; i < this.columns.length; i++) {
      var the_column = this.columns[i];
      if (the_column.data === column_data_name){
        return the_column;
      }
    }
  };

  this.addColumn = function(property) {
    this.columns.push(property);
  };

  this.get = function(){
    return this.columns;
  };
}

function YdDataTables(){
}
YdDataTables.prototype = {
  generateColumns: function(p_list, complex_colunm){
      var t_columns = new YdColumns();
      t_columns.addSimpleColumns(p_list);
      t_columns.addComplexColumns(complex_colunm);
      return t_columns.get();
  },
  generateBasicOption: function() {
      var option = {
          destroy: true
          ,pageLength: 100
          ,searching: false
          ,paging: false
          ,ordering: true
          ,autoWidth: false // 20200603 党建单选多选
      };
      return option;
  },
  generateOption: function(p_list, complex_colunm) {
      var columns = this.generateColumns(p_list, complex_colunm);
      var option = this.generateBasicOption();
      option.columns = columns;
      return option;
  },
  initTableHeaderList: function(p_list){
      this.header_list = p_list;
  },
  getTableHeaderList: function(){
      return this.header_list;
  },


  initTableHeader: function(control_id, p_list){
      var selector = '#' + control_id + ' thead tr';
      // for (var i = p_list.length - 1; i >= 0; i--){
      for (var i = 0; i <= p_list.length - 1; i++){
          var item = p_list[i];
          var th = '<th>' + item + '</th>';
          $(selector).append(th);
      }
  },
  getOption: function(){
      return this.option;
  },
  setOption: function(option) {
      this.option = option;
  },
  buildOption: function(t_data, column_dict, column_defs, complex_colunm) {
      var complex_colunm = complex_colunm || {};

      var key_list = Object.keys(column_dict);
      var option = this.generateOption(key_list, complex_colunm);
      option.columnDefs = column_defs;

      option.data = t_data;
      return option;
  },
  showTable: function(option, control_id, column_dict) {
      var header_list = Object.values(column_dict);
      this.initTableHeader(control_id, header_list);
      $('#' + control_id).DataTable(option);
  }
};


function yd_psd_is_weak(p_psd){
  // 不包含数字
  var t_reg_num = /[0-9]/;
  if( !p_psd.match(t_reg_num) ){
    return true;
  }

  // 不包含大写字母
  var t_reg_cap = /[A-Z]/;
  if( !p_psd.match(t_reg_cap) ){
    return true;
  }

  // 不包含小写字母
  var t_reg_letter = /[a-z]/;
  if( !p_psd.match(t_reg_letter) ){
    return true;
  }

  // 不包含特殊字符
  var t_reg_special = /[%#@!~&\^\$\*\(\)]/;
  if( !p_psd.match(t_reg_special) ){
    return true;
  }

  // 长度小于8位
  if( p_psd.length < 8 ){
    return true;
  }

  return false;
}