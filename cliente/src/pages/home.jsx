import { Layout } from "../components/Layout";
import React, { useState, useEffect } from 'react';
import "../styles/Home.css"
import slide1 from "../assets/Utensilios-decorativos-cocina.jpg"
import slide2 from "../assets/papel-cera-abeja.jpg"
import slide3 from "../assets/decorativos.jpg"

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos del carrusel
  const slides = [
    {
      id: 0,
      image: slide1,
      alt: 'Slider 1',
      caption: 'Accesorios decorativos'
    },
    {
      id: 1,
      image: slide2,
      alt: 'Slider 2',
      caption: 'Productos para regalar'
    },
    {
      id: 2,
      image: slide3,
      alt: 'Slider 3',
      caption: 'Decorá tu hogar con Néctar de Sol'
    }
  ];

  // Datos de productos
  const products = [
    {
      id: 1,
      image: '../assets/velas.jpeg',
      alt: 'Velas',
      name: 'Velas Aromáticas',
      price: '$1000'
    },
    {
      id: 2,
      image: '../assets/velas2.jpeg',
      alt: 'Velas2',
      name: 'Centro de Mesa Aromático',
      price: '$2500'
    },
    {
      id: 3,
      image: '../assets/papel-cera-abeja.jpg',
      alt: 'Papel de Cera de Abeja',
      name: 'Papel de Cera de Abeja',
      price: '$500'
    },
    {
      id: 4,
      image: '../assets/jabones.png',
      alt: 'Jabones',
      name: 'Jabones Aromáticos',
      price: '$750'
    },
    {
      id: 5,
      image: '../assets/difusor.jpg',
      alt: 'Difusor',
      name: 'Difusor de aromas',
      price: '$1200'
    },
    {
      id: 6,
      image: '../assets/centro-mesa.jpg',
      alt: 'Centro-De-Mesa',
      name: 'Centro de mesa decorativo',
      price: '$2500'
    },
    {
      id: 7,
      image: '../assets/frascos-decorativos.jpg',
      alt: 'frascos-decorativos',
      name: 'Frascos Decorativos',
      price: '$2500'
    },
    {
      id: 8,
      image: '../assets/Utensilios-decorativos-cocina.jpg',
      alt: 'Utensilios-decorativos-cocina',
      name: 'Utensilios de Cocina',
      price: '$2500'
    }
  ];

  // Función para ir al slide siguiente
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Función para ir al slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Función para ir a un slide específico
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <main className="home-main">
        <div className="carousel slide" id="carouselExampleCaptions">
          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={index === currentSlide ? 'active' : ''}
                onClick={() => goToSlide(index)}
                aria-current={index === currentSlide ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-item d-item ${index === currentSlide ? 'active' : ''}`}
              >
                <img
                  src={slide.image}
                  className="d-block w-100 d-img"
                  alt={slide.alt}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{slide.caption}</h5>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de navegación */}
          <button
            className="carousel-control-prev"
            type="button"
            onClick={prevSlide}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            onClick={nextSlide}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Sección de Inicio */}
        <section id="inicio">
          <h1>Bienvenidos a Néctar de Sol</h1>
          <p>Un lugar para volverte a enamorar de tu hogar</p>
        </section>

        {/* Sección de Productos */}
        <section id="productos">
          <h2>Conoce nuestros Productos</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.alt} />
                <h3>{product.name}</h3>
                <p>Precio: {product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;