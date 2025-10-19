import Layout from "../components/Layout";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import "../styles/Home.css";
import slide1 from "../assets/Utensilios-decorativos-cocina.jpg";
import slide2 from "../assets/papel-cera-abeja.jpg";
import slide3 from "../assets/decorativos.jpg";
import { CarritoContext } from "../context/CarritoContext.jsx";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [mensajeAgregado, setMensajeAgregado] = useState(false); 
  const { agregarProducto } = useContext(CarritoContext); 

  const slides = [
    { id: 0, image: slide1, alt: 'Slider 1', caption: 'Accesorios decorativos' },
    { id: 1, image: slide2, alt: 'Slider 2', caption: 'Productos para regalar' },
    { id: 2, image: slide3, alt: 'Slider 3', caption: 'Decorá tu hogar con Néctar de Sol' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAgregar = (producto) => {
    agregarProducto(producto);
    setMensajeAgregado(true);
    setTimeout(() => setMensajeAgregado(false), 2500);
  };

  return (
    <main className="home-main">
      {/* Mensaje visual */}
      {mensajeAgregado && (
        <div className="mensaje-agregado">
          ¡Agregado al carrito! 🛍️
        </div>
      )}

      {/* Carrusel */}
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

        <button className="carousel-control-prev" type="button" onClick={prevSlide}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" onClick={nextSlide}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Sección de inicio */}
      <section id="inicio">
        <h1>Bienvenidos a Néctar de Sol</h1>
        <p>Un lugar para volverte a enamorar de tu hogar</p>
      </section>

      {/* Sección de productos */}
      <section id="productos">
        <h2>Conoce nuestros Productos</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  src={`http://localhost:3000/uploads/${product.imagen}`}
                  alt={product.nombre}
                />
                <h3>{product.nombre}</h3>
                <p>Precio: ${product.precio}</p>
                <button onClick={() => handleAgregar(product)}>
                  Agregar al carrito
                </button>
              </div>
            ))
          ) : (
            <p>Cargando productos...</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
