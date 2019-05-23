<template>
  <div id="app">
    <product-list></product-list>
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'

export default {
  name: 'app',
  components: {
    ProductList,
    ShoppingCart
  }
}
</script>

<style>
html,
body {
  background-color: #eee;
  font-family: calibri, sans-serif;
}

#app {
  width: 760px;
  margin: 20px auto;
}
</style>