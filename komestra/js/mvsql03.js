/*
 Copyright (c) 2010 Vyskorko Max (v-m-s.blogspot.com html5.flexum.ru )
 mvSQL v0.32
 Project Home: http://code.google.com/p/jsbd/
 */

/*Тип integer*/
function $mvSQL_int(o){
    this.o = o;
    this.name = "int";
    this.len = parseInt(o.len) || 17;
    this.def = this.check(o.def);

}
$mvSQL_int.prototype = {
    check: function(d){
        return parseInt((d + "").substr(0, this.len)) || 0;
    },
    set: function(v){
        v = parseInt(v)
        return (v) ? this.check(v) : this.def;
    },
    where: function(l, name){
        return this.check(l[name]);
    }
}
/*Тип float*/
function $mvSQL_float(o){
    this.o = o;
    this.name = "float";
    this.len = parseInt(o.len) || 18;
    this.format = this.checkFormat(o.format);
    this.def = (o.def) ? this.check(o.def) : 0;
}
$mvSQL_float.prototype = {
    checkFormat: function(format){
        if (!format)
            return null;
        format = (""+format).split(".");
        if (parseInt(format[0]) + parseInt(format[1]) > 17)
            return null;
        else
            return parseFloat(format[0] + "." + format[1]);
    },
    check: function(d){
        var znak = (d > 0) ? 1 : -1;
        d = d * znak;
        var a = (d+"").replace(",", ".").split(".");

        var format = this.format;
        if (format == null) {
            var i = a[0].substr(0, 17);
            if (a[1] != "undefined") {
                var z = (""+a[1]).substr(0, 17 - i.length);
            }
            else {
                z = 0
            }
//			alert(a[1] + " " + i.length + "." + z.length)
            format = parseFloat(i + "." + z);
        }
        var format = (""+format).split(".");
        var i = a[0].substr(0, format[0]);
        var z = (a[1]) ? a[1].substr(0, format[1]) : 0;
        return parseFloat(i + "." + z) * znak;
    },
    where: function(l, name){
        return this.check(l[name]);
    },
    set : function(v){
        return (v) ? this.check(v) : this.def;
    }
}
/*Тип text*/
function $mvSQL_text(o){
    this.o = o;
    this.name = "text";
    this.len = (o.len) ? parseInt(o.len) : null;
    this.def = (o.def) ? this.check(o.def) : "";
}
$mvSQL_text.prototype = {
    check: function(d){
        return (this.len != null) ? d.substr(0, this.len) : d + "";
    },
    set: function(v){
        return (v) ? this.check(v) : this.def;
    },
    where: function(l, name){
        var v =this.check(l[name])
        return "'" + v + "'";
    }
}

/*тип function*/
function $mvSQL_function(o){
    this.o = o;
    this.name = "function";
    this.def = this.check(o.def);
}
$mvSQL_function.prototype = {
    check: function(d){
        if (typeof(d) == "function")
            return d;
        else
            return (typeof(this.def) == "function") ? this.def : function(){return '';}
    },
    get: function(v){
        return eval(this.check(v));
    },
    where: function(l, name){
        var v = eval(this.check(l[name]))(l);
        switch (typeof(v)) {
            case "string":
                return "'" + v + "'";
                break;
            case "number":
            case "boolean":
                return v;
                break;
            default:
                return null;
                break;
        }
    },
    set : function(v){
        if(typeof(v) == "function") return v;
    }
}

/*тип enum*/
function $mvSQL_enum(o){
    this.o = o;
}


