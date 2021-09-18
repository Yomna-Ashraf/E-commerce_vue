<template>
    <div class="product-view">
        <div class="img-con">
            <figure class="img-figure"><img :src ="product.get_thumbnail" class="pro-img"></figure>
            <div class=pro-info>
                <p class="pro-name">{{product.name}}</p>
                <p class="pro-price">${{product.price}}</p>
                <router-link v-bind:to='product.get_absolute_url'><button class="pro-btn">View Details</button></router-link>            
            </div>
        </div>
    </div>      
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
}
</script>