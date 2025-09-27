import React from 'react';
import { Layout } from "../components/Layout";
import '../styles/AboutUs.css';

const AboutUs = () => {
  // Datos de las secciones "Sobre Nosotros"
  const aboutSections = [
    {
      id: 1,
      title: '¿Quiénes somos?',
      content: 'Somos una empresa familiar dedicada a crear productos artesanales que transforman cualquier espacio en un hogar acogedor. Con más de 5 años de experiencia, nos especializamos en velas aromáticas, jabones naturales y elementos decorativos únicos, elaborados con amor y materiales de la más alta calidad.'
    },
    {
      id: 2,
      title: '¿Qué ofrecemos?',
      content: 'Ofrecemos una amplia gama de productos artesanales para el hogar: velas aromáticas con fragancias únicas, jabones naturales elaborados con ingredientes orgánicos, difusores de ambientes, centros de mesa decorativos y utensilios de cocina con diseños exclusivos. Cada producto está pensado para crear atmosferas especiales y momentos únicos.'
    },
    {
      id: 3,
      title: '¿Dónde nos encontramos?',
      content: 'Nos ubicamos en el corazón de la ciudad, en nuestra tienda donde puedes ver, tocar y sentir cada uno de nuestros productos. También realizamos entregas a domicilio en toda la zona metropolitana y envíos a nivel nacional. Síguenos en nuestras redes sociales para conocer nuestras novedades y promociones especiales.'
    }
  ];

  return (
    <Layout>
      <section id="sobre-nosotros" className="nosotros">
        <h2>Sobre Nosotros</h2>
        {aboutSections.map((section) => (
          <div key={section.id} className="nosotros-item">
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default AboutUs;