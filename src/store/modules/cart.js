import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    cart: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts(state, getters, rootState, rootGetters) {
      return state.cart.map(cartItem => {
        const product = rootState.product.products.find(product => product.id === cartItem.id)
        return {
          id: cartItem.id,
          title: product.title,
          img: product.img,
          price: product.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal(state, getters) {
      return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
    }
  },
  actions: {
    addProductToCart({ commit, state, getters, rootState, rootGetters }, product) {
      if (rootGetters['product/productIsInStock'](product)) {
        const cartItem = state.cart.find(item => item.id === product.id)
        if (!cartItem) {
          commit('pushProductToCart', product)
        } else {
          commit('incrementItemQuantity', product)
        }
        commit('product/decrementProductInventory', product, { root: true })
      }
    },

    incrementCartQty({ commit, rootGetters, rootState }, item) {
      const product = rootState.product.products.find(product => product.id === item.id)
      if (rootGetters['product/productIsInStock'](product)) {
        commit('incrementItemQuantity', item)
        commit('product/decrementProductInventory', product, { root: true })
      }
    },

    decrementCartQty({ commit }, item) {
      commit('decrementItemQuantity', item)
    },

    removeCartItem({ commit }, item) {
      commit('remove', item)
    },

    checkout({ commit, state }) {
      shop.buyProducts(state.cart, () => {
        commit('emptyCart')
        commit('setCheckoutStatus', 'success')
      }, () => {
        commit('setCheckoutStatus', 'fail')
      })
    }
  },
  mutations: {
    pushProductToCart(state, { id }) {
      state.cart.push({
        id,
        quantity: 1
      })
    },

    incrementItemQuantity(state, { id }) {
      const cartItem = state.cart.find(item => item.id === id)
      cartItem.quantity++
    },

    decrementItemQuantity(state, { id }) {
      const cartItem = state.cart.find(item => item.id === id)
      cartItem.quantity = cartItem.quantity === 0 ? 0 : cartItem.quantity - 1
    },

    emptyCart(state) {
      state.cart = []
    },

    remove(state, { id }) {
      const itemIndex = state.cart.findIndex(item => item.id === id)
      state.cart.splice(itemIndex, 1)
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    }
  }
}