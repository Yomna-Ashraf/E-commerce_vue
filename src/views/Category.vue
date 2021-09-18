<template>
    <div class="category-page main-style">
        <div class="show-product-home">
            <div class="div-head"><p>{{ category.name }}</p></div>
        </div>
        <div class="product-view-con">
            <ProductBox 
            v-for="product in category.products"
            v-bind:key="product.id"
            v-bind:product="product" />
            <!--
           <div class="product-view"
            v-for="product in category.products"
            v-bind:key="product.id"
            >
                <div class="img-con">
                    <figure class="img-figure"><img :src ="product.get_thumbnail" class="pro-img"></figure>
                    <div class=pro-info>
                        <p class="pro-name">{{product.name}}</p>
                        <p class="pro-price">${{product.price}}</p>
                        <router-link v-bind:to='product.get_absolute_url'><button class="pro-btn">View Details</button></router-link>            
                    </div>

                </div>
            </div> -->     
        </div>
    </div>
</template>
<script>
import axios from 'axios'
  import ProductBox from '@/components/ProductBox'

export default {
    name: 'Category',
    data(){
        return {
            category: {
                products: []
            }
        }
    },
    components: {
      ProductBox
    },
    mounted() {
        this.getCategory()
    },
    watch: {
        $route(to, from) {
            if (to.name === 'Category') {
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)
            axios
                .get(`/api/v1/products/${categorySlug}/`)
                .then(response => {
                    this.category = response.data
                    document.title = this.category.name + ' | Details Matter'
                })
                .catch(error => {
                    console.log(error)

                })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>