//**************** Show/Hide Shopping Cart ****************//


$(document).ready(function() {
    showCart();

})

var addBtns = document.getElementsByClassName("add-to-cart"),
    shoppingCart = document.getElementsByClassName("shopping-cart hide")[0],
    details = document.getElementsByClassName("product-detail");
    var selection;
var cart = document.getElementsByClassName("cart-product-detail");

function showCart () {
    var i;

    for (i = 0; i < addBtns.length; i++) {
        addBtns[i].addEventListener('click', function() {
            selection = this.parentNode;
            shoppingCart.className = "shopping-cart";

            displayCart();
            checkPromo();
            removeItem();
            updateItem();
            calculateSum();

        })
    }
};

function displayCart() {
    var productName,
        productImg,
        productImgSrc,
        price,
        totalSum,
        qty;

    var cartProductName,
        cartProductImg,
        priceInCart,
        shopCartQty,
        itemAmt;

    var cart = document.getElementsByClassName("cart-product-detail");

    var temp = $(cart[0]).clone();

    temp[0].className = "cart-product-detail";

    productName = selection.getElementsByClassName("product-name")[0].innerText;
    productImg = selection.getElementsByClassName("product-img")[0];
    priceEach = selection.getElementsByClassName("price")[0].innerText;
    qty = selection.getElementsByClassName("qty")[0].value;

    productImgSrc = $(productImg).attr("src");

    totalSum = (+priceEach.slice(1)) * +qty;

    cartProductName = temp[0].getElementsByClassName("cart product-name")[0];
    $(cartProductName).text(productName);

    cartProductImg = temp[0].getElementsByClassName("cart product-img")[0];
    $(cartProductImg).attr("src", productImgSrc);

    priceInCart = temp[0].getElementsByClassName("price in-cart")[0];
    $(priceInCart).text(priceEach);

    shopCartQty = temp[0].getElementsByClassName("shop-cart qty")[0];
    $(shopCartQty).attr("value", qty);

    itemAmt = temp[0].getElementsByClassName("input-style dollar-amt")[0];
    $(itemAmt).attr("value", totalSum);

    $(temp[0]).appendTo(".items");

}

function calculateSum() {
    var i, items, tempSum, tempSubtotal = 0;
    items = $(".input-style.dollar-amt");

    $("#subtotal").attr("value", 0);

    for (i = 0; i < items.length; i++) {
        tempSubtotal += +items[i].value;
    }

    $("#subtotal").attr("value", tempSubtotal.toFixed(2));
    tempSum = $("#subtotal").val();
    $("#sum").attr("value", +tempSum);

}


function checkPromo() {
    var i, calc, companyPromo, userInputPromo, discount = 0, promoCode = "", tempSum, sumAfterDiscount = 0;

    calc = $(".fa-calculator")[0];
    companyPromo = ["sale10", "extra15", "first20"];

    $(calc).click(function(e) {
        userInputPromo = $("#promo-code").val().toLowerCase();
        tempSum = $("#subtotal").val();

        for (i = 0; i < companyPromo.length; i++) {
            if (userInputPromo == companyPromo[i]) {
                discount = +companyPromo[i].slice(promoCode.length-2);
                sumAfterDiscount = (+tempSum) - (+tempSum * (discount/100)); console.log(discount);
                $("#sum").attr("value", sumAfterDiscount.toFixed(2));
                break;
            } else if (userInputPromo != "") {
                alert("Promo code invalid");
                $("#promo-code").val("");
                $("#sum").attr("value", +tempSum);
               break;
            }
        }
        e.preventDefault();
    })
}


function removeItem() {
    var i, sel, removeBtn = $(".remove");

    for (i = 0; i < removeBtn.length; i++) {
        removeBtn[i].addEventListener('click', function() {
            sel = this.parentNode;
            $(sel).parents(':eq(2)').remove();
            calculateSum();
        })
    }
}


function updateItem() {
    var i, sel, selected, qty, eachAmt, amt, priceEach, priceTotal, priceVal, updateBtn = $(".update");

    for (i = 0; i < updateBtn.length; i++) {
        updateBtn[i].addEventListener('click', function() {
            sel = this.parentNode;
            selected = $(sel).parents(':eq(2)');
            qty = selected[0].getElementsByClassName("shop-cart qty")[0].value; console.log("this" + this.qty);
            priceEach = $(".price.in-cart").text();console.log(priceEach)
            eachAmt = priceEach.slice(1);console.log(eachAmt)
            amt = Number(eachAmt);console.log(amt)
            priceVal = selected[0].getElementsByClassName("input-style dollar-amt")[0];

            if (qty == 0) {
                $(this).parents(':eq(3)').remove();
            } else {
                priceTotal = +qty * amt;
                priceVal.value = priceTotal;

            }
        })
    }


}


