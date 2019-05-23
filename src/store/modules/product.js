import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    productIsInStock() {
      return (product) => {
        return product.inventory > 0
      }
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    decrementProductInventory(state, { id }) {
      state.products.find(item => item.id === id).inventory--
    }
  }
}