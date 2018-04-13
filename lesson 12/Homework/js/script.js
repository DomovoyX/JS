/**
 * Created by Andrew on 11.04.2018.
 */

$(document).ready(function() {

  $('nav li:eq(1)').click( function() {
    showOverlay();
  });

  $('.main_btna').click( function() {
    showOverlay();
  });

  $('.main_btn').click( function() {
    showOverlay();
  });

  $('.overlay').click(function() {
    $(this).fadeOut(300);
    $('.modal').slideUp(300);
  });

  $('.close').click(function() {
    $('.modal').slideUp(300);
    $('.overlay').fadeOut(300);
  });

  function showOverlay() {
    $('.overlay').fadeIn(300);

    setTimeout(function() {
      $('.modal').slideDown(300);
    }, 300);
  }

});