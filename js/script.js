/**
 * hide scrollbar
 */
$('<div class="scroll_bar_width"></div>').css(
    {
      'display': 'none',
      'width': '100px',
      'height': '1px',
      'overflow-y': 'scroll'
    })
    .appendTo('body');
    
    var scroll_bar_width = 100 - parseInt($('.scroll_bar_width').css('width'));
    
    $('.scroll_bar_width').remove();
    
    // overwrite initial value
    $('.scrollbar_hidden').css('width', 'calc(100% + ' + scroll_bar_width * 2 + 'px)');


    /**
     * 
     */
// Wrap every letter in a span


$('.ml2').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: false})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: function(el, i) {
      return 70*i;
    }
  });

  $('.ml3').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({loop: false})
    .add({
      targets: '.ml3 .letter',
      scale: [4,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: function(el, i) {
        return 70*i + 1250;
      }
    });

    // Wrap every letter in a span
$('.ml4').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: false})
  .add({
    targets: '.ml4 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 599,
    delay: function(el, i) {
      return 50 * (i+1)
    }
  });

  $('.ml5').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({loop: false})
    .add({
      targets: '.ml5 .letter',
      opacity: [0,1],
      easing: "easeInOutQuad",
      duration: 599,
      delay: function(el, i) {
        return 50 * (i+1) + 750
      }
    });