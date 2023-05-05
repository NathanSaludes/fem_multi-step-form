function Container({ children }) {
  return (
    <div class="container border border-dashed border-slate-400 bg-white p-4 rounded-lg">
      {children}
    </div>
  )
}

export default Container;