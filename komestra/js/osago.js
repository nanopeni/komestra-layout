/**
 * @author vms
 */
/*
 * owner:
 *  1 - физ.лицо
 *  2 - юр.лицо
 */


//Место регистрации ТС
var registration_ts = new $mvSQL(
    {name : 'id',        type : 'int'},
    {name : 'city',      type : 'text'},
    {name : 'ratio',     type : 'float'},
    {name : 'ratio_abc', type : 'float'}
);

registration_ts.insert(
    {id : 1, city : 'Томск', ratio : 1.6, ratio_abc : 1},
    {id : 2, city : 'Северск', ratio : 1.2, ratio_abc : 0.8},
    {id : 3, city : 'Томская область', ratio : 0.9, ratio_abc : 0.5}
);


//Тип ТС
/*
 * type :
 *   1 - легковой
 */
var type_ts = new $mvSQL(
    {name : 'id',    type : 'int'},
    {name : 'abc',   type : 'int', def : 0 },
    {name : 'name',  type : 'text'},
    {name : 'price', type : 'float'},
    {name : 'owner', type : 'int', def : 0},
    {name : 'type',  type : 'int', 'default' : 0}
);

type_ts.insert(
    {
        id    : 1,
        name  : 'легковой автомобиль физического лица',
        price : 1980,
        owner : 1,
        type  : 1
    },
    {
        id    : 2,
        abc   : 0,
        name  : 'легковой автомобиль юридиического лица',
        price : 2375,
        owner : 2,
        type  : 1
    },
    {
        id    : 3,
        name  : 'грузовые автомобили с разрешенной макс.массой <16 тонн',
        price : 2025
    },
    {
        id    : 4,
        name  : 'грузовые автомобили с разрешенной макс.массой >16 тонн',
        price : 3240
    },
    {
        id    : 5,
        name  : 'автобусы с числом пассажирских мест до 20 включительно',
        price : 1620
    },
    {
        id    : 6,
        name  : 'автобусы с числом пассажирских мест > 20 включительно',
        price : 2025
    },
    {
        id    : 7,
        name  : 'троллейбусы',
        price : 1620,
        owner : 2
    },
    {
        id    : 8,
        name  : 'трамваи',
        price : 1010,
        owner : 2
    },
    {
        id    : 9,
        abc   : 1,
        name  : 'тракторы, самоходные дорожно-строит. и иные машины',
        price : 1215
    },
    {
        id    : 10,
        abc   : 1,
        name  : 'прицепы к грузовым автомобилям, полуприцепы',
        price : 810
    },
    {
        id    : 11,
        abc   : 1,
        name  : 'прицепы к тракторам, дорожно-строит. и иным машинам',
        price : 305
    },
    {
        id    : 12,
        name  : 'мотоциклы и мотороллеры',
        price : 1215
    }
);



//Мощность для легковых

var power_ts = new $mvSQL(
    {name : 'id',    type : 'int'},
    {name : 'power', type : 'text'},
    {name : 'ratio', type : 'float'}
);

power_ts.insert(
    {id : 1, power : '< 50 л.с.', ratio : 0.6},
    {id : 2, power : '50 - 70 л.с.', ratio : 1},
    {id : 3, power : '70 - 100 л.с.', ratio : 1.1},
    {id : 4, power : '101 - 120 л.с.', ratio : 1.2},
    {id : 5, power : '121 - 150 л.с.', ratio : 1.4},
    {id : 6, power : '> 150 л.с.', ratio : 1.6}
);


//стаж и возраст водителей

var age_ts = new $mvSQL(
    {name : 'id',    type : 'int'},
    {name : 'title', type : 'text'},
    {name : 'ratio', type : 'float'},
    {name : 'owner', type : 'int', def : 1},
    {name : 'age',   type : 'int', def : 0},
    {name : 'discount', type: 'float', def : 0.6}
);

age_ts.insert(
    {
        id    : 1,
        title : 'не ограниченное число лиц, допущенных к управлению ТС',
        ratio : 1.8,
        owner : 2,
        discount : 0.6
    },
    {
        id    : 2,
        title : 'до 22 лет включит. со стажем до 3 лет включит.',
        ratio : 1.8,
        age   : 1,
        discount : 0.9
    },
    {
        id    : 3,
        title : 'более 22 лет со стажем до 3 лет включительно',
        ratio : 1.7,
        age   : 1,
        discount : 0.9
    },
    {
        id    : 4,
        title : 'до 22 лет включит. со стажем более 3 лет включит.',
        ratio : 1.6,
        discount : 0.6
    },
    {
        id: 5,
        title: 'более 22 лет со стажем вождения свыше 3 лет',
        ratio: 1,
        discount : 0.6
    }
);


//период использования ТС

var period_ts = new $mvSQL(
    {name : 'id',     type : 'int'},
    {name : 'timer',  type : 'text'},
    {name : 'ratio', type : 'float'},
    {name : 'age', type : 'int', def : 0},
    {name : 'owner',  type : 'int', def : 1}
);