function $mvSQL(){//создаем таблицу
    /*
     * name - имя столбца
     * type - тип данных (int, float, text, function, enum) по дефолту text
     * len
     * default - значение по умолчанию, если не указано, то null
     * select
     *
     */
    this.__A = {};
    this.__AA = [];
    this.__AAA = [];
    this.__AAA_hash = [];
    this.__data = [];
    this.__ink = [];
    /**/
    var arg = {}
    for(var i = 0; i < arguments.length; i++){
        arg[i] =  arguments[i];
    }
    for (var i in arg) {
        this.TABLE_add(arg[i]);
    }
}
$mvSQL.prototype = {
    insert: function(){
        var arg2 = (arguments[0] instanceof Array) ? arguments[0] : arguments;
        var arg = new Array();
        for(var i = 0; i < arg2.length; i++){
            arg[i] =  arg2[i];
        }
        for (var i in arg) {
            var ink = this.__ink.pop() || this.__data.length;//освободившийся индекс или следующий
            this.__data[ink] = {}
            for (var name in this.__A) {
                this.__data[ink][name] = this.__A[name].set(arg[i][name]);
            }
        }

    },
    select: function(){
        var rez = new $mvSQL();

    },
    del: function(w){
        if (!w) {
            this.__data = [];
            this.__ink = [];
        }
        else {
            for (var i in this.__data) {
                if (this.__where(w, this.__data[i])) {
                    delete this.__data[i];
                    this.ink.push(i);
                }
            }
        }
    },
    sum: function(arg){
        var select = arg.select || null;
        var where = arg.where || null;
        if (select == null)
            return 0;
        var rez = this.get(arg);
        var r = {};
        for (var i = 0; i < rez.length; i++) {
            for (var j in rez[i]) {
                if(!parseFloat(r[j])) r[j] = 0;
                if(!parseFloat(rez[i][j])) rez[i][j] = 0;
                r[j] = r[j] + parseFloat(rez[i][j])
            }
        }
        return r;
    },


    /*апдейт*/
    update: function(set, w){
        var w = (w) ? w : null;
        for (var i in this.__data) {
            if (typeof(this.__data[i]) != "object") {
                continue;
            }
            if (w == null || this.__where(this.__data[i], w)) {
                for (var j in set) {
                    if (this.__data[i]) {
                        var line = [];
                        for (var l in this.__data[i]) {
                            line[l] = this.__data[i][l];
                        }
                        switch (typeof(set[j])) {
                            case "function":
                                this.__data[i][j] = this.__A[j].set(eval(set[j])(line));
                                break;
                            case "string":
                                this.__data[i][j] = this.__A[j].set(this.__where(line, set[j]));
                                break;
                            default:
                                this.__data[i][j] = this.__A[j].set(set[j]);
                                break;
                        }
                    }
                }
            }
        }
    },
    /*(условие)*/
    where: function(arg){
        if (arg && typeof(arg) == 'string') {
            var rez = new $mvSQL();
            for (var i in this.__A) {
                rez.TABLE_add(this.__A[i].o);
            }
            for (var i in this.__data) {
                if (this.__where(this.__data[i], arg)) {
                    rez.insert(this.__data[i]);
                }
            }
            return rez;
        }
    },
    order: function(){
    },
    group: function(){
    },
    limit: function(){
    },
    get: function(arg){
        var select = arg.select || this.__AAA;
        var where = arg.where || null;
        var rez = this.__select(select);
        for (var i in this.__data) {
            if (typeof(this.__data[i]) != "object") {
                continue;
            }
            var line = this.__get_line(this.__data[i], select);
            if (where == null || rez.__where(line, this.__iw(this.__data[i], where))) {
                rez.insert(line);
            }
        }
        return rez.__data;
    },
    __get_line: function(line, select){
        var rez = {}
        for (var l in line) {
            rez[l] = line[l];
        }
        for (var i in select) {

            switch (typeof(select[i])) {
                case "object":
                    for (var j in select[i]) {

                        switch (typeof(select[i][j])) {
                            case "function":
                                rez[j] = eval(select[i][j])(line);
                                break;
                            case "string":
                                rez[j] = this.__where(line, select[i][j])
                                break;
                            default:

                                rez[j] = select[i][j];
                                break;
                        }
                    }
                    break;
                default:
                    if (line[select[i]]) {
                        rez[select[i]] = line[select[i]];
                    }
                    break;
            }
        }
        return rez;
    },
    __select: function(select){
        var rez = new $mvSQL();
        for(var i in select){
            switch (typeof(select[i])) {
                case "object":
                    for (var j in select[i]) {
                        rez.TABLE_add({
                            name: j
                        });
                    }
                    break;
                default:
                    if (this.__A[i]) {
                        rez.TABLE_add(this.__A[i].o)
                    }
                    else {
                        rez.TABLE_add({
                            name: select[i]
                        });
                    }
                    break;
            }
        }
        return rez;
    },
    __iw : function(l, w){
        for (var i = 0; i < this.__AAA.length; i++) {
            var name = this.__AA[this.__AAA[i]];
            var r = new RegExp(name, "gm")
            w = w.replace(r, this.__A[name].where(l, name));
        }

        return w;
    },
    /*(условие, вернуть)*/
    __where: function(l, w){
        return eval(this.__iw(l, w));
    },
    TABLE_add: function(a){
        this.__A[a.name] = this.__TABLE_add(a);
        var b1 = parseInt(a.name.length / 26);
        var b2 = a.name.length % 26;
        var b3 = String.fromCharCode((b1 + 97)) + String.fromCharCode(b2 + 97);
        this.__AA[b3 + a.name] = a.name;
        this.__AAA.push(b3 + a.name);
        this.__AAA.sort().reverse();
    },
    __TABLE_add: function(a){
        if (a.name) {
            try {
                return eval("new $mvSQL_" + a.type + "(a)");
            }
            catch (e) {
                return new $mvSQL_text(a);
            }
        }
    }
}


/*
 var test = new $mvSQL({name:"name3", def:"123", type:"float"}, {def : "as", name: "kkkldsjlfjsldkjflskjdlkfsjldkjflskjdlfjldkjf"},{name:"name"},{name:"ame"},{name:"name2"});

 test.insert(
 {name3 : 25.3, name : "w"},
 {name3 : 1}
 );



 test.where(string).order(object||string).group(array||string).select([array]).limit(int[,int]);
 test.get({
 [select : [array]]
 [where  : string]
 [order  : object||string]
 [group  : array||string]
 [limit  : int[,int]]
 })
 */
//alert(n +" " +(n2+"").substr(0, 17))

/*
 (__name__[!=<>+*-/ \)|&%^]){1}
 test.select({
 select : [
 {q1 : function(columns){
 return columns.name + columns.name2
 }
 },
 "name",
 {name2 : "name_two", name3 : "three"}
 ],
 where : '(name3 == "kanal")'

 })

 //alert(59 % 26 )
 //alert(parseInt(590 / 26))
 //alert("z".charCodeAt(0))
 //for(var i in test.__A2) alert(i)

 /*

 .select(
 {f1: function(){}},
 "name",
 {name2 : "name_new"}
 )
 select(
 {f : function(d){return rez}},


 )

 test.select().inner(test2.select().where()).where();
 $mvSQL.innerJoin({test : "t", test2 : "t2"})
 d = test.select({select, [where, order, group]}, true)[.where().order().group()];
 select({
 select: [
 {q1 : function(columns){
 return columns.name + columns.name2
 }
 },
 "name",
 {name2 : "name_two", name3 : "three"}
 ],

 where : "name_two == 1 && (name == name3 || q1 > 7)"
 })
 d.get()
 test.del()

 test.update({
 set:{
 new : function(columns){... return rez},
 new : "string",
 new : ["recent_evidence * tariff"],
 new : 78
 },
 where : "(calc_kanal == '1')"
 })

 test.sum({
 select : [
 "sum",
 {v : function(columns){return rez}}
 ]
 })
 */

