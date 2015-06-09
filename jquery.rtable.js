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
 *     $('table').rtable({
 *         style: 'notable'
 *     });
 * 
 **/
(function($){
    $.fn.rtable = function( options ){
        defaults = {
            style: 'notable', // responsive layout style ( notable, flipscroll )
        }
        options = $.extend( defaults, options );

        var elements = this;

        elements.each(function(){
            var table = $(this);

            var headers  = null;
            var isOddRow = true;

            /* LOCATE HEADERS
             * @NOTE: order matters for selectors
             */
            if( !table.find('> thead').length ) {
                table.find('> tbody > tr:first-child, > tr:first-child').each(function(){
                    headers = $(this).find('> th');

                    if( headers.length ) {
                        table.prepend('<thead></thead>');
                        $(this).appendTo( table.find('> thead') );

                        return false;
                    }
                });

                // no headers found this plugin can't be used
                if( !headers.length ) {
                    return;
                }
            }

            // enable rtable for this element
            table.addClass( 'rtable '+ options.style );
            headers = table.find('> thead > tr > th');

            // LOCATE TABLE BODY (create if needed)
            if( !table.find('> tbody').length ) {
                table.find('> tr').wrapAll('<tbody></tbody>');
            }

            // everything else is data
            table.find('> tbody > tr').each(function(){
                // add row attributes
                $(this).addClass(
                    ( isOddRow ? 'rtable-odd' : 'rtable-even' )
                );

                // add cell attributes
                if( options.style == 'notable' ) {
                    $(this).find('> td').each(function( idx ){
                        $(this).attr( 'data-title', headers.eq( idx ).text() );
                    });
                }

                isOddRow = isOddRow ? false : true;
            });
        });

        // activate/deactivate responsivle table versions
        $(window).resize(function(){
            elements.each(function(){
                if( !$(this).hasClass( 'rtable' ) ) {
                    return;
                }

                // remove class to determine natural flow table width
                $(this).removeClass('active')
                $(this).css( 'max-width', 'inherit' );

                // TABLE wider than PARENT?  Go Responsive
                if( $(this).width() > $(this).parent().width() ) {
                    $(this).addClass('active');
                }

                $(this).css( 'max-width', '' );
            });
        }).trigger('resize');
    };
}(jQuery));
