// const _products = [
//   { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, 'inventory': 2 },
//   { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, 'inventory': 10 },
//   { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, 'inventory': 5 }
// ]

const _products = [
  {
    img: 'https://chenyiya.com/codepen/product-1.jpg',
    title: 'Beer Bottle',
    price: '25',
    id: 'beer',
    inventory: 2
  },
  {
    img: 'https://chenyiya.com/codepen/product-2.jpg',
    title: 'Eco Bag',
    price: '73',
    id: 'eco-bag',
    inventory: 10
  },
  {
    img: 'https://chenyiya.com/codepen/product-3.jpg',
    title: 'Paper Bag',
    price: '35',
    id: 'paper-bag',
    inventory: 5
  }
]

export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 1500)
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
