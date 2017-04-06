$.get('whiteboard.ohm', function(data) {
    $('#grammer').text(data);
});

$('.tab').click(function(tab) {
    let tabClasses = tab.currentTarget.className;
    let tabClass = (tabClasses).substr("0", tabClasses.indexOf(' '));
    console.log(tabClass);
    $('.row').hide();
    // console.log(this.class);
    $('.' + tabClass).show();
    // console.log('Here');
});