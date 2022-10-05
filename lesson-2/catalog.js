// const goods = [
//   { title: 'Shirt', price: 150 },
//   { title: 'Socks', price: 50 },
//   { title: 'Jacket', price: 350 },
//   { title: 'Shoes', price: 250 },
// ];

// const renderGoodsItem = (title, price) => {      
//   title = 'Продукт';
//   price = 20;
//   return `<div class="goods-item product_card_item"><h3 class="heading_product_card">${title}</h3><p class="price_product_card">${price} ₽</p><a class="button_buy" href="#"">Купить</a></div>`;
// };

// const renderGoodsList = (list) => document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join('')


// renderGoodsList(goods); 

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


class ProductsList {
  constructor(container = '.product_item_container'){
      this.container = container;
      this.goods = [];
      this.allProducts = [];
      this._fetchProducts()
  }
  _fetchProducts(){
      this.goods = [
        { title: 'Shirt', price: 150 },
        { title: 'Socks', price: 50 },
        { title: 'Jacket', price: 350 },
        { title: 'Shoes', price: 250 },
      ];
  }
  sumGoods () {
    return this.allProducts.reduce((total, item) => total += item.price, 0)
    }
  render(){
      const block = document.querySelector(this.container);
      for (let product of this.goods){
          const productObj = new ProductItem(product);
          this.allProducts.push(productObj);
          block.insertAdjacentHTML('beforeend', productObj.render());
      }
  }
}

class ProductItem {
  constructor(product) {
      this.title = product.title;
      this.price = product.price;
      this.id = product.id;
  }
  render(){
      return `<div class="goods-item product_card_item" data-id="${this.id}">
              <div class="desc">
                  <h3 class="heading_product_card">${this.title}</h3>
                  <p class="price_product_card">${this.price} ₽</p>
                  <a class="button_buy" href="#"">Купить</a>
              </div>
              </div>`
  }
}

class TotalPrise {
  constructor(total){
      total = allProducts.reduce((total, item) => total += item.price, 0)
  }
}

let list = new ProductsList();
list.render();
console.log(list.sumGoods());