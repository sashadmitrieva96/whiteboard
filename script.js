$.get('whiteboard.ohm', function(data) {
    $('#grammar-row').append('<pre>' + data + '</pre>');
});

$.get('all_sample_code.md', function(data) {
    console.log("here");
    $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$('.tab').click(function(tab) {
    let tabClasses = tab.currentTarget.className;
    let tabClass = (tabClasses).substr('0', tabClasses.indexOf(' '));
    $('.row').removeClass('active').addClass('inactive');
    $('#' + tabClass + '-row').removeClass('inactive').addClass('active');
});