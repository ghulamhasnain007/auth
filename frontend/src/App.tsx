// // import { useState } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login  from './pages/LoginSignUp'
// import Signup from './pages/SignUp';
// import { AuthProvider } from './context/AuthContext';
// import AdminDashboard from './pages/AdminDashboard';
// import Dashboard from './pages/Dashboard';

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login/>} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       </Router>   

//       <Router>
//         <Routes>
//             <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
//             <Route path='/dashboard' element={<Dashboard/>}/>
//         </Routes>
//       </Router>
//     </AuthProvider>
      
//     </>
//   )
// }

// export default App

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/LoginSignUp';
import Signup from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Login from './pages/LoginSignUp';
// import Signup from './pages/SignUp';
// import AdminDashboard from './pages/AdminDashboard';
// import Dashboard from './pages/Dashboard';

// import PreventAccess from '../src/components/PreventAccess';
// import ProtectedRoute from './components/ProtectedRoutes';

// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route
//                         path="/"
//                         element={
//                             <PreventAccess>
//                                 <Login />
//                             </PreventAccess>
//                         }
//                     />
//                     <Route
//                         path="/signup"
//                         element={
//                             <PreventAccess>
//                                 <Signup />
//                             </PreventAccess>
//                         }
//                     />

//                     {/* Protected Routes */}
//                     <Route
//                         path="/dashboard"
//                         element={
//                             <ProtectedRoute>
//                                 <Dashboard />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/admin/dashboard"
//                         element={
//                             <ProtectedRoute adminOnly>
//                                 <AdminDashboard />
//                             </ProtectedRoute>
//                         }
//                     />
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;
