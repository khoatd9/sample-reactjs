import Modal from "./Modal"
function Header() {
    return (
        <div className="flex justify-between my-6 mx-8">
            <div>
                <h1 className="font-bold text-2xl">User Wishlist</h1>
                <p className="text-gray-600">Manage and prioritize wishlist items using weighted decision matrix</p>
            </div>
            <Modal />
        </div>
    )
}

export default Header