period_ts.insert(
    {id : 1, timer : '3 месяца', ratio : 0.4},
    {id : 2, timer : '4 месяца', ratio : 0.5},
    {id : 3, timer : '5 месяца', ratio : 0.6},
    {id : 4, timer : '6 месяца', ratio : 0.7, owner : 2},
    {id : 5, timer : '7 месяца', ratio : 0.8, owner : 2},
    {id : 6, timer : '8 месяца', ratio : 0.9, age : 1, owner : 2},
    {id : 7, timer : '9 месяца', ratio : 0.95, owner : 2},
    {id : 8, timer : '10 месяцев и >', ratio : 1, owner : 2}
);

/*
 var year_ts = new $mvSQL(
 {name : 'id',    type : 'int'},
 {name : 'year',  type : 'text'},
 {name : 'ratio', type : 'float'}
 );

 year_ts.insert(
 {id : 1, year : '2003 и ранее', ratio : 0.6},
 {id : 2, year : '2004', ratio : 0.65},
 {id : 3, year : '2005', ratio : 0.7},
 {id : 4, year : '2006', ratio : 0.75},
 {id : 5, year : '2007', ratio : 0.8},
 {id : 6, year : '2008', ratio : 0.85},
 {id : 7, year : '2009', ratio : 0.9},
 {id : 8, year : '2010', ratio : 0.95},
 {
 id: 9,
 year: '2011',
 ratio: 1
 }
 );
 */


function set_option(value, text, sel_option){
    var option = document.createElement('option');
    if (sel_option == value) {
        option.selected = true;
    }
    option.value = value;
    option.appendChild(document.createTextNode(text));
    return option;
}


function render_option(select, options, sel_option){
    if (!sel_option) {
        sel_option = select.value;
    }
    if (!select.disabled) {
        $(select).children().remove();
    }
    select.appendChild(set_option(0, ''));
    for (var i in options) {
        select.appendChild(set_option(options[i].id, options[i].text, sel_option));
    }
    select.disabled = false;
}



function render_registration(owner){
    var select = document.getElementById('registration');
    if (owner != 0) {
        var options = registration_ts.get({
            select: [{
                text: 'city'
            }, 'id']
        });
        render_option(select, options);
    }
    else {
        select.disabled = true;
        $(select).children().remove();
    }
    render_type(select.disabled);
}

function render_type(dis){
    var owner = $('#owner').val();
    var select = document.getElementById('type');
    if (document.getElementById('registration').value != 0) {
        var options = type_ts.get({
            select: ['id', {
                text: 'name'
            }],
            where: 'owner == ' + owner + ' || owner == 0'
        });
        render_option(select, options);
    }
    else{
        select.disabled = true;
        $(select).children().remove();
    }
    render_power(select.disabled);
}

function render_power(dis){
    var select = document.getElementById('power');
    var id = document.getElementById('type').value
    if (id && id > 0) {

        var avto = type_ts.get({
            select: ['type'],
            where: 'id == ' + id
        })[0].type;
    }
    else {
        var avto = 0
    }
    //alert(avto)
    if (((avto) ? avto : 0) != 1 || dis) {
        select.disabled = true;
        $(select).children().remove();

        render_age();

    }
    else {
        var options = power_ts.get({
            select: ['id', {
                text: 'power'
            }]
        });
        render_option(select, options);
    }
}

function render_age(){
    var select = document.getElementById('age');
    var type = document.getElementById('type');
    var power = document.getElementById('power');
    var sel_option = 0;
    if ((!type.disabled && type.value > 0) || (!power.disabled && power.value > 0)) {
        var owner = document.getElementById('owner').value;
        owner = (owner) ? owner : 0;
        if (owner == 2) {
            options = age_ts.where('owner == 2');
            sel_option = 1;
        }
        else {
            options = age_ts;
        }
        var options = options.get({
            select: ['id', {
                text: 'title'
            }]
        });
        render_option(select, options, sel_option);
    }
    else{
        select.disabled = true;
        $(select).children().remove();
    }
    render_period(select.disabled);
}

function render_period(dis){
    var select = document.getElementById('period');
    var sel_option = 0;
    if (dis || document.getElementById('age').value < 1) {
        select.disabled = true;
        $(select).children().remove();
    }
    else {
        var owner = document.getElementById('owner').value;
        owner = (owner) ? owner : 0;
        if (owner == 2) {
            var options = period_ts.where('owner == 2');
            sel_option = 0;
        }
        else {
            var options = period_ts;
        }
        var options = options.get({
            select: ['id', {
                text: 'timer'
            }]
        });
        render_option(select, options, sel_option);
    }
//	render_year(select.disabled);
    render_button_step_1(select.disabled)
}


