import '@/styles/global.css';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { GuestLayout } from '@/pages/guest/layout.tsx'
import HomePage from '@/pages/guest/home/index.tsx'
import BooksPage from '@/pages/guest/books/index.tsx'
import BookDetailPage from '@/pages/guest/books/[id].tsx'
import AboutPage from '@/pages/guest/about/index.tsx'
import ContactPage from '@/pages/guest/contact/index.tsx'
import { AdminLoginPage } from '@/pages/auth/admin-login-page.tsx'
import { AdminLayout } from '@/pages/dashboard/admin/layout.tsx'
import AdminDashboardPage from '@/pages/dashboard/admin/index.tsx'
import AdminBooksPage from './pages/dashboard/admin/books/index.tsx'
import AdminBorrowingsPage from '@/pages/dashboard/admin/borrowings/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<HomePage />} />
        <Route path="books" element={<BooksPage />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="/dashboard/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="books" element={<AdminBooksPage />} />
        <Route path="borrowings" element={<AdminBorrowingsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)