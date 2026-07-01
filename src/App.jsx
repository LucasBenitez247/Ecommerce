import React, { useEffect, useRef } from 'react';

function App() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Animaciones micro-interactivas al hacer scroll (Intersection Observer)
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    const cards = containerRef.current.querySelectorAll('.glass-card');
    cards.forEach(el => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
      observer.observe(el);
    });

    // Efecto interactivo de brillo de neón con el movimiento del mouse
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroRef.current.style.setProperty('--mouse-x', `${x}px`);
        heroRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    const currentHero = heroRef.current;
    if (currentHero) {
      currentHero.addEventListener('mousemove', handleMouseMove);
    }

    // Limpieza de eventos al desmontar el componente (Buenas prácticas de memoria)
    return () => {
      cards.forEach(el => observer.unobserve(el));
      if (currentHero) {
        currentHero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="font-sans bg-[#0c0e17] text-[#e1e1ef] overflow-x-hidden min-h-screen">
      {/* Barra de Navegación (TopNavBar) */}
      <nav className="fixed top-0 w-full z-50 h-20 bg-[#11131c]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_30px_rgba(0,219,233,0.15)]">
        <div className="flex items-center justify-between px-6 md:px-12 max-w-[1440px] mx-auto h-full">
          <div className="flex items-center gap-8">
            {/* Nuevo Logo Tipográfico Arreglado */}
            <a className="flex items-center font-bold text-2xl tracking-[0.2em]" href="#">
              <span className="text-white">NEON</span>
              <span className="text-primary-container ml-1">TECH</span>
            </a>

            {/* Enlaces Traducidos */}
            <div className="hidden lg:flex gap-6">
              <a className="font-mono text-sm text-primary border-b-2 border-primary-container pb-2 transition-all duration-300" href="#">Procesadores</a>
              <a className="font-mono text-sm text-[#b9cacb] hover:text-primary transition-colors duration-300" href="#">Gráficas</a>
              <a className="font-mono text-sm text-[#b9cacb] hover:text-primary transition-colors duration-300" href="#">Memoria</a>
              <a className="font-mono text-sm text-[#b9cacb] hover:text-primary transition-colors duration-300" href="#">Refrigeración</a>
              <a className="font-mono text-sm text-[#b9cacb] hover:text-primary transition-colors duration-300" href="#">Periféricos</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded px-4 py-2">
              <span className="material-symbols-outlined text-primary text-sm">search</span>
              <input className="bg-transparent border-none outline-none focus:ring-0 font-mono text-sm text-[#b9cacb] placeholder:text-[#b9cacb]/40 ml-2 w-48" placeholder="BUSCAR SISTEMA..." type="text" />
            </div>
            <div className="flex items-center gap-4">
              <button className="text-primary cursor-pointer hover:bg-white/5 p-2 rounded transition-all duration-200">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              <button className="text-primary cursor-pointer hover:bg-white/5 p-2 rounded transition-all duration-200">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section (Sección Principal con textos gigantes) */}
        <section ref={heroRef} className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            {/* Fondo oscuro con gradiente radial sutil para compensar si falla la imagen externa */}
            <div className="w-full h-full bg-[#0c0e17] opacity-90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1)_0%,transparent_60%)]"></div>
          </div>

          <div className="relative z-10 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
            <div className="max-w-3xl">
              <span className="font-mono text-primary tracking-[0.3em] mb-6 block animate-pulse uppercase text-sm font-semibold">
                Estado del Sistema: Óptimo
              </span>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white tracking-tighter uppercase">
                Explorá el <br />
                <span className="text-primary-container neon-glow">Futuro de la Tecnología</span>
              </h1>

              <p className="text-lg md:text-xl text-[#b9cacb] mb-10 max-w-xl leading-relaxed font-light">
                Rendimiento inigualable. Diseñado para visionarios. Experimentá la próxima evolución en precisión de hardware y excelencia estética.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="neon-button cursor-pointer bg-primary-container text-[#002022] font-bold tracking-wider px-8 py-4 rounded-md transition-all flex items-center justify-center gap-3">
                  <span>COMPRAR AHORA</span>
                  <span className="material-symbols-outlined">trending_flat</span>
                </button>
                <button className="glass-card cursor-pointer  font-bold text-white tracking-wider px-8 py-4 rounded-md transition-all border border-white/20 hover:bg-white/10 hover:border-primary-container">
                  VER GALERÍA
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Componentes Principales (Featured Products) */}
        <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wide">Componentes Principales</h2>
              <div className="h-1 w-24 bg-primary-container"></div>
            </div>
            <a className="font-mono text-sm text-primary hover:underline underline-offset-8 transition-all hidden sm:block" href="#">VER TODO EL HARDWARE -&gt;</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tarjeta de Producto 1: Procesador */}
            <div className="glass-card p-6 flex flex-col group rounded-xl cursor-pointer" onClick={() => console.log("Ir al detalle del producto")}>
              <div className="aspect-square mb-6 overflow-hidden bg-[#1d1f29] rounded-lg relative">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600')" }}></div>
                <span className="absolute top-3 left-3 bg-[#b600f8] text-white font-mono text-[10px] font-bold px-2 py-1 rounded tracking-wider">NUEVO</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">HyperCore i9-14900KS</h3>
                <p className="font-mono text-sm text-[#b9cacb] mb-4">6.2GHz | 24 Núcleos</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-primary">$689.99</span>
                {/* El botón tiene su propio clic. El e.stopPropagation() evita que al cliquear el carrito, también se active el clic de la tarjeta que te lleva a otra página */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Agregado al carrito");
                  }}
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-[#002022] w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Tarjeta de Producto 2: Placa de Video */}
            <div className="glass-card p-6 flex flex-col group rounded-xl cursor-pointer" onClick={() => console.log("Ir al detalle del producto")}>
              <div className="aspect-square mb-6 overflow-hidden bg-[#1d1f29] rounded-lg relative">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=600')" }}></div>
                <span className="absolute top-3 left-3 bg-[#00dbe9] text-[#002022] font-mono text-[10px] font-bold px-2 py-1 rounded tracking-wider">INSIGNIA</span>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">Quantum-X 5090 Ti</h3>
                <p className="font-mono text-sm text-[#b9cacb] mb-4">32GB GDDR7 | Ray Tracing Gen 5</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-primary">$1,999.00</span>
                {/* El botón tiene su propio clic. El e.stopPropagation() evita que al cliquear el carrito, también se active el clic de la tarjeta que te lleva a otra página */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Agregado al carrito");
                  }}
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-[#002022] w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Tarjeta de Producto 3: RAM */}
            <div className="glass-card p-6 flex flex-col group rounded-xl cursor-pointer" onClick={() => console.log("Ir al detalle del producto")}>
              <div className="aspect-square mb-6 overflow-hidden bg-[#1d1f29] rounded-lg relative">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&q=80&w=600')" }}></div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">AuraFlux 64GB DDR5</h3>
                <p className="font-mono text-sm text-[#b9cacb] mb-4">8000MT/s | CL34 | ARGB</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-primary">$349.99</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Agregado al carrito");
                  }}
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-[#002022] w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                </button>
              </div>
            </div>

            {/* Tarjeta de Producto 4: SSD */}
            <div className="glass-card p-6 flex flex-col group rounded-xl cursor-pointer" onClick={() => console.log("Ir al detalle del producto")}>
              <div className="aspect-square mb-6 overflow-hidden bg-[#1d1f29] rounded-lg relative">
                <div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600')" }}></div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">Zenith NVMe Gen6 4TB</h3>
                <p className="font-mono text-sm text-[#b9cacb] mb-4">16GB/s Lectura | 14GB/s Escritura</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-primary">$499.00</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Agregado al carrito");
                  }}
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-[#002022] w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid / Sección de Características */}
        <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#0c0e17]/50 rounded-3xl mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
            <div className="lg:col-span-2 glass-card rounded-2xl p-12 relative overflow-hidden h-[400px] flex items-end cursor-pointer" onClick={() => console.log("Ir la seccion de configurador")}>
              <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000')" }}></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tighter">CREÁ TU LEGADO</h2>
                <p className="text-lg text-[#b9cacb] max-w-md mb-6">Accedé a nuestro laboratorio exclusivo de configuración. Seleccioná cada componente con precisión y mirá cómo tu visión cobra vida en 3D.</p>
                <button className="font-mono text-primary font-bold flex items-center gap-2 group">
                  INICIAR CONFIGURADOR <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 flex flex-col justify-center items-center text-center border-[#00f0ff]/20 cursor-pointer" onClick={() => console.log("Ir a la sección de pruebas")}>
              <div className="w-16 h-16 bg-[#00f0ff]/20 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#00f0ff] text-3xl">verified</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">PRUEBAS DE ÉLITE</h3>
              <p className="text-[#b9cacb]">Cada componente se somete a 72 horas de pruebas de estrés en condiciones térmicas extremas antes de salir de nuestra bóveda.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Pie de página) */}
      <footer className="w-full py-16 px-6 md:px-12 bg-[#0c0e17] border-t border-[#3b494b]/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[1440px] mx-auto">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold text-[#ebb2ff] mb-6 uppercase tracking-tighter">NEON TECH</h2>
            <p className="text-[#b9cacb] mb-6">Liderando la industria en computación de alto rendimiento y diseño de hardware futurista desde 2024.</p>
            <div className="flex gap-4">
              <a className="text-[#b9cacb] hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
              <a className="text-[#b9cacb] hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">forum</span></a>
              <a className="text-[#b9cacb] hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-primary font-bold uppercase mb-6">Tienda</h4>
            <ul className="space-y-4">
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Procesadores</a></li>
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Placas de Video</a></li>
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Memoria y Almacenamiento</a></li>
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Sistemas de Refrigeración</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-primary font-bold uppercase mb-6">Soporte</h4>
            <ul className="space-y-4">
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Envíos y Entregas</a></li>
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Devoluciones</a></li>
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Soporte Técnico</a></li>
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Garantía</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-primary font-bold uppercase mb-6">Legales</h4>
            <ul className="space-y-4">
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Política de Privacidad</a></li>
              <li><a className="text-[#b9cacb] hover:text-[#f8d8ff] transition-colors" href="#">Términos y Condiciones</a></li>
            </ul>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="font-mono text-xs text-[#b9cacb] opacity-60">© 2026 NEON TECH. DISEÑANDO EL FUTURO.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;