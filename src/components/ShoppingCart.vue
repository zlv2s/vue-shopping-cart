<template>
  <div class="cart">
    <div class="head">
      <div class="goods">Goods Item</div>
      <div class="price">Price</div>
      <div class="quantity">Quantity</div>
      <div class="op">Operation</div>
      <div class="total">Total</div>
    </div>
    <div :key="product.id" class="row" v-for="product in products">
      <div class="item-desc">
        <div class="placeholder">
          <img :src="product.img">
        </div>
        <h4>{{product.title}}</h4>
      </div>
      <p class="price">{{product.price|currency}}</p>
      <div class="qty-op">
        <p @click="decrementCartQty(product)" class="qty-minus">-</p>
        <p class="qty">{{product.quantity}}</p>
        <p @click="incrementCartQty(product)" class="qty-plus">+</p>
      </div>
      <div @click="removeCartItem(product)" class="del">Remove</div>
      <div class="totalprice">{{(product.price * product.quantity)|currency}}</div>
    </div>
    <div class="bottom">
      <a
        :class="{'pure-button-disabled':!products.length}"
        @click.prevent="checkout"
        class="pure-button"
        href="#"
      >
        <i class="fa fa-shopping-cart fa-lg"></i>
        Checkout
      </a>
      <h5>Total: {{total|currency}}</h5>
    </div>
    <p>{{status}}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'cart/cartProducts',
      total: 'cart/cartTotal'
    }),
    ...mapState({
      status: state => state.cart.checkoutStatus
    })
  },
  methods: {
    ...mapActions({
      checkout: 'cart/checkout',
      addProductToCart: 'cart/addProductToCart',
      incrementCartQty: 'cart/incrementCartQty',
      decrementCartQty: 'cart/decrementCartQty',
      removeCartItem: 'cart/removeCartItem'
    })
  }
}
</script>

<style lang="scss" scoped>
.cart {
  margin-top: 100px;
  overflow: hidden;
  margin-bottom: 100px;
  .head {
    width: 100%;
    border-bottom: 1px solid #bfbfbf;
    height: 40px;
    display: flex;
    .goods {
      color: #777;
      line-height: 40px;
      flex: 2;
    }
    .price {
      color: #777;
      line-height: 40px;
      flex: 1;
      text-align: center;
      padding-right: 40px;
    }
    .quantity {
      color: #777777;
      flex: 1;
      line-height: 40px;
      text-align: center;
      padding-right: 40px;
    }
    .op {
      color: #777777;
      line-height: 40px;
      text-align: center;
      flex: 1;
    }
    .total {
      color: #777777;
      line-height: 40px;
      text-align: right;
      flex: 0.8;
    }
  }
  .row {
    width: 100%;
    border-bottom: 1px solid #bfbfbf;
    overflow: hidden;
    padding: 10px 0;
    display: block;
    display: flex;
    .item-desc {
      display: flex;
      flex: 2;
      align-items: center;
      .placeholder {
        img {
          width: 100px;
        }
      }
      h4 {
        line-height: 100px;
        margin-left: 20px;
        width: 100px;
      }
    }
    .price {
      flex: 1;
      line-height: 100px;
      text-align: center;
      padding-right: 40px;
    }
    .qty-op {
      display: flex;
      justify-content: center;
      flex: 1;
      padding-right: 40px;
      .qty-minus {
        line-height: 100px;
        text-align: center;
        cursor: pointer;
      }
      .qty {
        line-height: 100px;
        margin-left: 20px;
        margin-right: 20px;
        text-align: center;
      }
      .qty-plus {
        line-height: 100px;
        text-align: center;
        cursor: pointer;
      }
    }
    .del {
      text-align: center;
      flex: 1;
      line-height: 100px;
      cursor: pointer;
      text-decoration: underline;
      color: #ed277f;
    }
    .totalprice {
      line-height: 100px;
      text-align: right;
      flex: 0.8;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;

    h5 {
      font-size: 20px;
    }
  }
  p {
    font-size: 20px;
  }
}
</style>