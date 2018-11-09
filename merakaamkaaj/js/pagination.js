
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        // alert('subMenu is clicked')
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('click', 'hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
        });


  return false;
});