<template>
    <div class="category-page main-style">
        <div class="show-product-home">
            <div class="div-head"><p>Cart</p></div>
        </div>
        <div class="cart-view">
            <div class="cart-items-view">
                <div class="" v-if="cartTotalLength">
                    <ul class="cart-headers">
                        <li>Product</li>
                        <li style="text-align:center">Price</li>
                        <li style="text-align:center">Quantity</li>
                        <li style="text-align:center">Total</li>
                    </ul>
                    <ul class="cart-items">
                        <CartItem
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                            v-bind:initialItem="item"
                            v-on:removeFromCart="removeFromCart"/>
                    </ul>
                </div>
                <p v-else style="color:lightGrey">You don't have any products in your cart...</p>
            </div>
            <div class="check-out" v-if="cartTotalLength">
                    <h2 class="subtitle">Summary</h2>

                    <p class="total-price">${{ cartTotalPrice.toFixed(2) }}<br> {{ cartTotalLength }} items</p>


                    <router-link to="/cart/checkout" class="check-btn">Proceed to checkout</router-link>
            </div>
        </div>
    </div> 



 
</template>
<script>
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'
export default {
    name:'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    mounted() {
        this.cart = this.$store.state.cart
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        }
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
    }
}
</script>