$('.carousel').carousel({
    interval: 200
})

$(".jumbotron").css({ height: $(window).height() + "px" });

$(window).on("resize", function() {
    $(".jumbotron").css({ height: $(window).height() + "px" });
});
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

$('#myTab a').on('click', function(e) {
    e.preventDefault()
    $(this).tab('show')
})

$('#someTab').tab('show')

$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
})