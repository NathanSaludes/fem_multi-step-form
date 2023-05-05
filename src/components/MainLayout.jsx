function MainLayout({ children }) {
  return (
    <main class="flex items-center justify-center antialiased bg-slate-200/60 min-h-screen">
      {children}
    </main>
  )
}

export default MainLayout;