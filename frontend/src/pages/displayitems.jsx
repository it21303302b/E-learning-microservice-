import ItemDetails from '../components/items/coursePageCard'
import Layout from '../components/layout'

const Displayitems = () => {
  return (
    <div>
      <Layout>
        <div className="min-h-screen form-bg-img p-10">
          <div className="bg-blue-900 py-10 mx-10 mb-5 text-white text-4xl font-black text-center rounded-xl">
            <h1>All Courses</h1>
          </div>
          <ItemDetails />
        </div>
      </Layout>
    </div>
  )
}

export default Displayitems
