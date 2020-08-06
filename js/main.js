$(document).ready(function() {
    $(".links a").click(function() {
        var pageId = $(this).attr("going_to");
        $("html, body").animate({ scrollTop: $("#" + pageId).offset().top - 120 }, 1000);
    })

    $(".course-border").each(function() {
        var el = $(this);
        var longest_el = $("#longest-course");
        el.height(longest_el.height())
    })

    var arrangeIcons = function() {
        loadJSON(function(response) {
            var actual_JSON = JSON.parse(response);
            var count = 0;
            var col_md = 3;
            for (var icon in actual_JSON) {
                var info = actual_JSON[icon];
                if ((count > 3) && (col_md == 3)) {
                    count = 0;
                    col_md = 4;
                } else if ((count > 2) && (col_md == 4)) {
                    count = 0;
                    col_md = 3;
                    $("#icons").append(the_space_2)
                }
                var the_space_2 = '<div class="col-md-2"></div>';
                var the_space_1 = '<div class="col-md-1"></div>';
                if (col_md == 3) {
                    var ht = '<div class="col-md-3">' + 
                        '<i class="' + info.class + '" title="' + info.title + '" id="' + icon + '"></i>' +
                        '</div>';
                } else {
                    if (count == 0) {
                        var ht = the_space_2 + '<div class="col-md-2">' + 
                        '<i class="' + info.class + '" title="' + info.title + '" id="' + icon + '"></i>' +
                        '</div>';
                    } else {
                        var ht = the_space_1 + '<div class="col-md-2">' + 
                        '<i class="' + info.class + '" title="' + info.title + '" id="' + icon + '"></i>' +
                        '</div>'
                    }
                }
                $("#icons").append(ht)
                $("#" + icon).on("click", function() {
                    var id = $(this).attr("id")
                    $("html, body").animate({ scrollTop: $(this).offset().top - 370 }, 1000);
                    // setAllBlack($(this));
                    // openNav(actual_JSON[id].html);
                })
                count++;
            }
        });
    }

    var setAllBlack = function(to_turn) {
        loadJSON(function(response) {
            var actual_JSON = JSON.parse(response);
            for (var icon in actual_JSON) {
                $("#" + icon).css('color', "#212529")
            }
            if (to_turn) to_turn.css("color", "red");
        });
    }

    var loadJSON = function(callback) {   
        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', './js/icons.json', true);
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
    }
    function openNav(data) {
        $('#myModal').show();
        $('#modal-data').html(data)
      }
      
    function closeNav() {
        $('#myModal').hide();
        setAllBlack()
    }

    $("#close-pop, .close-modal").click(function() {
        closeNav();
    })
    arrangeIcons()

    $('#myModal').click(function (event) 
    {
        if(!$(event.target).closest('.modal-content').length && !$(event.target).is('.modal-content')) {
            closeNav();
        }     
    });
})