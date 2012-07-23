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