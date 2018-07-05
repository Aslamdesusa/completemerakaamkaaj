// $('td', 'table').each(function(i) 
//    { $(this).text(i+1);
// });



$('table.paginated').each(function() {
    var currentPage = 0;
    var numPerPage = 5;
    var $table = $(this);
    $table.bind('repaginate', function() {
        $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
    });
    $table.trigger('repaginate');
    var numRows = $table.find('tbody tr').length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    var $previous = $('<span class="previous slimtable-page-btn"><<</spnan>');
    var $next = $('<span class="next slimtable-page-btn">>></spnan>');
    for (var page = 0; page < numPages; page++) {
        $('<span class="slimtable-page-btn"></span>').text(page + 1).bind('click', {
            newPage: page
        }, function(event) {
            currentPage = event.data['newPage'];
            $table.trigger('repaginate');
            $(this).addClass('active').siblings().removeClass('active');
        }).appendTo($pager).addClass('clickable');
    }
    $pager.insertAfter($table).find('span.slimtable-page-btn:first').addClass('active');
    $previous.insertBefore('span.slimtable-page-btn:first');
    $next.insertAfter('span.slimtable-page-btn:last');
    
    $next.click(function (e) {
        $previous.addClass('clickable');
        $pager.find('.active').next('.slimtable-page-btn.clickable').click();
        $pager.find('.span:hidden:first').fadeIn( "slow" );
    });
    $previous.click(function (e) {
        $next.addClass('clickable');
        $pager.find('.active').prev('.slimtable-page-btn.clickable').click();
        $pager.find('.clickable').slice( -3, 2 ).show();
    });
    $table.on('repaginate', function () {
        $next.addClass('clickable');
        $previous.addClass('clickable');
        
        setTimeout(function () {
            var $active = $pager.find('.slimtable-page-btn.active');
            if ($active.next('.slimtable-page-btn.clickable').length === 0) {
                $next.removeClass('clickable');
            } else if ($active.prev('.slimtable-page-btn.clickable').length === 0) {
                $previous.removeClass('clickable');
            }
        });
    });
    $table.trigger('repaginate');
});
