<template>
    <div class="order-con">
        <h3 class="is-size-4 mb-6">Order #{{ order.id }}</h3>


        <div class="table is-fullwidth">
                <ul class="cart-headers">
                    <li>Product</li>
                    <li>Price</li>
                    <li>Quantity</li>
                    <li>Total</li>
                </ul>

                <ul class="cart-items2"
                    v-for="item in order.items"
                    v-bind:key="item.product.id"
                >
                    <li>{{ item.product.name }}</li>
                    <li>${{ item.product.price }}</li>
                    <li>{{ item.quantity }}</li>
                    <li>${{ getItemTotal(item).toFixed(2) }}</li>
                </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OrderSummary',
    props: {
        order: Object
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        orderTotalLength(order) {
            return order.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
    }
}
</script>