
$(document).on('click', 'button[name="checkout"]', function (e){
const ua = window.navigator.userAgent;
let environment;
if(ua.match("phonepe-webview")!= null){
  environment="phonepe"
}
else if((/AppContainer/i.test(ua))!=false){
  environment="paytm"
}
if(environment==="phonepe"||environment==="paytm"){
  e.preventDefault();
  $.ajax({
    url:'/cart.js',
    data:'',
    success:function(data,status,xhr){
      console.log(xhr.getResponseHeader("x-shopid"));
      let shopId=xhr.getResponseHeader("x-shopid");
      console.log('cart data', data);        
      items=data.items;
      if (items.length === 0 && (data.items_subtotal_price) === 0){
        window.location.href = "/cart";
      }
      else{
        let discountcode = null;
        if(data.cart_level_discount_applications.length){
          discountcode = data.cart_level_discount_applications[0].title
        }
        else{

          discountcodes=items.map(item =>  ({"discounts":item.discounts}));
          discountcodes.forEach(function(item){
            if(item.discounts.length){
              discountcode = item.discounts[0].title
            }
          });
        }
        lineitems=items.map(item =>  ({"name":item.product_title,"sku":item.sku,"variantId":item.id,"qty":item.quantity,"mrp":item.original_price/100,"sellingPrice":item.final_price/100}));
        obj={
          "extId":data.token.toString(),
          "salesChannel":environment,
          "extStoreId":shopId,
          "amount":data.items_subtotal_price/100,
          "cartItems":lineitems,
          "discountCode":discountcode,
          "discountAmount":data.total_discount/100,
        }
        console.log(JSON.stringify(obj));
        sendData(obj,data.token,shopId);
      }

    },
    dataType:"json"
  });
  
  function sendData(obj1,cartId,shopId){
    obj1=JSON.stringify(obj1);
    $.ajax({
      type: "POST",
      async: true,
      crossDomain : true,
      url: 'https://backend-checkout.perpule.com/cart',
      dataType: "json",
      data: obj1,
      contentType: "application/json; charset=utf-8",
      statusCode:{
        200: function() {
          window.location.href=("https://checkout.perpule.com/?cartid="+cartId+"&shopid="+shopId);
        },
       }
    });
  }
  
}else{
      /* Client Code */
}
});