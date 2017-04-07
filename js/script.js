$.get('whiteboard.ohm', (data) => {
  $('#grammar-row').append('<pre>' + data + '</pre>');
});

$.get('all_sample_code.md', (data) => {
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$('.tab').click((tab) => {
  const tabClasses = tab.currentTarget.className;
  const tabClass = (tabClasses).substr('0', tabClasses.indexOf(' '));
  $('.row').removeClass('active').addClass('inactive');
  $('#' + tabClass + '-row').removeClass('inactive').addClass('active');
});
