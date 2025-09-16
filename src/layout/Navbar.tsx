function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 
    transform -translate-x-1/2 w-full mx-auto mt-5 rounded-4xl max-w-6xl z-50 bg-gradient-to-br from-white/10 via-cyan-200/10 to-white/10 backdrop-blur-xs backdrop-saturate-150 border-b border-white/20 shadow-xl bg-[length:400%_400%] animate-glass-glow">

      <div className="flex justify-between items-center text-white px-10 py-2">
        <div className="flex justify-start items-center">
          <img src="/images/Firma.svg" alt="Logo" className="h-15" />
        </div>
        <div className="flex justify-end items-center space-x-4 font-montserrat font-thin">
          <button onClick={() => window.location.href = "/"}>Home</button>
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Projects</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
