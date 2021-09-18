<template>
    <div class="category-page main-style">
        <div class="show-product-home">
            <div class="div-head"><p>Cart</p></div>
        </div>
        <div class="sh-con">
            <div class="">
                <div  class="">
                    <ul class="cart-headers">
                        <li>Product</li>
                        <li style="text-align:center">Price</li>
                        <li style="text-align:center">Quantity</li>
                        <li style="text-align:center">Total</li>
                    </ul>

                        <ul class="cart-items2"
                            v-for="item in cart.items"
                            v-bind:key="item.product.id"
                        >
                            <li>{{ item.product.name }}</li>
                            <li>${{ item.product.price }}</li>
                            <li>{{ item.quantity }}</li>
                            <li>${{ getItemTotal(item).toFixed(2) }}</li>
                        </ul>

                        <ul class="cart-items3">
                            <li style="width:50%">Total</li>
                            <li>{{ cartTotalLength }}</li>
                            <li>${{ cartTotalPrice.toFixed(2) }}</li>
                        </ul>
                </div>
            </div>

            <div class="fields">
                <div class="show-product-home">
                    <div class="div-head"><p>Shipping Details</p></div>
                    <p class="p-sh">* All fields are required</p>

                </div>

                <div class="ship-detail">
                    <div class="ship-det">
                        <div class="field">
                            <label>First name*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="first_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>Last name*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="last_name">
                            </div>
                        </div>

                        <div class="field">
                            <label>E-mail*</label>
                            <div class="control">
                                <input type="email" class="input" v-model="email">
                            </div>
                        </div>

                        <div class="field">
                            <label>Phone*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="phone">
                            </div>
                        </div>
                    </div>

                    <div class="ship-det">
                        <div class="field">
                            <label>Address*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="address">
                            </div>
                        </div>

                        <div class="field">
                            <label>Zip code*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="zipcode">
                            </div>
                        </div>

                        <div class="field">
                            <label>Place*</label>
                            <div class="control">
                                <input type="text" class="input" v-model="place">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="notification is-danger mt-4" v-if="errors.length">
                    <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                </div>

                <hr>

                <div id="card-element" class="input" style="margin:auto"></div>

                <template v-if="cartTotalLength">
                    <hr>

                    <button class="check-btn" style='width:100%' @click="submitForm">Pay with Stripe</button>
                </template>
            </div>
        </div>
    </div>
</template>




<script>
import axios from 'axios'
export default {
    name: 'Checkout',
    data() {
        return {
            cart: {
                items: []
            },
            stripe: {},
            card: {},
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Checkout | Details Matter'
        this.cart = this.$store.state.cart
        if (this.cartTotalLength > 0) {
            this.stripe = Stripe('pk_test_51JUTehAoxhTCIvjBAnVqxfpheluw2QXTanPtQrxsrwbqFsn5UEZWxhBXzNJ5CKzQJF7zFGmASSACtYIhJ7D1BBqs00437gdaCc')
            const elements = this.stripe.elements();
            this.card = elements.create('card', { hidePostalCode: true })
            this.card.mount('#card-element')
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        submitForm() {
            this.errors = []
            if (this.first_name === '') {
                this.errors.push('The first name field is missing!')
            }
            if (this.last_name === '') {
                this.errors.push('The last name field is missing!')
            }
            if (this.email === '') {
                this.errors.push('The email field is missing!')
            }
            if (this.phone === '') {
                this.errors.push('The phone field is missing!')
            }
            if (this.address === '') {
                this.errors.push('The address field is missing!')
            }
            if (this.zipcode === '') {
                this.errors.push('The zip code field is missing!')
            }
            if (this.place === '') {
                this.errors.push('The place field is missing!')
            }
            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true)
                this.stripe.createToken(this.card).then(result => {                    
                    if (result.error) {
                        this.$store.commit('setIsLoading', false)
                        this.errors.push('Something went wrong with Stripe. Please try again')
                        console.log(result.error.message)
                    } else {
                        this.stripeTokenHandler(result.token)
                    }
                })
            }
        },
        async stripeTokenHandler(token) {
            const items = []
            for (let i = 0; i < this.cart.items.length; i++) {
                const item = this.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price * item.quantity
                }
                items.push(obj)
            }
            const data = {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                'address': this.address,
                'zipcode': this.zipcode,
                'place': this.place,
                'phone': this.phone,
                'items': items,
                'stripe_token': token.id
            }
            await axios
                .post('/api/v1/checkout/', data)
                .then(response => {
                    this.$store.commit('clearCart')
                    this.$router.push('/cart/success')
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')
                    console.log(error)
                })
                this.$store.commit('setIsLoading', false)
        }
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
}
</script>