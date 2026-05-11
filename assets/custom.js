/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");
  if(dots){
  	if(dots.style.display === "none") {
    	dots.style.display = "inline";
    	btnText.innerHTML = "Read more"; 
    	moreText.style.display = "none";
  	}else{
    	dots.style.display = "none";
    	btnText.innerHTML = "Read less"; 
    	moreText.style.display = "inline";
  	}
  }
}

var productSlideshow = $('.Product__Slideshow');
productSlideshow.on( 'select.flickity', function( event, index ) {
  var currentSlide = $(this).find('.is-selected');
    var video = currentSlide.find('video');
  if(video.length == 1){ video[0].play(); }else{ var vd = $(this).find('video')[0]; if(vd){vd.pause()}}
 //$('.Product__SlideItem').find('video').each(function() { if(this.paused){ }else{ this.pause()}});
  $('.Product__SlideItem').find('iframe').each(function() { 
    var src= $(this).attr('src').replace(/&autoplay=1/g,'');
    $(this).attr('src',src);  
  });
  
  $('.extrernal_vid_img').click(function() {
      $(this).hide();
    var src =  $(this).parent().find('iframe')[0].src += "&autoplay=1";
   });
});
