
/* 
 *  功能:扫描校验
 *  参数:id
 *  返回:true,false
 *  作者：jie
 */
function scanValidate(selector) {
    var arr = [];
    var isPass = false;
    var isPassArray = [];
	$("label[id^=Error]").hide();

    var validate= {
        focusInvalid:false,
        focusCleanup:true,
    };
    validate.rules = {};
    validate.messages = {};
    $(selector + " :input[flag]").each(function (i, e) {
        var flag = [];
        var id = $(e).attr("id");
        flag = ($(e).attr("flag")).split(',');
        var rule = validate.rules[id] = {};
	    var msg = validate.messages[id] = {}; 
        for (var j = 0; j < flag.length; j++) {
            var result = MatchValidate(rule,msg,id, flag[j]);
        }
    });
    $(selector).validate(validate,{focusCleanup:true});
}


/* 
 *  功能:匹配校验公共方法
 *  参数:id,flag,msg
 *  返回:true,false
 *  作者：jie
 */
function MatchValidate(rule,msg,id,flag) {
    var isPass = true;
    //校验匹配
    switch (flag) {
        case "need"://非空
		   rule.required = true;
	       msg.required = "*必填项";
            break;
        case "num"://是否为数字
            rule.number = true;
	        msg.number = "请输入合法的数字";
            break;
        case "int"://是否为整数
            rule.digits = true;
	        msg.digits = "请输入正确的整数";
            break;
        case "positiveNum"://是否为正数
            break;
        case "positiveInt"://是否为正整数
            rule.positiveInt = true;
            break;
        case "naturalNum": //>=0正整数
            break;
        case "money"://是否为金额
            break;
        case "phone"://验证是否为手机
             rule.digits = true;
	         msg.digits = "手机格式不正确";
             rule.rangelength = [11, 11];
             msg.rangelength = "请输入11位数字";
            break;
        case "email"://校验邮箱
             rule.email = true;
	         msg.email = "邮箱格式不正确";
            break;
        case "ZipCode": //是否为邮编
              rule.ZipCode = true;
            break;
        case "year": //是否为年
            rule.rangelength = [4, 4];
            ruledigits = true;
	        msg.digits = '年份不正确!';
            msg.rangelength = '请输入4位数字!';
            break;
        case "identity": //是否为身份证
            rule.identity = true;
            break;
		case "date": //是否为日期
             rule.date = true;
	         msg.date = "请输入正确格式的日期";
            break;
        case "tel": //是否固定号码
            break;
        case "url": //是否网址
             rule.url = true;
	         msg.url = "请输入正确格式的网址";
            break;
        default://无这种标签
            //isPass = true;
            break;
    }
}

// 邮政编码验证  
function IsZipCode (value){
    var regx = /^[0-9]{6}$/;
     return regx.test(value);
}

// 添加邮政编码验证   
jQuery.validator.addMethod("ZipCode", function(value, element) {
     return this.optional(element) || IsZipCode(value);
}, "请正确填写您的邮政编码");

// 是否为正整数  
jQuery.validator.addMethod("positiveInt", function(value, element) {   
    var regx = /^[1-9]\d*$/;
    return this.optional(element) || (regx.test(value));
}, "请输入正整数");

// 身份证验证
jQuery.validator.addMethod("identity", function(value, element) {   
    var regx = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    return this.optional(element) || (regx.test(value));
}, "请正确填写您的身份证号");


