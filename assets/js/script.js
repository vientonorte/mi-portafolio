$(".jumbotron").css({ height: $(window).height() + "px" });

$(window).on("resize", function() {
    $(".jumbotron").css({ height: $(window).height() + "px" });
});
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})