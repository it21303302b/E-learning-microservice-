import ItemDetails from '../components/items/coursePageCard'

import Navbar from '../components/layout/header/Navbar'

const Displayitems = () => {
  return (
    <div>
      <Navbar />
      <div className="m-5 bg-blue-900 py-10 mx-10 text-white text-4xl font-black text-center rounded-xl">
        <h1>All Courses</h1>
      </div>
      <ItemDetails />
    </div>
  )
}

export default Displayitems
