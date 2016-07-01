jQuery(document).ready(function ($) {
    /* ==================== PIECHART + COUNTER ==================== */
    $('.pie-wrapper').each(function (e) {
        $(".chart").waypoint(function () {
            var data_easing = $(this).attr('data-easing'),
                    data_animate = $(this).attr('data-animate'),
                    data_lineCap = $(this).attr('data-line-cap'),
                    data_lineWidth = $(this).attr('data-line-width'),
                    data_bar_color = $(this).attr('data-bar-color'),
                    data_track_color = $(this).attr('data-track-color');
            //data_sise = $(this).attr('data-size');
            $(this).easyPieChart({
                easing: data_easing,
                animate: data_animate,
                lineCap: data_lineCap, //butt, round and square.
                lineWidth: data_lineWidth,
                barColor: data_bar_color,
                trackColor: data_track_color,
                scaleColor: false,
                size: 150,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent-chart').text(Math.round(percent));
                }
            });
        }, {offset: '85%', triggerOnce: true});
    });
    $('.counter').each(function (e) {
        $(".timer").waypoint(function () {
            $('.timer').countTo();
        }, {offset: '85%', triggerOnce: true});
    });
    /* ==================== PIECHART + COUNTER ==================== */


});

jQuery(function ($) {
    var sections = {},
            header_height = $("#header").height(),
            i = -1;

    // Grab positions of our sections 
    $('.template-wrap').each(function () {
        sections[this.id] = $(this).offset().top;
    });

    $(document).scroll(function () {
        var $this = $(this),
                pos = $this.scrollTop();
        console.log(sections);
        for (i in sections) {
            var bgcolor = $('#' + i).find('span.line-title').css('backgroundColor');

            $('#' + i).waypoint(function () {
                $('#menu-res li a').removeClass('active').css('border-bottom-color', 'none');
                $('#menu-res li a[href="#' + i + '"]')
                        .addClass('active')
                        .css('border-bottom-color', bgcolor);
            }, {offset: '25%'});
        }
    });
});