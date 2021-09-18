<template>
    <div>
        <li><router-link :to="item.product.get_absolute_url" class="link-pro">{{ item.product.name }}</router-link></li>
        <li style="text-align:center">${{ item.product.price }}</li>
        <li style="text-align:center" >

            <a @click="decrementQuantity(item)" class="cur">-</a>
            {{ item.quantity }}            
            <a @click="incrementQuantity(item)" class="cur">+</a>
        </li>
        <li style="text-align:center">${{ getItemTotal(item).toFixed(2) }}</li>
        <!--<button class="delete" @click="removeFromCart(item)">Remove</button>-->
    </div>
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initialItem: Object
    },
    data() {
        return {
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        decrementQuantity(item) {
            item.quantity -= 1
            if (item.quantity === 0) {
                this.$emit('removeFromCart', item)
            }
            this.updateCart()
        },
        incrementQuantity(item) {
            item.quantity += 1
            this.updateCart()
        },
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item) {
            this.$emit('removeFromCart', item)
            this.updateCart()
        },
    },
}
</script>