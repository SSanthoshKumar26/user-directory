import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import UsersList from './pages/UsersList';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import ViewUser from './pages/ViewUser';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#F9FAFB] relative overflow-x-hidden">
        {/* Subtle Background Decor */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary-500/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-secondary-500/5 rounded-full blur-[100px] animate-pulse delay-700" />
        </div>

        <div className="relative z-10 font-sans">
          <Navbar />
          <main className="pb-24 pt-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="/add" element={<AddUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
                <Route path="/view/:id" element={<ViewUser />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#1e293b',
                borderRadius: '14px',
                padding: '14px 20px',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
                border: '1px solid #f1f5f9',
                fontSize: '13px',
                fontWeight: '600'
              }
            }}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
