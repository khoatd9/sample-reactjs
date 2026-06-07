function Modal() {
    return (
        <>
            <button onClick={() =>document.getElementById('item_id').showModal()} className="btn bg-blue-600 text-white hover:bg-blue-500">Add item</button>
            <dialog id="item_id" className="modal">
                <div className="modal-box max-h-3/4">
                    {/* Modal Content */}
                    <div className="font-bold">Add Wishlist Item </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">User</div>
                    <input type="text" placeholder="Enter user item" className="input-bordered w-full bg-gray-50 placeholder-gray-400 p-1"/>
                    
                    
                    <h3 className="font-bold text-lg">items here</h3>
                    <p className="py-4">press esc key or click the button below to close</p>
                    
                    <p className="font-semibold text-lg mb-5">Weighted Decision Matrix</p>
                    <p className="text-sm text-gray-500">Rate each criterion from 1 (lowest) to 5 (highest)</p>
                    <div className="flex justify-between my-5">
                        <div>
                            <p className="font-semibold">Criteria A</p>
                            <p className="text-gray-500 text-sm">First evaluation criteria</p>
                        </div>
                        <details className="dropdown">
                            <summary role="button" className="btn w-20 justify-start text-sm rounded-box h-9">1</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box w-20 p-2">
                                <li><a>1</a></li>
                                <li><a>2</a></li>
                                <li><a>3</a></li>
                                <li><a>4</a></li>
                                <li><a>5</a></li>
                            </ul>
                            
                        </details>

                    </div>

                    
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn"> Close </button>
                        </form>
                    </div>
                </div>
            </dialog>    
        </>
    )
}

export default Modal;