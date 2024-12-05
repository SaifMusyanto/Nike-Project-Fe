//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
// import Home from '../views/Dashboard.tsx';

//import view login
import Login from '../views/Login.tsx';

//import view register
import Register from '../views/Register.tsx';

//import view Dashboard
import Dashboard from '../views/Dashboard.tsx';

// import view Display
import Display from '../views/Display.tsx';

//import cartProvider
import CartProvider from '../views/component/CartContext'; // Adjust the path accordingly

//import view product pages
import ProductIndex from '../views/ProductIndex.jsx';
import ProductCreate from '../views/ProductCreate.jsx';
import ProductEdit from '../views/ProductEdit.tsx';
import ProductDetails from "../views/ProductDetails.tsx";
import CheckOutPage from "../views/CheckoutPage.tsx";
import HistoryPage from "../views/History.tsx";
import ManageProduct from "../views/ManageProducts.tsx";

function RoutesIndex() {
    return (
        <CartProvider>
        <Routes>

            {/* route "/" */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* route "/product" */}
            <Route path="/product" element={<ProductIndex />} />

            {/* route "/product/create" */}
            <Route path="/product/create" element={<ProductCreate />} />

            {/* route "/login" */}
            <Route path="/login" element={<Login />} />

             {/* route "/register" */}
            <Route path="/register" element={<Register />} />

             {/* route "/display" */}
            <Route path="/display" element={<Display />} />

             {/* route "/display" */}
            <Route path="/detailProduct" element={<ProductDetails />} />
        
            {/* Route for product details */}
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* Route for checkout page */}
            <Route path="/checkout/:id" element={<CheckOutPage />} />
            
            {/* Route for history page */}
            <Route path="/history" element={<HistoryPage />} />

            {/* Route for history page */}
            <Route path="/admin" element={<ManageProduct />} />
        
            {/* Route for edit product page */}
            <Route path="/edit-product/:id" element={<ProductEdit />} />
        
        
        </Routes>
        </CartProvider>
    );
}

export default RoutesIndex;
