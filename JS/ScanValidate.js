var Validate = {
    //正则对象
    RegexpObj: {
        IsNumber: /^\-?[0-9]+(.[0-9]+)?$/,//判断输入是否为数字
        IsInt: /^\-?[0-9]*$/,//是否为整数
        IsPositiveNumer: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,//是否为正数
        IsPositiveInt: /^[1-9]\d*$/,//是否为正整数
        IsNaturalNumer: /^[0-9]*$/,//是否为自然数
        IsPositiveFloat: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/,//是否正浮点数
        IsMoney: /(^[1-9]([0-9]+)?(\.[0-9]+)?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,//是否为正数，除零外首位不能不为零
        IsPhone: /^1(3|4|5|7|8)\d{9}$/,//是否手机号
        IsTel: /0\d{2,3}-\d{7,8}|\d{7,8}/,//是否固定电话(国内)
        IsEmail: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,//是否Email
        IsZipCode: /^[0-9]{6}$/,//是否邮政编码
        IsQQ: /[1-9][0-9]{4,}/,//是否QQ
        //身份证验证
        IsIdentity: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        //验证日期,支持: YYYY - MM - DD、YYYY/MM/DD、YYYY_MM_DD、YYYY.MM.DD的形式
        IsDate: /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/,
        IsYear: /[0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}/,//验证年份(年份范围为 0001 - 9999)
        //是否网址
        IsURL: /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i,
    },
    //通用校验
    CommonValidate: function (regexpName, value) {
        var regx = Validate.RegexpObj[regexpName];
        return Validate.RegxValidate(regx, value);
    },
    RegxValidate: function (regx, value) {
        return regx.test(value);
    },
    //检查元素是否空值
    CheckElementEmpty: function (selector) {
        var obj = $(selector);
        var value = "";
        var result;
        switch (obj[0].tagName) {
            case "INPUT":
                var type = $(selector).attr("type");
                if (type === "radio" || type === "checkbox")
                    result = $(selector + ":checked").length === 0 ? false : true;
                else {
                    value = obj.val();
                    result = !Validate.IsNullOrEmpty(value);
                }
                break;
            case "SELECT":
                value = obj.val();
                result = !(value == "请选择" || Validate.IsNullOrEmpty(value));
                break;
            case "TEXTAREA":
                value = obj.val();
                result = !Validate.IsNullOrEmpty(value);
                break;
            default:
                value = obj.text();
                result = !Validate.IsNullOrEmpty(value);
                break;
        }
        return result;
    },
    //检测是否为空  
    CheckEmpty: function (value) {
        return !Validate.IsNullOrEmpty(value);
    },
    //检测是否为空  
    IsNullOrEmpty: function (value) {
        var flag = false;
        if (value == null || value == undefined || typeof (value) == 'undefined' || value == '') {
            flag = true;
        } else if (typeof (value) == 'string') {
            value = value.replace(/(^\s*)|(\s*$)/g, '');
            if (value == '') {//为空  
                flag = true;
            } else {//不为空  
               flag = false;
            }
        }
        else {
            flag = false;
        }
        return flag;  
    },
    Number: {
        //判断输入是否为数字
        IsNumber: function (value) {
            return Validate.CommonValidate("IsNumber", value);  
        },
        //是否为整数
        IsInt: function (value) {
            return Validate.CommonValidate("IsInt", value);  
        },
        //是否为正数，除零外首位不能不为零
        IsPositiveNumer: function (value) {
            //var regx = /^[0-9]+(.[0-9]+)?$/;
            return Validate.CommonValidate("IsPositiveNumer", value);  
        },
        //是否为正整数
        IsPositiveInt: function (value) {
            return Validate.CommonValidate("IsPositiveInt", value);  
        },
        //是否为自然数
        IsNaturalNumer: function (value) {
            return Validate.CommonValidate("IsNaturalNumer", value);  
        },
        //是否正浮点数
        IsPositiveFloat: function (value) {
            return Validate.CommonValidate("IsPositiveFloat", value);  
        },
        //位数校验
        CheckLength: function (num, len) {
            return num.toString().length == len ? true : false;
        },
        //浮点数位数校验
        CheckPoint: function (num, len) {
            var str = "^[1-9]([0-9]+)?(\.[0-9]{" + len + "})$";
            var regx = new RegExp(str, "g");
            return regx.test(num) ? true : false;
        },
    },
    Contact: {
        //是否手机号
        IsPhone: function (value) {
            return Validate.CommonValidate("IsPhone", value);  
        },
        //是否固定电话(国内)
        IsTel: function (value) {
            return Validate.CommonValidate("IsTel", value);  
        },
        //是否Email
        IsEmail: function (value) {
            return Validate.CommonValidate("IsEmail", value);  
        },
        // 是否邮政编码
        IsZipCode: function (value) {
            return Validate.CommonValidate("IsZipCode", value);  
        },
        // 是否QQ
        IsQQ: function (value) {
            return Validate.CommonValidate("IsQQ", value);  
        },
        //身份证验证
        IsIdentity: function (value) {
            return Validate.CommonValidate("IsIdentity", value);  
        },
    },
    Date: {
        //验证日期
        //支持:YYYY-MM-DD、YYYY/MM/DD、YYYY_MM_DD、YYYY.MM.DD的形式
        IsDate: function (value) {
            return Validate.CommonValidate("IsDate", value);  
        },
        //验证年份(年份范围为 0001 - 9999)
        IsYear: function (value) {
            return Validate.CommonValidate("IsYear", value);  
        },
    },
    //是否网址
    IsURL: function (value) {
        return Validate.CommonValidate("IsURL", value);  
    },
}


//执行校验方法
Validate.Exec = {
    //校验方法对象
    ValidObj : {
        need: {
            label: "必填项",
            fn: Validate.CheckEmpty,
        },
        num: {
            label: "数字",
            regxId: "IsInt",
        },
        cash: {
            label: "金额",
            regxId: "IsMoney",
        },
        money: {
            label: "金额",
            regxId: "IsMoney",
        },
        int: {
            label: "整数",
            regxId: "IsInt",
        },
        positiveNum: {
            label: "正数",
            regxId: "IsPositiveNumer: ",
        },
        positiveInt: {
            label: "正整数",
            regxId: "IsPositiveInt",
        },
        naturalNum: {
            label: "自然数",
            regxId: "IsNaturalNumer",
        },
        PositiveFloat: {
            label: "正浮点数",
            regxId: "IsPositiveFloat",
        },
        age: {
            label: "年龄",
            regxId: "IsNaturalNumer",
        },
        phone: {
            label: "手机号码",
            regxId: "IsPhone",
        },
        tel: {
            label: "固定电话",
            regxId: "IsTel",
        },
        email: {
            label: "邮箱",
            regxId: "IsEmail",
        },
        identity: {
            label: "身份证号码",
            regxId: "IsIdentity",
        },
        zipcode: {
            label: "邮编",
            regxId: "IsZipCode",
        },
        qq: {
            label: "QQ号码",
            regxId: "IsQQ",
        },
        date: {
            label: "日期",
            regxId: "IsDate",
        },
        year: {
            label: "年份",
            regxId: "IsYear",
        },
        url: {
            label: "网址",
            regxId: "IsURL",
        },
    },
    /* 
 *  功能:扫描校验
 *  参数:selector：元素选择器,event(事件名,可选)，
    mode(可选，0：错误提示（默认），1：错误替换)
 *  返回:true,false
 *  作者：jie
 */
    ScanValidate: function (selector, mode) {
        $(selector + " :input[flag]").each(function (i, e) {
            Validate.Exec.FlagHandle(this, mode);
        });
        return true;
    },
    /* 
    *  功能:为元素绑定校验
    *  参数:selector：元素选择器,event:事件名,mode(可选，0：错误提示（默认），1：错误替换)
    *  返回:true,false
    *  作者：jie
    */
    BindValidate: function (selector, event, mode) {
        $(document).on(event, selector + " :input[flag]", function () {
            Validate.Exec.FlagHandle(this, mode);
        });
    },
    //Flag处理
    FlagHandle: function (obj, mode) {
        obj = $(obj);
        var selector = "#" + obj.attr("id")
        var value = obj.val();
        var flag = obj.attr("flag").split(',');
        if (!obj.is("input") && flag.indexOf("need") > -1) {
            var isPass = Validate.CheckElementEmpty(selector);
            if (!isPass) return Validate.Exec.ErrorControl(selector, isPass, "*必填项");
        }
        for (var j = 0; j < flag.length; j++) {
            var result = Validate.Exec.MatchValidate(value, flag[j]);
            if (result.isPass != undefined && !result.isPass) {
                if (mode == 1) {
                    obj.val("").end().focus();
                } else {
                    var msg = "*请输入正确的";
                    msg = result.label === "必填项" ? "*必填项" : msg + result.label;
                    Validate.Exec.ErrorControl(selector, result.isPass, msg);
                }
                return false;
            }
        }
        mode == 1 || Validate.Exec.ErrorControl(selector, true);
        return true;
    },
    /* 
    *  功能:匹配校验方法
    *  参数:id,flag
    *  返回:true,false
    *  作者：jie
    */
    MatchValidate: function (value, flag) {
        var isPass = true;
        var label = "";
        var result = {};
        //校验匹配
        if (Validate.Exec.ValidObj.hasOwnProperty(flag)) {
            var obj = Validate.Exec.ValidObj[flag];
            result.label = obj.label;
            if (obj.hasOwnProperty("fn")) {
                result.isPass = obj.fn(value);
            }
            else if (obj.hasOwnProperty("regxId")) {
                result.isPass = Validate.RegexpObj[obj.regxId].test(value);
            }
            else if (obj.hasOwnProperty("regx")) {
                result.isPass = obj.regx.test(value);
            }
        }
        return result;
    },
    /* 
    *  功能:注册校验方法
    *  参数:name, fn, lable(可选)
    *  作者：jie
    *  eg: Validate.Exec.RegValidate("is2", Validate.Contact.IsTel)
    */
    RegValidateFn: function (name, fn, lable) {
        var obj = { label : lable,fn : fn,};
        Validate.Exec.ValidObj[name] = obj;
    },
    RegValidateRegx: function (name, fn, lable) {
        var obj = { label: lable, regx: regx, };
        Validate.Exec.ValidObj[name] = obj;
    },
    //错误提示
    ErrorControl: function (selector, isTrue, msg) {
        $("[id='Error" + selector + "']").remove();
        if (!isTrue) {
            var html = "<label id='Error" + selector + "'  style='display: block;'><strong class='text-danger'>" + msg + "</strong></label>";
            $(selector).after(html).addClass("error");
        }
        return isTrue;
    },
}