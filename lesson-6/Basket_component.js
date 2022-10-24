Vue.component('basket', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          showCart: false,
      }
    },
    methods: {
        addProduct(product){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted(){
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
<div class="basket_button"><a href="#">
    <img src="img_index/basket.svg" alt="basket" @click="showCart = !showCart"></a>
</div>
<div class="basket-block" v-show="showCart">
    <p v-if="!cartItems.length">Корзина пуста</p>
    <div class="cart-item" 
    v-for="item of cartItems" 
    :key="item.id_product">
    </div>
</div>
`
});
Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">
    <div class="product-bio">
        <div class="product-desc">
            <p class="product-title">{{item.product_name}}</p>
            <p class="product-quantity">Количество: {{item.quantity}}</p>
            <p class="product-single-price"> {{item.price}} ₽ за штуку</p>
        </div>
    </div>
    <div class="right-block">
        <p class="product-price">{{item.quantity*item.price}}</p>
        <button class="del-btn" @click="remove(item)">&times;</button>
    </div>
</div>
    `
});