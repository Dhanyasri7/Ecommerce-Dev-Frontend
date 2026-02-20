import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoryProducts from "./pages/CategoryProducts";
import AllProducts from "./pages/AllProducts";
import SearchPage from "./pages/SearchPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login setToken={setToken} />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard setToken={setToken} />
            </ProtectedRoute>
          }
        />

        <Route path="/products"
               element={
                <ProtectedRoute>
                  <AllProducts/>
                </ProtectedRoute>
               }/>
         <Route path="/category/:catid" element={ <ProtectedRoute> <CategoryProducts /> </ProtectedRoute> } />

        <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
/>

       

      </Routes>
    </BrowserRouter>
  );
}

export default App;
