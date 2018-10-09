// $(document).ready(function(){
//   $('.btn2').click(function(){
//     var dataId = $(this).attr("title");
//     // var temp = $('#JobCategoryH').html();
//     alert(dataId)
//     $.ajax({
//       type: 'GET',
//       url: '/world/'+dataId,
//       dataType: 'json',
//       success: function(data){
//         alert('success')
//         location.reload();
//         // var HTML = '';
//         // for (var i = 0; i < data.length; i += 1) {
//         //         HTML = '<option value="' + data[i].username + '">' + data[i].firstName + '</option>'
//         //       $('#updateoptionteach').append(HTML);
//         //       }     
//         }
//     });
//   });
// });

$(document).ready(function(){
  $('.btn2').click(function(){
    var dataId = $(this).attr("href").split("/").join("/");
    alert(dataId)
    window.location('/search/right/worker/'+dataId)
  });
});

// $(document).ready(function(){
//   $('#btn3').click(function(){
//     var dataId = $(this).attr("href");
//     location.replace('http://localhost:8000'+dataId)
//   });
// });


$(document).ready(function(){
  var zindex = 10;
  
  $("div.card").click(function(e){
    e.preventDefault();

    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true
    }

    if ($("div.cards").hasClass("showing")) {
      // a card is already in view
      $("div.card.show")
        .removeClass("show");

      if (isShowing) {
        // this card was showing - reset the grid
        $("div.cards")
          .removeClass("showing");
      } else {
        // this card isn't showing - get in with it
        $(this)
          .css({zIndex: zindex})
          .addClass("show");

      }

      zindex++;

    } else {
      // no cards in view
      $("div.cards")
        .addClass("showing");
      $(this)
        .css({zIndex:zindex})
        .addClass("show");

      zindex++;
    }
    
  });
});
