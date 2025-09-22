import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/sobre-nosotros">Sobre Nosotros</Link>
    </nav>
  );
};
export default Navbar;