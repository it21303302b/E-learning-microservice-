import CartCard from '../components/cart/cartCard'
import Layout from '../components/layout'

const Cart = (props) => {
  return (
    <Layout>
      <div className="min-h-screen form-bg-img">
        <CartCard />
      </div>
    </Layout>
  )
}

export default Cart
