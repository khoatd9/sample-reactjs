import React, {useState} from 'react';

function Modal({ onSave }) {
    const [user, setUser] = useState("")
    const [itemName, setItemName] = useState("")
    const [description, setDescription] = useState("")
    const [criteriaA, setCriteriaA] = useState(1)
    const [criteriaB, setCriteriaB] = useState(1)

    function handleSaveItem() {
        onSave({
            "user": user,
            "name": itemName,
            "description": description,
            "criteriaA": criteriaA, 
            "criteriaB": criteriaB
        })

        setUser("");
        setItemName("")
        setDescription("")
        setCriteriaA(1)
        setCriteriaB(1)
    }

    return (
        <>
            <button onClick={() =>document.getElementById('item_id').showModal()} className="btn bg-blue-600 text-white hover:bg-blue-500">Add item</button>
            <dialog id="item_id" className="modal">
                <div className="modal-box max-h-3/4">
                    {/* Modal Content */}
                    <div className="font-bold text-3xl mb-6">Add Wishlist Item </div>
                    <div className=" font-semibold text-gray-800 mb-1">User: {user}</div>
                    <input value={user} onChange={(e) => setUser(e.target.value) } type="text" placeholder="Enter user item" className="border rounded-box input-bordered w-full border-gray-200 placeholder-gray-400 p-2 mb-4"/>
                    
                    
                    <h3 className="font-semibold text-gray-800 mb-1">Item Name</h3>
                    <input 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                        type="text" 
                        placeholder="Enter item name" 
                        className="border rounded-box input-bordered w-full border-gray-200 placeholder-gray-400 p-2 mb-4"/>

                    <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter item description" className="border rounded-box input-bordered w-full border-gray-200 placeholder-gray-400 h-30 mb-8 p-2 align-items: flex-start"/>
                    
                    
                    <p className="font-semibold text-lg mb-5">Weighted Decision Matrix</p>
                    <p className="text-sm text-gray-500">Rate each criterion from 1 (lowest) to 5 (highest)</p>
                    <div className="flex justify-between my-5">
                        <div>
                            <p className="font-semibold">Criteria A</p>
                            <p className="text-gray-500 text-sm">First evaluation criteria</p>
                        </div>
                        <select
                        value={criteriaA}
                        onChange={(e) => setCriteriaA(Number(e.target.value))}
                        >
                        {[1,2,3,4,5].map(score => (
                            <option key={score} value={score}>
                            {score}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="flex justify-between my-5">
                        <div>
                            <p className="font-semibold">Criteria B</p>
                            <p className="text-gray-500 text-sm">First evaluation criteria</p>
                        </div>
                        <select
                        value={criteriaB}
                        onChange={(e) => setCriteriaB(Number(e.target.value))}
                        >
                        {[1,2,3,4,5].map(score => (
                            <option key={score} value={score}>
                            {score}
                            </option>
                        ))}
                        </select>
                    </div>

                   
                    
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-10">
                            <button onClick={() => handleSaveItem()} className="btn btn-primary btn-soft"> Save </button>
                            <button className="btn"> Close </button>
                        </form>
                    </div>
                </div>
            </dialog>    
        </>
    )
}

export default Modal;