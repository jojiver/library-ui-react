import './styles/global.css';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { GuestLayout } from './pages/guest/layout.tsx'
import GuestHomePage from './pages/guest/index.tsx'
import GuestBooksPage from './pages/guest/books/index.tsx'
import { UserLoginPage } from './pages/auth/user-login-page.tsx'
import { AdminLoginPage } from './pages/auth/admin-login-page.tsx'
import { AdminLayout } from './pages/dashboard/admin/layout.tsx'
import AdminDashboardPage from './pages/dashboard/admin/index.tsx'
import AdminBooksPage from './pages/dashboard/admin/books/index.tsx'
import AdminBorrowingsPage from './pages/dashboard/admin/borrowings/index.tsx'
import { UserLayout } from './pages/dashboard/user/layout.tsx'
import UserDashboardPage from './pages/dashboard/user/index.tsx'
import UserBooksPage from './pages/dashboard/user/books/index.tsx'
import UserBorrowingsPage from './pages/dashboard/user/borrowings/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<GuestHomePage />} />
        <Route path="books" element={<GuestBooksPage />} />
      </Route>

      <Route path="/login" element={<UserLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="/dashboard/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="books" element={<AdminBooksPage />} />
        <Route path="borrowings" element={<AdminBorrowingsPage />} />
      </Route>

      <Route path="/dashboard/user" element={<UserLayout />}>
        <Route index element={<UserDashboardPage />} />
        <Route path="books" element={<UserBooksPage />} />
        <Route path="borrowings" element={<UserBorrowingsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)