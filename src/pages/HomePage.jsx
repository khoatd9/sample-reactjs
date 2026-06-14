import React, {useState} from 'react';
import Modal from "../components/Modal"
import Header from "../components/Header"
import WishlistItems from "../components/WishListItems"

import { Star , User} from 'lucide-react';



function HomePage() {
  const [data, setData] = useState({
    name: "",
    description: "",
    criteriaA: 0,
    criteriaB: 0
  })
  const [items, setItems] = useState([])

  console.log("Items list", items)
  function updateItems(newItem) {
    let newArray = [...items] // Create new array
    newArray.push(newItem)
    setItems(newArray)
  }

  // function updateData(data) {
  //   setData(data)
  // }

  return (
    <div>
      <div className="flex justify-between my-6 mx-8">
          <div>
              <h1 className="font-bold text-2xl">User Wishlist</h1>
              <p className="text-gray-600">Manage and prioritize wishlist items using weighted decision matrix</p>
          </div>
          <Modal onSave={updateItems}/>
      </div>
      
      {
        items.map(item => (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-fit hover">
            <div className="flex justify-between gap-4 mb-1">
              <h1 className="text-2xl font-bold text-bray-900">{item.name}</h1>
              <div className="items-center gap-2 bg-blue-100 text-blue-700 font-bold px-4 rounded p-1"><Star size={18} fill="currentColor" color="currentColor" />1
                </div>
              </div>
              
                <p className="text-gray-600 text-lg mb-1">{item.description}</p>
              
              <hr className="mb-5"/>
              
              <h2 className="font-bold text-gray-800 mb-4">Crriteria Scores</h2>
              <div className="flex gap-3">
              <div className="flex justify-between bg-gray-50 px-5 p-1 rounded">
              <div className="text-gray-600">Criteria</div>
              <div className="font-semibold">{item.criteriaA}</div>
              </div>

              <div className="flex justify-between bg-gray-50 px-5 p-1 rounded">
                <div className="text-gray-600">Criteria</div>
              <div className="font-semibold">{item.criteriaB}</div>
              </div>
          </div>
          </div>
        ))
      }

      {
        items.map(item => (
          <div className="bg-white border rounded-box border-gray-200 w-fit p-5 m-7 hover:shadow-md">
              <div className="flex justify-between">
                <p className="text-xl font-semibold mb-2">{item.name}</p>
                <div className="bg-blue-100 rounded-full w-fit py-1 px-3 flex items-center justify-between gap-2 text-blue-600">
                  <Star size={18} fill="currentColor" color="currentColor" />
                  <p className="font-semibold">{item.criteriaA + item.criteriaB}</p>
                </div>
              </div>

              <div className="flex justify-between w-fit items-center gap-2 mb-4">
                <User size={18}/>
                <p className="text-sm">User A</p>
              
              </div>
              <p>{item.description}</p>
              
              <div className="border-t border-gray-300 my-4" />
              <p className="mb-2">Criteria Scores</p>
              
              <div className="flex justify-between gap-3">
                <div className="bg-gray-50 rounded-box p-3 justify-between flex gap-10">
                  <p className="text-gray-600 font-light">Criteria A</p>
                  <p className="text-lg">{item.criteriaA}</p>
                </div>
                <div className="bg-gray-50 rounded-box p-3 justify-between flex gap-10">
                  <p className="text-gray-600 font-light">Criteria B</p>
                  <p className="text-lg">{item.criteriaB}</p>
                </div>
              </div> 
          </div>
        ))
      }

    </div>
  )
}

export default HomePage