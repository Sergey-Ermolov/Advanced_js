Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    template: `
        <div class="product_card_item">
            <div class="products">
                <product v-for="product of filtered" :key="product.id_product"></product>
            </div>
        </div>
    `
});
Vue.component('product', {
    props: ['product'],
    template: `
    <div class="product-desc">
        <h3 class="heading_product_card">{{product.product_name}}</h3>
        <p class="price_product_card">{{product.price}} ₽</p>
        <a href="#" class="button_buy" @click="addProduct(product)">Купить</a>
    </div>
    `
})