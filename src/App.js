// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [flashlightPosition, setFlashlightPosition] = useState({ x: 0, y: 0 });
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCart, setShowCart] = useState(false);
  
  const flashlightRef = useRef(null);
  
  // Produtos - sombras de objetos
  const products = [
    {
      id: 1,
      name: "Sombra Nebulosa",
      price: 89.99,
      description: "Sombra que transforma objetos em visões cósmicas",
      effect: "gradient",
      category: "cosmic",
      tags: ["#psicodélico", "#universo"],
      intensity: 8
    },
    {
      id: 2,
      name: "Eclipse Permanente",
      price: 109.99,
      description: "Para dias que nunca acabam... ou começam?",
      effect: "smoke",
      category: "dramatic",
      tags: ["#mistério", "#dramático"],
      intensity: 9
    },
    {
      id: 3,
      name: "Véu das Estrelas",
      price: 129.99,
      description: "Seu objeto merece um brilho celestial",
      effect: "sparkle",
      category: "elegant",
      tags: ["#elegante", "#galáctico"],
      intensity: 7
    },
    {
      id: 4,
      name: "Abismo Silencioso",
      price: 79.99,
      description: "Profundezas de escuridão pura",
      effect: "deep",
      category: "minimalist",
      tags: ["#minimalista", "#profundo"],
      intensity: 10
    },
    {
      id: 5,
      name: "Aurora Obscura",
      price: 119.99,
      description: "Cores que dançam na escuridão",
      effect: "aurora",
      category: "artistic",
      tags: ["#artístico", "#vibrante"],
      intensity: 6
    },
    {
      id: 6,
      name: "Névoa Lunar",
      price: 99.99,
      description: "Sutil como o luar na névoa",
      effect: "mist",
      category: "subtle",
      tags: ["#suave", "#misterioso"],
      intensity: 5
    }
  ];

  // Filtrar produtos
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  // Lanterna interativa
  useEffect(() => {
    const handleMouseMove = (e) => {
      setFlashlightPosition({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        setFlashlightOn(!flashlightOn);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [flashlightOn]);

  // Adicionar ao carrinho
  const addToCart = (product) => {
    setCart([...cart, product]);
    
    // Animação de adição
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      cartIcon.classList.add('pulse');
      setTimeout(() => {
        cartIcon.classList.remove('pulse');
      }, 500);
    }
  };

  // Remover do carrinho
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Calcular total
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  // Categorias
  const categories = [
    { id: 'all', name: 'Todas as Sombras' },
    { id: 'cosmic', name: 'Cósmico' },
    { id: 'dramatic', name: 'Dramático' },
    { id: 'elegant', name: 'Elegante' },
    { id: 'minimalist', name: 'Minimalista' },
    { id: 'artistic', name: 'Artístico' },
    { id: 'subtle', name: 'Sutil' }
  ];

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      {/* Lanterna */}
      {flashlightOn && (
        <div 
          ref={flashlightRef}
          className="flashlight" 
          style={{
            left: `${flashlightPosition.x}px`,
            top: `${flashlightPosition.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Header */}
      <header>
        <div className="logo">
          <span className="logo-icon">🌑</span>
          <h1>Dark Spectrum</h1>
          <p>Sombras que transformam realidades</p>
        </div>
        
        <div className="header-controls">
          <button 
            className="flashlight-toggle"
            onClick={() => setFlashlightOn(!flashlightOn)}
          >
            {flashlightOn ? '🔦 Desligar Lanterna' : '🔦 Ligar Lanterna'}
          </button>
          
          <button 
            className="mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
          </button>
          
          <div 
            className="cart-icon" 
            onClick={() => setShowCart(!showCart)}
          >
            🛒 <span className="cart-count">{cart.length}</span>
          </div>
        </div>
      </header>

      {/* Carrinho */}
      {showCart && (
        <div className="cart-modal">
          <div className="cart-header">
            <h3>Sua Nave de Sombras</h3>
            <button onClick={() => setShowCart(false)}>✕</button>
          </div>
          
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart">Sua nave está vazia! Adicione sombras.</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>R${item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>
          
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <strong>R${cartTotal.toFixed(2)}</strong>
            </div>
            <button className="checkout-btn">Finalizar Viagem Espacial 🚀</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h2>Transforme qualquer objeto em uma experiência cósmica!</h2>
            <p>Sombras que desafiam a realidade e brincam com a luz</p>
            <button className="cta-button">Explorar Galáxia de Sombras 🚀</button>
          </div>
          <div className="hero-visual">
            <div className="floating-objects">
              <div className="object cube"></div>
              <div className="object sphere"></div>
              <div className="object pyramid"></div>
            </div>
            <div className="shadow-display">
              <div className="dynamic-shadow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtro de Sombras */}
      <section className="shadow-filter">
        <h3>Encontre sua Sombra Perfeita</h3>
        <div className="filter-options">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </section>

      {/* Produtos */}
      <section className="products">
        <div className="products-header">
          <h2>Coleção de Sombras</h2>
          <div className="intensity-filter">
            <span>Intensidade: </span>
            <select onChange={(e) => setActiveFilter(e.target.value)}>
              <option value="all">Todas</option>
              <option value="high">Alta (8-10)</option>
              <option value="medium">Média (6-7)</option>
              <option value="low">Baixa (1-5)</option>
            </select>
          </div>
        </div>
        
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className={`product-visual effect-${product.effect}`}>
                <div className="intensity-meter">
                  <div 
                    className="intensity-level" 
                    style={{ width: `${product.intensity * 10}%` }}
                  ></div>
                  <span>Intensidade: {product.intensity}/10</span>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <div className="tags">
                    {product.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="product-footer">
                    <span className="price">R${product.price.toFixed(2)}</span>
                    <button 
                      className="add-to-cart"
                      onClick={() => addToCart(product)}
                    >
                      + 🛸
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="how-it-works">
        <h2>Como Transformar seus Objetos</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Escolha sua Sombra</h3>
            <p>Selecione entre nossa coleção de sombras cósmicas</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Aplique no Objeto</h3>
            <p>Use nosso app para projetar a sombra em qualquer objeto</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Personalize</h3>
            <p>Ajuste intensidade, cor e movimento da sombra</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Transforme sua Realidade</h3>
            <p>Reviva objetos comuns com sombras extraordinárias</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Dark Spectrum</h3>
            <p>Sombras que iluminam sua imaginação</p>
            <div className="social-links">
              <a href="#">📸</a>
              <a href="#">👾</a>
              <a href="#">🌀</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Explorar</h4>
            <a href="#">Coleções Cósmicas</a>
            <a href="#">Sombras Limitadas</a>
            <a href="#">Novas Chegadas</a>
            <a href="#">Edições Especiais</a>
          </div>
          
          <div className="footer-links">
            <h4>Suporte</h4>
            <a href="#">Projeção de Sombras</a>
            <a href="#">Personalização</a>
            <a href="#">FAQ Interdimensional</a>
            <a href="#">Contato Alienígena</a>
          </div>
          
          <div className="footer-newsletter">
            <h4>Junte-se à nossa galáxia</h4>
            <p>Receba atualizações sobre novas sombras</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Seu email estelar" />
              <button>Inscrever-se 🌌</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dark Spectrum - Todos os universos reservados</p>
          <div className="legal-links">
            <a href="#">Termos da Realidade</a>
            <a href="#">Política de Dimensões</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;