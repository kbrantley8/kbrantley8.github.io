$(document).ready(function() {
    $("a").click(function() {
        var pageId = $(this).attr("going_to");
        $("html, body").animate({ scrollTop: $("#" + pageId).offset().top - 120 }, 1000);
    })
})