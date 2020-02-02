
// Start Window Load Function
$(window).on('load', function() {

    'use strict';

    $('.section').each(function() {
        $(this).append('<div class="darkvision"></div>');
        var $this = $(this);
        
        $(this).waypoint(function() { $this.find('.darkvision').fadeToggle(600);  }, {offset: '70%'});
        $(this).waypoint(function() {  $this.find('.darkvision').fadeToggle(600);  }, {offset: '-70%'});
    });

    $('.hero-slider').ready(function(){
        $(this).find('.slick-arrow').append('<span></span>')
    });

// End Function
});
