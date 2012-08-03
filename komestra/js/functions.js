/* Author: Htmlhero (http://htmlhero.ru) */

$(function(){

	(function(){

		if ('placeholder' in document.createElement('input')) {
			return;
		}

		$('[placeholder]').each(function(){
			new Placeholder(this);
		});

	})();

	$('.js-banner-slider').each(function(){
		new BannerSlider(this);
	});

});

/* Placeholder */

function initPlaceholder(){

	if ('placeholder' in document.createElement('input')) {
		return;
	}

	$('[placeholder]').each(function(){
		new Placeholder(this);
	});

}

function Placeholder(container){

	var _this = this;

	this.container = $(container);
	this.placeholder = this.container.attr('placeholder');

	if (this.container.val() === '' || this.container.val() === this.placeholder) {
		this.container.addClass('_placeholder').val(this.placeholder);
	}

	this.container.focus(function(){
		_this.focus();
	});

	this.container.blur(function(){
		_this.blur();
	});

}

Placeholder.prototype.focus = function(){

	if (this.container.val() === this.placeholder) {
		this.container.removeClass('_placeholder').val('');
	}

};

Placeholder.prototype.blur = function(){

	if (this.container.val() === '') {
		this.container.addClass('_placeholder').val(this.placeholder);
	}

};

/* Banner slider */

function BannerSlider(container){

	this.container = $(container);

	this.container.scrollable({
		items: '.b-banner-slider__list',
		prev: '.b-banner-slider__arr._prev',
		next: '.b-banner-slider__arr._next',
		speed: 1000,
		circular: true
	}).autoscroll({
		interval: 7000
	}).navigator({
		navi: '.b-banner-slider-nav__list',
		activeClass: '_active'
	});

}

/* illustration-map related */
$(function(){
    jQuery('#b-map .map-button').mouseover(function(e){
        //var type=this.className.split(' ')[1];
        //console.log('over',type, this);
        jQuery('#inactive-map').addClass('visible');
        //jQuery('#inactive-map .inactive').stop().fadeIn(300, function(){
        //    jQuery('#b-map .' + type + '.highlighted').fadeIn(300);
        //});
    });

    jQuery('#b-map .map-button').mouseout(function(e){
        //var type=this.className.split(' ')[1];
        //console.log('out',type, this);
        jQuery('#inactive-map').removeClass('visible');
        //jQuery('#inactive-map .inactive').stop().fadeOut(300, function(){
        //    jQuery('#b-map .' + type + '.highlighted').fadeOut(300);
        //});
    });

    (function () {
        var canvas = jQuery('#vectors')[0];
        jQuery('#b-map .map-button').each(function() {
            var jThis = jQuery(this);
            var bulletPosition = jThis.find('.bullet').position();
            var h4 = jThis.find('.map-list h4');
            var h4Position = jThis.find('.map-list').position();

            /*
             console.log(this.className);
             console.log('bullet offset', bulletPosition);
             console.log('h4 width', h4.width());
             console.log('h4 width', h4.height());
             console.log('h4 position', h4Position);
             */

            var line = [
                h4Position.left + (h4.width()/2),
                h4Position.top + h4.height()/2,
                bulletPosition.left,
                bulletPosition.top
            ];
            var offset = [
                Math.round(Math.min(line[0], line[2])),
                Math.round(Math.min(line[1], line[3]))
            ];
            //console.log('line', line);

            var canvas = jQuery('<canvas />');
            canvas[0].width = Math.abs(line[0] - line[2]);
            canvas[0].height = Math.abs(line[1] - line[3]);

            canvas.css({
                left: '' + offset[0] + 'px',
                top: '' + offset[1] + 'px'
            });

            if($.browser.msie && $.browser.version<9) { G_vmlCanvasManager.initElement(canvas[0]); }

            var ctx = canvas[0].getContext('2d');
            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.moveTo(line[0] - offset[0], line[1] - offset[1]);
            ctx.lineTo(line[2] - offset[0], line[3] - offset[1] );
            ctx.closePath();
            ctx.stroke();

            jQuery(this).append(canvas);
        });

        return false;
    })();
});