<template>
  <!-- <img src="https://i.imgur.com/JfPpwOA.gif" v-if="loading"> -->
  <div>
    <h1>Product List</h1>
    <div :key="product.id" class="box" v-for="product in products">
      <div class="img-wrapper">
        <img :src="product.img">
      </div>
      <i @click="addProductToCart(product)" class="fa fa-plus"></i>
      <h2>{{product.title}}</h2>
      <p>{{product.price|currency}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('product', {
      products: 'products'
    }),
    ...mapGetters('product', {
      productIsInStock: 'productIsInStock'
    })
  },
  methods: {
    ...mapActions({
      addProductToCart: 'cart/addProductToCart',
      fetchProducts: 'product/fetchProducts'
    })
  },
  created() {
    this.loading = true
    this.fetchProducts().then(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 20px;
}
.box {
  width: 230px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 0 10px;
  position: relative;
  .img-wrapper {
    height: 0;
    padding-bottom: 75%;
    img {
      width: 230px;
    }
  }
  i {
    width: 50px;
    height: 50px;
    background: #ed277f;
    color: #ffffff;
    border-radius: 25px;
    text-align: center;
    line-height: 50px;
    font-size: 1.4rem;
    position: absolute;
    right: 20px;
    top: 150px;
    box-shadow: 0 0 4px 2px rgba(80, 80, 80, 0.1);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }
  h2 {
    margin-left: 20px;
    margin: 15px;
  }
  p {
    margin-left: 20px;
    margin: 15px;
  }
}
</style>