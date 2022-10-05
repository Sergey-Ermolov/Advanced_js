const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title, price) => {      
  title = 'Продукт';
  price = 20;  // Переделал присваивание по умолчанию
  return `<div class="goods-item product_card_item"><h3 class="heading_product_card">${title}</h3><p class="price_product_card">${price} ₽</p></div>`;
};

// const renderGoodsList = (list) => {
//   let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
//   document.querySelector('.goods-list').innerHTML = goodsList.join(''); //-- Убрал запятую
// }

// Можно записать в одну строку:
const renderGoodsList = (list) => document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join('')

renderGoodsList(goods);