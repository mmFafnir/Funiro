window.isMobile = function () {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
window.onload = function () {


  

const header = document.querySelector('.header__wrapper');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

function addHeaderColor(){
    if (window.pageYOffset > 25) {
//      iconBurger.classList.add('burger__icon_top');
       header.classList.add('header__wrapper_color');
    } else {
//      iconBurger.classList.remove('burger__icon_top');
      header.classList.remove('header__wrapper_color');

    }
}
window.onscroll=addHeaderColor;
addHeaderColor();



  const menuItems = document.querySelector('.menu__item');
  document.addEventListener("click", documentActions);
  //   Actions (делигирование события click)
  function documentActions(e) {
    const targetElement = e.target;
    if (isMobile()) {
      if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_hover')
      }
      if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item').length > 0) {
        if (!targetElement.closest('.menu__item')) {
          menuItems.classList.remove('_hover');
        }
        //
      }
    }
    if (targetElement.classList.contains('search-form__icon')) {
      document.querySelector('.search-form').classList.toggle('_active')
    }
    if (targetElement.classList.contains('products__more')) {
      getProducts(targetElement);
      e.preventDefault();
    }

    if (targetElement.classList.contains('actions-product__btn')) {
//      e.preventDefault();
      const productId = targetElement.closest('.item-product').dataset.pid;
      addToCart(targetElement, productId);
      e.preventDefault();
    }
    if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
      if(document.querySelector('.cart-list').children.length > 0) {
        document.querySelector('.cart-header').classList.toggle('_active');
      }
      e.preventDefault();
    } else if(!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__btn')){
      document.querySelector('.cart-header').classList.remove('_active');
    }
    if (targetElement.classList.contains('cart-list__delete')) {
      e.preventDefault();
      const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
      updateCart(targetElement, productId, false);

    }

  }


  //Подгрузка товаров
  async function getProducts(button) {
    if (!button.classList.contains('_hold')) {
      button.classList.add('_hold');
      const file = "json/products.json";
      let response = await fetch(file, {
        method: "GET"
      });
      if (response.ok) {
        let result = await response.json();
        loadProducts(result);
        button.classList.remove('_hold');
        button.remove();
      }
      else {
        alert("ошибка")
      }
    }
  }
  function loadProducts(data) {
    const productsItems = document.querySelector('.products__items');
    data.products.forEach(item => {
      const productId = item.id;
      const productUrl = item.url;
      const productImage = item.image;
      const productTitle = item.title;
      const productText = item.text;
      const productPrice = item.price;
      const productOldPrice = item.priceOld;
      const productShareUrl = item.shareUrl;
      const productLikeUrl = item.likeUrl;
      const productLabels = item.labels;


      let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
      let productTemplateEnd = `</article>`;
      let productTemplateLabels = '';
      if (productLabels) {
        let productTemplateLabelsStart = `<div class="item-product__labels">`;
        let productTemplateLabelsEnd = `</div>`;
        let productTemplateLabelsContent = '';
        productLabels.forEach(labelItem => {
          productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
        });
        productTemplateLabels += productTemplateLabelsStart;
        productTemplateLabels += productTemplateLabelsContent;
        productTemplateLabels += productTemplateLabelsEnd;
      }
      let productTemplateImage = `
      <a href="${productUrl}" class="item-product__img _ibg">
        <img src="img/products/${productImage}" alt="${productTitle}">
      </a>
    `;
      let productTemplateBodyStart = `<div class="item-product__body">`;
      let productTemplateBodyEnd = `</div>`;
      let productTemplateContent = `
      <div class="item-product__content">
        <h3 class="item-product__title">${productTitle}</h3>
        <div class="item-product__text">${productText}</div>
      </div>
    `;
      let productTemplatePrices = '';
      let productTemplatePricesStart = `<div class="item-product__prices">`;
      let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
      let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
      let productTemplatePricesEnd = `</div>`;
      productTemplatePrices = productTemplatePricesStart;
      productTemplatePrices += productTemplatePricesCurrent;
      if (productOldPrice) {
        productTemplatePrices += productTemplatePricesOld;
      }
      productTemplatePrices += productTemplatePricesEnd;
      let productTemplateActions = `
      <div class="item-product__actions actions-product">
        <div class="actions-product__body">
          <a href="" class="actions-product__btn btn btn_white">Add to cart</a>
          <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
          <a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
        </div>
      </div>
    `;
      let productTemplateBody = '';
      productTemplateBody += productTemplateBodyStart;
      productTemplateBody += productTemplateContent;
      productTemplateBody += productTemplatePrices;
      productTemplateBody += productTemplateActions;
      productTemplateBody += productTemplateBodyEnd;
      let productTemplate = '';
      productTemplate += productTemplateStart;
      productTemplate += productTemplateLabels;
      productTemplate += productTemplateImage;
      productTemplate += productTemplateBody;
      productTemplate += productTemplateEnd;

      productsItems.insertAdjacentHTML('beforeend', productTemplate);
    });
  }

