const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };
//
// getRequest('tel.json').then(data => {
//
// })

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////

// class ProductsList {
//   constructor(container = '.product_item_container'){
//       this.container = container;
//       this.goods = [];
//       this.allProducts = [];
//       this._getProducts()
//           .then(data => {
//               this.goods = [...data];
//               this.render()
//            });
//   }
//   _getProducts(){
//     return fetch(`${API}/catalogData.json`)
//         .then(result => result.json())
//         .catch(error => {
//             console.log(error);
//         })
// }
//   sumGoods () {
//     return this.allProducts.reduce((total, item) => total += item.price, 0)
//     }
//   render(){
//       const block = document.querySelector(this.container);
//       for (let product of this.goods){
//           const productObj = new ProductItem(product);
//           this.allProducts.push(productObj);
//           block.insertAdjacentHTML('beforeend', productObj.render());
//       }
//   }
// }

// class ProductItem {
//   constructor(product) {
//     this.title = product.product_name;
//     this.price = product.price;
//     this.id = product.id_product;
//   }
//   render(){
//       return `<div class="goods-item product_card_item" data-id="${this.id}">
//               <div class="desc">
//                   <h3 class="heading_product_card">${this.title}</h3>
//                   <p class="price_product_card">${this.price} ₽</p>
//                   <a class="button_buy" href="#"">Купить</a>
//               </div>
//               </div>`
//   }
// }

// let list = new ProductsList();

class List {
  constructor(url, container, list = list2){
      this.container = container;
      this.list = list;
      this.url = url;
      this.goods = [];
      this.allProducts = [];
      this.filtered = [];
      this._init();
  }
  getJson(url) {
      return fetch(url ? url : `${API + this.url}`)
          .then(result => result.json())
          .catch(error => {
              console.log(error);
          })
  }
  handleData(data) {
      this.goods = [...data];
      this.render();
  }
  sumGoods () {
    return this.allProducts.reduce((total, item) => total += item.price, 0)
    }
  render() {
      const block = document.querySelector(this.container);
      for (let product of this.goods){
          const productObj = new this.list[this.constructor.name](product);
          console.log(productObj);
          this.allProducts.push(productObj);
          block.insertAdjacentHTML('beforeend', productObj.render());
      }
  }
  filter(value) {
      const regexp = new RegExp(value, 'i');
      this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
      this.allProducts.forEach(el => {
          const block = document.querySelector(`.product_card_item[data-id="${el.id_product}"]`);
          if(!this.filtered.includes(el)){
              block.classList.add('invisible');
          } else {
              block.classList.remove('invisible');
          }
      })
  }
  _init() {
      return false
  }
}

class Item {
  constructor(el){
      this.product_name = el.product_name;
      this.price = el.price;
      this.id_product = el.id_product;
  }
  render() {
      return `<div class="product_card_item" data-id="${this.id_product}">
                  <h3 class="heading_product_card">${this.product_name}</h3>
                  <p class="price_product_card">${this.price} $</p>
                  <a class="button_buy"
                  data-id="${this.id_product}"
                  data-name="${this.product_name}"
                  data-price="${this.price}">Купить</a>
            </div>`
  }
}

class ProductsList extends List {
  constructor(cart, container = '.product_item_container', url = "/catalogData.json"){
      super(url, container);
      this.cart = cart;
      this.getJson()
          .then(data => this.handleData(data));
  }
  _init() {
      document.querySelector(this.container).addEventListener('click', e => {
          if(e.target.classList.contains('button_buy')){
              this.cart.addProduct(e.target);
          }
      });
      document.querySelector('.search-form').addEventListener('submit', e => {
          e.preventDefault();
          this.filter(document.querySelector('.search-field').value)
      })
  }
}

class ProductItem extends Item {}

class Cart extends List {
  constructor(container = ".basket-block", url = "/getBasket.json"){
      super(url, container);
      this.getJson()
          .then(data => {
              this.handleData(data.contents);
          });
  }
  addProduct(element) {
      this.getJson(`${API}/addToBasket.json`)
          .then(data => {
              if(data.result === 1) {
                  let productId = +element.dataset['id'];
                  let find = this.allProducts.find(product => product.id_product === productId);
                  if(find){
                      find.quantity++;
                      this._updateCart(find);
                  } else {
                      let product = {
                          id_product: productId,
                          price: +element.dataset['price'],
                          product_name: element.dataset['name'],
                          quantity: 1
                      };
                      this.goods = [product];
                      this.render();
                  }
              } else {
                  alert('Error');
              }
          })
  }
  removeProduct(element) {
      this.getJson(`${API}/deleteFromBasket.json`)
          .then(data => {
              if(data.result === 1){
                  let productId = +element.dataset['id'];
                  let find = this.allProducts.find(product => product.id_product === productId);
                  if(find.quantity > 1) {
                      find.quantity--;
                      this._updateCart(find);
                  } else {
                      this.allProducts.splice(this.allProducts.indexOf(find), 1);
                      document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                  }
              } else {
                  alert('Error');
              }
          })
  }
  _updateCart(product) {
     let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
     block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
     block.querySelector('.product-price').textContent = `${product.quantity*product.price} ₽`;
  }
  _init() {
      document.querySelector('.basket_button').addEventListener('click', () => {
          document.querySelector(this.container).classList.toggle('invisible');
      });
      document.querySelector(this.container).addEventListener('click', e => {
         if(e.target.classList.contains('del-btn')){
             this.removeProduct(e.target);
         }
      })
  }

}

class CartItem extends Item {
  constructor(el){
      super(el);
      this.quantity = el.quantity;
  }
  render() {
  return `<div class="cart-item" data-id="${this.id_product}">
          <div class="product-bio">
          <div class="product-desc">
          <p class="product-title">${this.product_name}</p>
          <p class="product-quantity">Количество: ${this.quantity}</p>
      <p class="product-single-price">${this.price} ₽ за штуку</p>
      </div>
      </div>
      <div class="right-block">
          <p class="product-price">${this.quantity*this.price} ₽</p>
          <button class="del-btn" data-id="${this.id_product}">&times;</button>
      </div>
      </div>`
  }
}
const list2 = {
  ProductsList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);