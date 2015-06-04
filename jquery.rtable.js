/**
 * Set height of a group of elements to the largest size
 * @Version: 1.0
 * @Author: Patrick Springstubbe
 * @Contact: @JediNobleclem
 * @Website: springstubbe.us
 * @Source: https://github.com/nobleclem/jQuery-RTable
 * 
 * Usage:
 *     $('table').rtable();
 * 
 **/
(function($){
    $.fn.rtable = function( options ){
        defaults = {
        }
        options = $.extend( defaults, options );

        var elements = this;

        elements.each(function(){
            $(this).addClass( 'rtable' );

            var headers  = null;
            var isOddRow = true;

            /* LOCATE HEADERS
             * @NOTE: order matters for selectors
             */
            $(this).find('thead > tr, tbody > tr, > tr').each(function(){
                // first item should be headers
                if( headers == null ) {
                    headers = $(this).find('> th');
                    $(this).addClass( 'rtable-headers' );

                    // skip processing for this element
                    return;
                }

                // add row attributes
                $(this).addClass(
                    'rtable-row ' + ( isOddRow ? 'rtable-odd' : 'rtable-even' )
                );

                // add cell attributes
                $(this).find('> td').each(function( idx ){
                    $(this).attr( 'data-title', headers.eq( idx ).text() );
                });

                isOddRow = isOddRow ? false : true;
            });
        });

        // activate/deactivate responsivle table versions
        $(window).resize(function(){
            $('table.rtable').each(function(){
                // remove class to determine natural flow table width
                $(this).removeClass('active');

                // TABLE wider than PARENT?  Go Responsive
                if( $(this).width() > $(this).parent().width() ) {
                    $(this).addClass('active');
                }
            });
        }).trigger('resize');
    };
}(jQuery));
