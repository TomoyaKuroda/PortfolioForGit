/**
 * Barba.js
 */
Barba.Dispatcher.on('newPageReady', function( currentStatus, oldStatus, container, newPageRawHTML ) {

    //renew tags in head 
    if ( Barba.HistoryManager.history.length === 1 ) {  // first view
    return;
    }
    var $newPageHead = $( '<head />' ).html(
    $.parseHTML(
    newPageRawHTML.match( /<head[^>]*>([\s\S.]*)<\/head>/i )[ 0 ],
    document,
    true
    )
    );
    var headTags = [ // tags which is needed to renew
    "meta[name='keywords']",
    "meta[name='description']",
    "meta[property^='og']",
    "meta[name^='twitter']",
    "meta[itemprop]",
    ].join( ',' );
    $( 'head' ).find( headTags ).remove(); // delete tags
    $newPageHead.find( headTags ).appendTo( 'head' ); // add tags
        
//Reload the script when loading the page
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
      return 70*i + 1500;
    }
  });

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
    //end

    return false;
        
    }); 


//Transition setting for Barba.js
document.addEventListener("DOMContentLoaded", function() {
        var lastElementClicked;
        // var PrevLink = document.querySelector('a.prev');
        // var NextLink = document.querySelector('a.next');
      
        Barba.Pjax.init();
        Barba.Prefetch.init();
      
        Barba.Dispatcher.on('linkClicked', function(el) {
          lastElementClicked = el;
        });
      
        var MovePage = Barba.BaseTransition.extend({
          start: function() {
            this.originalThumb = lastElementClicked;
      
            Promise
              .all([this.newContainerLoading, this.scrollTop()])
              .then(this.movePages.bind(this));
          },
      
          scrollTop: function() {
            var deferred = Barba.Utils.deferred();
            var obj = { y: window.pageYOffset };
      
            TweenLite.to(obj, 0.4, {
              y: 0,
              onUpdate: function() {
                if (obj.y === 0) {
                  deferred.resolve();
                }
      
                window.scroll(0, obj.y);
              },
              onComplete: function() {
                deferred.resolve();
              }
            });
      
            return deferred.promise;
          },
      
          movePages: function() {
            var _this = this;
            var goingForward = true;
            //this.updateLinks();
      
            if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
              goingForward = false;
            }
      
            TweenLite.set(this.newContainer, {
              visibility: 'visible',
              xPercent: goingForward ? 100 : -100,
              position: 'fixed',
              left: 0,
              top: 0,
              right: 0
            });
      
            TweenLite.to(this.oldContainer, 0.6, { xPercent: goingForward ? -100 : 100 });
            TweenLite.to(this.newContainer, 0.6, { xPercent: 0, onComplete: function() {
              TweenLite.set(_this.newContainer, { clearProps: 'all' });
              _this.done();
            }});
          },
      
        //   updateLinks: function() {
        //     PrevLink.href = this.newContainer.dataset.prev;
        //     NextLink.href = this.newContainer.dataset.next;
        //   },
      
          getNewPageFile: function() {
            return Barba.HistoryManager.currentStatus().url.split('/').pop();
          }
        });
      
        Barba.Pjax.getTransition = function() {
          return MovePage;
        };
      });
      
Barba.Pjax.start();