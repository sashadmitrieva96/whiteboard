$.get('whiteboard.ohm', (data) => {
  $('#grammar-row').append('<pre>' + data + '</pre>');
});

$.get('./Sample Code/hello_world_sample.md', (data) => {
  $('#sample-code-row').append(`<div id="description"><h4>Types and Objects<br></h4>In whiteboard, types are essentially objects. Some built-in
  types are **String**, **Num**, **Bool**, **Dict**, **List**, **Set**, and **Stack**.<br>If the user wants to create their own type, they are 
  provided with the custom **UserType**, which is the same as creating an object of that type.</div>`);
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$.get('./Sample Code/cat_sample.md', (data) => {
  $('#sample-code-row').append('<div id="description"><h4><br></h4></div>');
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$.get('./Sample Code/if_sample.md', (data) => {
  $('#sample-code-row').append('<div id="description"><h4>If Statements<br></h4></div>');
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$.get('./Sample Code/loop_sample.md', (data) => {
  $('#sample-code-row').append('<div id="description"><h4>Loops<br></h4></div>');
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$.get('./Sample Code/function_sample.md', (data) => {
  $('#sample-code-row').append('<div id="description"><h4>Functions<br></h4></div>');
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$.get('./Sample Code/exception_sample.md', (data) => {
  $('#sample-code-row').append('<div id="description"><h4>Exceptions<br></h4></div>');
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$.get('./Sample Code/comment_sample.md', (data) => {
  $('#sample-code-row').append('<div id="description"><h4>Comments<br></h4></div>');
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$.get('./Sample Code/whiteboard_sample.md', (data) => {
  $('#sample-code-row').append('<div id="description"><h4>Example Programs<br></h4></div>');
  $('#sample-code-row').append('<pre>' + data + '</pre>');
});

$('.tab').click((tab) => {
  const tabClasses = tab.currentTarget.className;
  const tabClass = (tabClasses).substr('0', tabClasses.indexOf(' '));
  $('.row').removeClass('active').addClass('inactive');
  $('#' + tabClass + '-row').removeClass('inactive').addClass('active');
});