/*
 function render_year(dis){
 var select = document.getElementById('year');
 if (dis || document.getElementById('period').value < 1) {
 select.disabled = true;
 $(select).children().remove();
 }
 else {
 var options = year_ts.get({
 select: ['id', {
 text: 'year'
 }]
 });

 render_option(select, options);
 }
 render_button_step_1(select.disabled)
 }
 */

function render_button_step_1(dis){
    var button = document.getElementById('button_step_1');
    /*
     if(dis || document.getElementById('year').value < 1){
     button.disabled = true;
     document.getElementById('block_step_2').style.display = 'none'
     }
     else{
     button.disabled = false;
     }
     */
    if(dis || document.getElementById('period').value < 1){
        button.disabled = true;
        document.getElementById('block_step_2').style.display = 'none'
    }
    else{
        button.disabled = false;
    }
}

function render_form(){
    try {
        var type = type_ts.get({
            select: ['price', 'abc', 'type'],
            where: 'id == ' + document.getElementById('type').value
        });
        var Tb = type[0].price;

        var registration = registration_ts.get({
            select: [{
                ratio: (type[0].abc == 1) ? 'ratio_abc' : 'ratio'
            }],
            where: 'id == ' + document.getElementById('registration').value
        });

        var Kt = registration[0].ratio;

        var Km = (type[0].type == 1) ? power_ts.get({
            select: ['ratio'],
            where: 'id == ' + document.getElementById('power').value
        })[0].ratio : 1;

        var age = age_ts.get({
            select: ['ratio', 'age', 'discount'],
            where: 'id == ' + document.getElementById('age').value
        });
        var Ko = age[0].ratio;

        var Kc = period_ts.get({
            select: ['ratio'],
            where: 'id == ' + document.getElementById('period').value
        })[0].ratio;
        /*

         var Kbm = (age[0].age == 0) ? year_ts.get({
         select: ['ratio'],
         where: 'id == ' + document.getElementById('year').value
         })[0].ratio : 0.9;
         */
        //var sum = Tb * Kt * Km * Ko * Kc * Kbm;
        var sum = Tb * Kt * Km * Ko * Kc;
        var min_sum = age[0].discount * sum;
        document.getElementById('policy_total').innerHTML = sum.toFixed(2) + ' руб.<br>Стоимость с максимальной скидкой: ' + min_sum.toFixed(2) + ' руб.<br>Точную цену полиса узнайте по тел.:44-00-88<br>Предоставим все заслуженные скидки';
        document.getElementById('block_step_2').style.display = 'block';
        document.getElementById('block_button_1').style.display = 'none';
        $('#block_button_refrech').css('display', 'block');
        document.getElementById('block_button_2').style.display = 'block';

    }
    catch (e) {
        alert('Необходимо указать все данные')
    }
}


function check_osago(th){
    var inputs = $('input', th);
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            alert('Поля, отмеченные * заполнить обязательно');
            return false;
        }
    }
    return true;
}

jQuery(document).ready(function(){
    $('#owner').change(function(){
        /*
         switch(this.value){
         case '1':
         $('#block_year').css('display', 'block')
         $('#label_year').html('Год выпуска ТС');
         break;
         case '2':
         $('#block_year').css('display', 'block')
         $('#label_year').html('Год приобретения ТС');
         break;
         default:
         $('#block_year').css('display', 'none')
         break;
         }
         */
        $('#i_owner').val(this.options[this.selectedIndex].text);
        render_registration(this.value);
    });
    $('#registration').change(function(){
        $('#i_registration').val(this.options[this.selectedIndex].text);
        render_type(this.disabled)
    });
    $('#type').change(function(){
        $('#i_type').val(this.options[this.selectedIndex].text);
        render_power(this.disabled);
    });

    $('#power').change(function(){
        var text = this.options[this.selectedIndex].text;
        if(text == '') text = '-';
        $('#i_power').val(text);
        render_age();
    });

    $('#age').change(function(){
        $('#i_age').val(this.options[this.selectedIndex].text);
        render_period()
    });

    $('#period').change(function(){
        $('#i_period').val(this.options[this.selectedIndex].text);
        //	render_year(this.disabled);
        render_button_step_1(this.disabled)
    });
    $('#year').change(function(){
        $('#i_year').val(this.options[this.selectedIndex].text);
        render_button_step_1(this.disabled)
    });
    $('#button_step_1').click(function(){
        render_form()
    });

    $('.calc-box-values-field-incremented').each(function(){
        var $input = $(this).find('input').val(1);
        $(this).find("a[rel^='PLUS']").click(function(){
            var v = parseInt($input.val());
            if (v < 10) {
                v++;
                $input.val(v);
                $('#osago_driver_' + (v - 1)).after('<div id="osago_driver_' + v + '">' + $('#osago_driver_1').html() + '</div>');
            }
            return false;
        });
        $(this).find("a[rel^='MINUS']").click(function(){
            var v = parseInt($input.val());
            if (v > 1) {
                $('#osago_driver_' + v).remove();
                v--;
                $input.val(v);
            }
            return false;
        })
    });

});


