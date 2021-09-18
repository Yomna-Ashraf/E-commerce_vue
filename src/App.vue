
<template>
 
  <div id="wrapper">
    <nav>
      <div class="main-style navbar">
        <div class="header-and-nav">
          <router-link to="/" class=nav-header><p class="head-name"><em>Details</em> <em style="color:rgb(216, 67, 92);">Matters</em></p></router-link>
          <div class="menu"><button class="min-icon" id="responsive-btn"><i class="material-icons">menu</i></button></div>
        </div>
        <div class="right-nav" id="responsive-nav">
          <ul class="nav-ul">
            <li><router-link to="/rings" class="category">Rings</router-link></li>
            <li><router-link to="/necklaces" class="category" >Necklaces</router-link></li>
            <li><router-link to="/bracelets" class="category">Bracelets</router-link></li>
          </ul>
          <div class="head-btns">
              <router-link to="/my-account" v-if="$store.state.isAuthenticated"><button class="signin-btn">Profile</button></router-link>
              <router-link to="/log-in" v-else><button class="signin-btn">Sign In</button></router-link>
              <router-link to="/cart" style="text-decoration:none;"><button class="cart-btn"><i class="fa fa-shopping-cart"></i><p>Cart ({{ cartTotalLength }})</p></button></router-link>              
          </div>        
        </div>
        <!--<div class="menu"><button class="min-icon"><i class="material-icons">menu</i></button></div>-->
      </div>  


    </nav>
    <div class="load-con" v-bind:class="{'is-loading': $store.state.isLoading }">
      <div class="loader" >
        <div class="loaderBar"></div>
      </div>
      <div class="load-text">LOADING...</div>
    </div>        

    <main>
          <router-view style="min-height:500px"/>
    </main>
    <footer> 
      <p class="footer-para">Yomna Ashraf &#169;copyright 2021</p>
    </footer>

  </div>

</template>

<style lang="scss">

  @import 'style.css';

</style>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      cart: {
        items: []
      }
    }
  },
  beforeCreate(){
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } 
    else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted(){
    this.cart = this.$store.state.cart
  },
  computed: {
    
      cartTotalLength() {
          let totalLength = 0
          for (let i = 0; i < this.cart.items.length; i++) {
              totalLength += this.cart.items[i].quantity
          }
          return totalLength
      }
  }
}
</script>
