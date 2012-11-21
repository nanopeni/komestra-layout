$(function(){
    var holder = $('.about-clock-widget'),
        arrows =
        {
            second: holder.find('.second:visible'),
            minute: holder.find('.minute:visible'),
            hour: holder.find('.hour:visible')
        },
        i,
        prev = {second: 0, minute: 0, hour: 0},
        useTransition = true,
        timer = false;

    function rotate(elements, deg, type) {
        var rule = 'rotate(' + deg + 'deg)';

        if (prev[type] == deg) {
            return;
        }

        if (useTransition) {
            if (prev[type] > deg) {
                elements.removeClass('transitioned');
            }
            else {
                elements.addClass('transitioned');
            }
        }

        elements.css({
            'transform':rule,
            '-webkit-transform':rule,
            '-moz-transform':rule,
            '-ms-transform':rule,
            '-o-transform':rule
        });

        prev[type] = deg;

        if ($.browser.msie && jQuery.browser.version < 9) {
            var rad = (deg * Math.PI) / 180.0,
                cos = Math.cos(rad),
                sin = Math.sin(rad),
                filter = 'progid:DXImageTransform.Microsoft.Matrix(sizingMethod="auto expand", M11 = '
                    + cos + ', M12 = ' + (-sin) + ', M21 = ' + sin + ', M22 = ' + cos + ')';

            elements.css({
                'filter': filter,
                '-ms-filter': filter,
                'margin-left': '' + (-Math.round(Math.abs(ieSizes[type].h * 0.5 * sin))) + 'px',
                'margin-top': '' + (0.5 * (ieSizes[type].h - ieSizes[type].w)
                    - Math.round(Math.abs(ieSizes[type].h * 0.5 * cos))) + 'px'
            });
        }
    }

    function setArrows() {
        var d = new Date(),
            deg = {
                second: 6 * d.getSeconds(),
                minute: 6 * d.getMinutes(),
                hour: 30 * d.getHours()
            };
        for (i in arrows) {
            rotate(arrows[i], deg[i], i);
        }
    }

    if ($.browser.msie && jQuery.browser.version < 9) {
        var ieSizes={};
        for (i in arrows) {
            ieSizes[i] = {w: arrows[i].width(), h: arrows[i].height()};
        }
    }

    var l0aHover = holder.find('.l0a-hover');

    holder.find('area.r').mouseover(function(){
        l0aHover.css({'background': 'url(img/clock-r' + this.className.substring(3) + '.png)'});
    });
    holder.find('area.r').mouseout(function(){
        l0aHover.css({'background': 'transparent'});
    });

    var facetipHolder = holder.find('.facetip-holder');
    holder.find('area.f').mouseover(function(){
        var id = this.className.substring(3);
        facetipHolder.find('.facetip:not(.f' + id + ')').hide();
        facetipHolder.find('.f' + id).show();
    });
    holder.find('area.f').mousemove(function(e){
        var offset = holder.offset();
        facetipHolder.css({
            'top': e.pageY - offset.top + 25,
            'left': e.pageX - offset.left
        });
    });
    holder.find('area.f').mouseout(function(){
        facetipHolder.find('.facetip').hide();
    });




    window.clockWidget = {
        useTransition: function(enable) {
            useTransition = enable;
            for (var e in arrows) {
                if (useTransition) {
                    arrows[e].addClass('transitioned');
                }
                else {
                    arrows[e].removeClass('transitioned');
                }
            }
        },

        useShadows: function(enable) {
            if (enable) {
                holder.find('.l4-arrows-shadows').show();
            }
            else {
                holder.find('.l4-arrows-shadows').hide();
            }

            arrows =
            {
                second: holder.find('.second:visible'),
                minute: holder.find('.minute:visible'),
                hour: holder.find('.hour:visible')
            };
        },

        update: function() {setArrows();},
        start: function() {
            timer = setInterval(setArrows, 250);
        },
        stop: function() {
            clearTimeout(timer);
        }

    };

    window.clockWidget.start();
});