//  Добавление товара в корзину
  function addToCart(productButton, productId){
    if(!productButton.classList.contains('_hold')){
      productButton.classList.add('_hold');
      productButton.classList.add('_fly');

      const cart = document.querySelector('.cart-header__icon');
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const productImage = product.querySelector('.item-product__img');

      const productImageFly = productImage.cloneNode(true);

      const productImageFlyWidth = productImage.offsetWidth;
      const productImageFlyHeight = productImage.offsetHeight;

      const productImageFlyTop = productImage.getBoundingClientRect().top;
      const productImageFlyLeft = productImage.getBoundingClientRect().left;

      productImageFly.setAttribute('class', '_flyImage _ibg');
      productImageFly.style.cssText = `
      left: ${productImageFlyLeft}px;
      top: ${productImageFlyTop}px;
      width: ${productImageFlyWidth}px;
      height: ${productImageFlyHeight}px;`;

      document.body.append(productImageFly);

      const cartFlyTop = cart.getBoundingClientRect().top;
      const cartFlyLeft = cart.getBoundingClientRect().left;
      productImageFly.style.cssText = `
      left: ${cartFlyLeft}px;
      top: ${cartFlyTop}px;
      width: 0;
      height: 0;
      opacity: 0;`;

      productImageFly.addEventListener('transitionend', function () {
        if(productButton.classList.contains('_fly')) {
          productImageFly.remove();
          updateCart(productButton, productId);
          productButton.classList.remove('_fly');
        }
      });
    }
 }

  //updateCart
  function updateCart(productButton, productId, productAdd = true) {
    const cart = document.querySelector('.cart-header');
    const cartIcon = cart.querySelector('.cart-header__icon');
    const cartQuantity = cartIcon.querySelector('span');
    const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
    const cartList = document.querySelector('.cart-list');

    if (productAdd) {
      if (cartQuantity) {
        cartQuantity.innerHTML = ++cartQuantity.innerHTML;
      } else {
        cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);

      }
      if(!cartProduct){
        const product = document.querySelector(`[data-pid="${productId}"]`);
        const cartProductImage = product.querySelector('.item-product__img').innerHTML;
        const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
        const cartProductContent =  `
          <a href="" class="cart-list__img">${cartProductImage}</a>
          <div class="cart-list__body">
            <a href="" class="cart-list__title">${cartProductTitle}</a>
            <div class="cart-list__quantity">Quantity: <span>1</span></div>
            <a href="" class="cart-list__delete">Delete</a>
          </div>`;
        cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
      } else {
        const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
        cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
      }



      productButton.classList.remove('_hold');
    } else{
      const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
      cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
      if(!parseInt(cartProductQuantity.innerHTML)) {
        cartProduct.remove();
      }
      const cartQuantityValue = --cartQuantity.innerHTML;

      if(cartQuantityValue) {
        cartQuantity.innerHTML = cartQuantityValue;
      } else {
        cartQuantity.remove();
        cart.classList.remove('_active');
      }
    }

  }

}
    //Бургер миню
  const iconBurger = document.querySelector('.icon-menu');
  const menuBurger = document.querySelector('.menu__body');
  if (iconBurger) {
    iconBurger.addEventListener("click", function (e) {
      document.body.classList.toggle('lock');
      iconBurger.classList.toggle('active');
      menuBurger.classList.toggle('active');
    })
  }

const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    if(iconBurger.classList.contains('active')){
        document.body.classList.remove('lock');
        iconBurger.classList.remove('active');
        menuBurger.classList.remove('active');
    }
  })
}

const swiperHome = new Swiper('.slider-home', {
  observer:true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween : 32,
  watchOverflow: 32,
  speed: 1000,
  direction: 'horizontal',
  loop: true,
  loopAdditionalSlides: 5,
  preloadImages: false,
  parallax: true,
  pagination: {
    el: '.controls-slider-main__dotts',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.slider-home .slider-arrow_next',
    prevEl: '.slider-home .slider-arrow_prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const swiperRooms = new Swiper('.sliders-rooms', {
  observer:true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween : 32,
  watchOverflow: 32,
  speed: 1000,
  direction: 'horizontal',
  loop: false,
  loopAdditionalSlides: 5,
  preloadImages: false,
  parallax: true,
  pagination: {
    el: '.controls-slider-main__dotts',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.sliders-rooms .slider-arrow_next',
    prevEl: '.sliders-rooms .slider-arrow_prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const swiperTips = new Swiper('.sliders-tips', {
  observer:true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween : 32,
  watchOverflow: 32,
  speed: 1000,
  direction: 'horizontal',
  loop: true,
  loopAdditionalSlides: 5,
  preloadImages: false,
  parallax: true,
  pagination: {
    el: '.controls-slider-main__dotts',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.sliders-tips .slider-arrow_next',
    prevEl: '.sliders-tips .slider-arrow_prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});



const furniture = document.querySelector('.furniture__body');
if(furniture && !isMobile()) {
  const furnitureItems = document.querySelector('.furniture__items');
  const furnitureColumn = document.querySelectorAll('.furniture__column');

  const speed = furniture.dataset.speed;

  let positionX = 0;
  let coordXprocent = 0;


  function setMouseGalleryStyle() {
    let furnitureItemsWidth = 0;
    furnitureColumn.forEach(element => {
      furnitureItemsWidth += element.offsetWidth;
    });

    const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
    const distX = Math.floor(coordXprocent - positionX);

    positionX = positionX + (distX * speed);
    let position = furnitureDifferent / 200 * positionX;

    furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0)`;

    if (Math.abs(distX) > 0) {
      requestAnimationFrame(setMouseGalleryStyle);
    } else {
      furniture.classList.remove('_init');
    }
  }
  furniture.addEventListener("mousemove", function(e) {

      const furnitureWidth = furniture.offsetWidth;

      const coordX = e.pageX - furnitureWidth / 2;

      coordXprocent = coordX / furnitureWidth * 200;

      if(!furniture.classList.contains('_init')) {
        requestAnimationFrame(setMouseGalleryStyle);
        furniture.classList.add('_init')
      }
    });
}

