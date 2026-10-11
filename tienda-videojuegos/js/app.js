const { useState, useMemo } = React;

const categorias = ['Todas', 'Acción', 'Aventura', 'RPG', 'Deportes', 'Estrategia'];

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency', currency: 'CLP', maximumFractionDigits: 0
  }).format(precio);
}

function Navbar({ cantidadCarrito }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-pv sticky-top" aria-label="Navegación principal">
      <div className="container py-1">
        <a className="navbar-brand d-flex align-items-center" href="#inicio" aria-label="Pixel Vault, ir al inicio">
          <span className="brand-mark">P</span> PIXEL VAULT
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir o cerrar menú">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#catalogo">Catálogo</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
            <li className="nav-item ms-lg-2">
              <a className="btn btn-outline-light btn-sm px-3" href="#catalogo" aria-label={`Carrito de compras: ${cantidadCarrito} productos`}>
                Carrito <span className="cart-count">{cantidadCarrito}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center gy-5">
          <div className="col-lg-7">
            <div className="eyebrow"><span className="eyebrow-dot"></span> Tu próxima aventura comienza aquí</div>
            <h1>Juega a tu manera.<br /><span className="text-lime">Vive otra historia.</span></h1>
            <p className="hero-copy">Descubre mundos increíbles, encuentra tu próximo juego favorito y prepárate para subir de nivel.</p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <a className="btn btn-lime btn-lg px-4" href="#catalogo">Explorar catálogo <span aria-hidden="true">↗</span></a>
              <a className="btn btn-outline-light btn-lg px-4" href="#contacto">Contáctanos</a>
            </div>
            <div className="hero-stats" aria-label="Datos de la tienda">
              <div className="stat"><strong>08+</strong><span>Juegos destacados</span></div>
              <div className="stat"><strong>05</strong><span>Categorías</span></div>
              <div className="stat"><strong>100%</strong><span>Actitud gamer</span></div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="hero-art">
              <img src="assets/covers/elden-ring.svg" alt="Arte gráfico original inspirado en juegos de fantasía" />
              <div className="hero-sticker">NUEVAS AVENTURAS ✦</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GameCard({ juego, onAgregarCarrito, modoAdmin, onEliminar }) {
  return (
    <article className="game-card">
      <div className="game-cover-wrap">
        <img className="game-cover" src={juego.imagen} alt={`Portada gráfica de ${juego.nombre}`} loading="lazy" />
        <span className="game-tag">{juego.categoria}</span>
      </div>
      <div className="game-card-body">
        <h3>{juego.nombre}</h3>
        <p className="game-description">{juego.descripcion}</p>
        <div className="game-card-footer">
          <span className="game-price">{formatearPrecio(juego.precio)}</span>
          <button className="btn btn-lime btn-add" type="button" onClick={() => onAgregarCarrito(juego.id)} aria-label={`Agregar ${juego.nombre} al carrito`}>
            + Agregar
          </button>
          {modoAdmin && (
            <button className="btn-delete" type="button" onClick={() => onEliminar(juego.id)} aria-label={`Eliminar ${juego.nombre} del catálogo`}>
              Eliminar
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function GameList({ juegos, onAgregarCarrito, modoAdmin, onEliminar }) {
  if (juegos.length === 0) {
    return <div className="empty-state"><div className="fs-2 mb-2" aria-hidden="true">⌕</div><strong>No encontramos videojuegos.</strong><br />Prueba otra búsqueda o categoría.</div>;
  }
  return (
    <div className="games-grid">
      {juegos.map((juego) => (
        <GameCard key={juego.id} juego={juego} onAgregarCarrito={onAgregarCarrito} modoAdmin={modoAdmin} onEliminar={onEliminar} />
      ))}
    </div>
  );
}

function AddGameForm({ onAgregar, onCancelar }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Aventura');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!nombre.trim() || !descripcion.trim() || Number(precio) <= 0) {
      setError('Completa todos los campos y escribe un precio mayor que cero.');
      return;
    }
    onAgregar({
      id: Date.now(), nombre: nombre.trim(), categoria, precio: Number(precio),
      descripcion: descripcion.trim(), imagen: 'assets/covers/indie.svg'
    });
  }

  return (
    <form className="admin-panel mb-4" onSubmit={manejarEnvio} noValidate>
      <div className="d-flex justify-content-between gap-3 align-items-start mb-3">
        <div><strong className="d-block">Agregar videojuego</strong><span className="small text-secondary">El nuevo producto aparecerá al instante en el catálogo.</span></div>
        <button className="btn btn-sm btn-outline-light" type="button" onClick={onCancelar}>Cerrar</button>
      </div>
      <div className="row g-3">
        <div className="col-md-6"><label className="form-label" htmlFor="nuevoNombre">Nombre</label><input id="nuevoNombre" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} maxLength="70" required /></div>
        <div className="col-md-3"><label className="form-label" htmlFor="nuevaCategoria">Categoría</label><select id="nuevaCategoria" className="form-select" value={categoria} onChange={e => setCategoria(e.target.value)}>{categorias.filter(c => c !== 'Todas').map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="col-md-3"><label className="form-label" htmlFor="nuevoPrecio">Precio (CLP)</label><input id="nuevoPrecio" className="form-control" type="number" min="1" step="1" value={precio} onChange={e => setPrecio(e.target.value)} required /></div>
        <div className="col-12"><label className="form-label" htmlFor="nuevaDescripcion">Descripción</label><textarea id="nuevaDescripcion" className="form-control" rows="2" maxLength="180" value={descripcion} onChange={e => setDescripcion(e.target.value)} required /></div>
      </div>
      {error && <div className="alert alert-danger py-2 mt-3 mb-0" role="alert">{error}</div>}
      <button className="btn btn-lime mt-3" type="submit">Guardar videojuego</button>
    </form>
  );
}

function Catalogo({ juegos, onAgregarCarrito, onAgregarJuego, onEliminar }) {
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [modoAdmin, setModoAdmin] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const juegosFiltrados = useMemo(() => juegos.filter(juego => {
    const coincideCategoria = categoriaActiva === 'Todas' || juego.categoria === categoriaActiva;
    const texto = `${juego.nombre} ${juego.descripcion} ${juego.categoria}`.toLocaleLowerCase('es');
    return coincideCategoria && texto.includes(busqueda.trim().toLocaleLowerCase('es'));
  }), [juegos, categoriaActiva, busqueda]);

  function agregarDesdeFormulario(juego) {
    onAgregarJuego(juego);
    setMostrarFormulario(false);
    setCategoriaActiva('Todas');
    setBusqueda('');
  }

  return (
    <section className="section-pad catalog-section" id="catalogo">
      <div className="container">
        <div className="row align-items-end gy-3">
          <div className="col-lg-8">
            <div className="section-kicker">La selección Pixel Vault</div>
            <h2 className="section-title">Encuentra tu próximo juego</h2>
            <p className="section-desc mb-0">Desde grandes aventuras hasta desafíos estratégicos. Filtra por categoría o busca por nombre.</p>
          </div>
          <div className="col-lg-4 text-lg-end"><button type="button" className={`btn ${modoAdmin ? 'btn-lime' : 'btn-outline-light'}`} onClick={() => { setModoAdmin(!modoAdmin); setMostrarFormulario(false); }} aria-pressed={modoAdmin}>{modoAdmin ? '✓ Modo administrador activo' : 'Administrar catálogo'}</button></div>
        </div>

        <div className="filter-bar" aria-label="Filtrar videojuegos por categoría">
          {categorias.map(categoria => <button type="button" key={categoria} className={`filter-btn ${categoriaActiva === categoria ? 'active' : ''}`} onClick={() => setCategoriaActiva(categoria)} aria-pressed={categoriaActiva === categoria}>{categoria}</button>)}
          <div className="ms-md-auto"><label className="visually-hidden" htmlFor="buscarJuego">Buscar videojuegos</label><input id="buscarJuego" className="search-control" type="search" placeholder="Buscar videojuego…" value={busqueda} onChange={e => setBusqueda(e.target.value)} /></div>
        </div>

        {modoAdmin && (
          <div className="admin-panel mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div><strong>Panel de administración</strong><div className="small text-secondary">Puedes agregar títulos o eliminar productos de esta sesión de demostración.</div></div>
            <button type="button" className="btn btn-lime" onClick={() => setMostrarFormulario(!mostrarFormulario)}>{mostrarFormulario ? 'Cancelar' : '+ Agregar videojuego'}</button>
          </div>
        )}
        {modoAdmin && mostrarFormulario && <AddGameForm onAgregar={agregarDesdeFormulario} onCancelar={() => setMostrarFormulario(false)} />}

        <div className="catalog-meta"><span>Mostrando <strong className="text-white">{juegosFiltrados.length}</strong> de {juegos.length} videojuegos</span><span>Precios en pesos chilenos (CLP)</span></div>
        <GameList juegos={juegosFiltrados} onAgregarCarrito={onAgregarCarrito} modoAdmin={modoAdmin} onEliminar={onEliminar} />
      </div>
    </section>
  );
}

function ContactForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function validarFormulario(evento) {
    evento.preventDefault();
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = 'Ingresa tu nombre.';
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email.trim()) nuevosErrores.email = 'Ingresa tu correo electrónico.';
    else if (!patronEmail.test(email.trim())) nuevosErrores.email = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.';
    if (!mensaje.trim()) nuevosErrores.mensaje = 'Escribe tu mensaje.';
    else if (mensaje.trim().length < 10) nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    setErrores(nuevosErrores);
    setEnviado(false);
    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true);
      setNombre(''); setEmail(''); setMensaje('');
    }
  }

  return (
    <section className="section-pad form-section" id="contacto">
      <div className="container">
        <div className="text-center">
          <div className="section-kicker">Estamos para ayudarte</div>
          <h2 className="section-title">Hablemos de videojuegos</h2>
          <p className="section-desc mx-auto">¿Tienes una consulta o buscas algún título? Envíanos tu mensaje a través del formulario.</p>
        </div>
        <div className="contact-card">
          {enviado && <div className="alert alert-success" role="status"><strong>¡Mensaje validado!</strong> Tus datos están completos y el formulario funciona correctamente. Esta demostración no envía mensajes a un servidor.</div>}
          {Object.keys(errores).length > 0 && <div className="alert alert-danger" role="alert">Revisa los campos marcados antes de continuar.</div>}
          <form onSubmit={validarFormulario} noValidate>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label" htmlFor="contactoNombre">Nombre completo</label>
                <input id="contactoNombre" className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} type="text" autoComplete="name" placeholder="Ej. Alex Pérez" value={nombre} onChange={e => { setNombre(e.target.value); setErrores(prev => ({ ...prev, nombre: '' })); }} aria-invalid={Boolean(errores.nombre)} aria-describedby={errores.nombre ? 'errorNombre' : undefined} />
                {errores.nombre && <div className="invalid-feedback" id="errorNombre">{errores.nombre}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="contactoEmail">Correo electrónico</label>
                <input id="contactoEmail" className={`form-control ${errores.email ? 'is-invalid' : ''}`} type="email" autoComplete="email" placeholder="nombre@correo.cl" value={email} onChange={e => { setEmail(e.target.value); setErrores(prev => ({ ...prev, email: '' })); }} aria-invalid={Boolean(errores.email)} aria-describedby={errores.email ? 'errorEmail' : undefined} />
                {errores.email && <div className="invalid-feedback" id="errorEmail">{errores.email}</div>}
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="contactoMensaje">Mensaje</label>
                <textarea id="contactoMensaje" className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`} rows="5" placeholder="Cuéntanos cómo podemos ayudarte…" value={mensaje} onChange={e => { setMensaje(e.target.value); setErrores(prev => ({ ...prev, mensaje: '' })); }} aria-invalid={Boolean(errores.mensaje)} aria-describedby={errores.mensaje ? 'errorMensaje' : undefined}></textarea>
                {errores.mensaje && <div className="invalid-feedback" id="errorMensaje">{errores.mensaje}</div>}
                <div className="form-text">El mensaje debe tener al menos 10 caracteres.</div>
              </div>
              <div className="col-12 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
                <small className="text-secondary">Los campos son obligatorios.</small>
                <button className="btn btn-lime btn-lg px-4" type="submit">Validar y enviar mensaje ↗</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div><strong><span className="text-lime">P</span> PIXEL VAULT</strong><div className="small mt-1">Proyecto académico · Desarrollo Frontend I · PFY2201</div></div>
        <div className="footer-links"><a href="#inicio">Inicio</a><a href="#catalogo">Catálogo</a><a href="#contacto">Contacto</a></div>
        <div className="small">© {new Date().getFullYear()} · Sitio de demostración</div>
      </div>
    </footer>
  );
}

function App() {
  const [juegos, setJuegos] = useState(videojuegosIniciales);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [avisoCarrito, setAvisoCarrito] = useState('');

  function agregarAlCarrito(id) {
    const juego = juegos.find(item => item.id === id);
    if (!juego) return;
    setCantidadCarrito(cantidad => cantidad + 1);
    setAvisoCarrito(`${juego.nombre} se agregó al carrito de demostración.`);
    window.setTimeout(() => setAvisoCarrito(''), 2800);
  }

  function agregarJuego(juego) {
    setJuegos(lista => [juego, ...lista]);
  }

  function eliminarJuego(id) {
    const juego = juegos.find(item => item.id === id);
    if (!juego) return;
    if (window.confirm(`¿Eliminar “${juego.nombre}” del catálogo de esta sesión?`)) {
      setJuegos(lista => lista.filter(item => item.id !== id));
    }
  }

  return (
    <>
      <header><Navbar cantidadCarrito={cantidadCarrito} /></header>
      <main>
        <Hero />
        {avisoCarrito && <div className="container pt-3"><div className="alert alert-success mb-0" role="status">{avisoCarrito}</div></div>}
        <Catalogo juegos={juegos} onAgregarCarrito={agregarAlCarrito} onAgregarJuego={agregarJuego} onEliminar={eliminarJuego} />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

const raiz = ReactDOM.createRoot(document.getElementById('root'));
raiz.render(<App />);
