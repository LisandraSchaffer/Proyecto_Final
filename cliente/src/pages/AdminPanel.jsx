import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPanel = () => {
  const url = 'http://localhost:3000/api/productos';

  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('Añadir Producto');
  const [id, setId] = useState('');
  const [operation, setOperation] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      toast.error('No se pudieron cargar los productos', { transition: Bounce });
    }
  };

  const openModal = (op, prod = {}) => {
    setOperation(op);
    if (op === 1) {
      setTitle('Registrar Producto');
      setId('');
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('');
      setImage('');
    } else {
      setTitle('Editar Producto');
      setId(prod.id || '');
      setName(prod.nombre || '');
      setDescription(prod.descripcion || '');
      setPrice(prod.precio || '');
      setStock(prod.stock || '');
      setCategory(prod.categoria || '');
      setImage(prod.imagen_url || '');
    }
    setTimeout(() => document.getElementById('nombre').focus(), 500);
  };

  const validar = async (e) => {
    e.preventDefault();
    if (name.trim() === '') return toast.warn('Escribe el nombre del producto', { transition: Bounce });
    if (description.trim() === '') return toast.warn('Escribe la descripción del producto', { transition: Bounce });
    if (price.trim() === '') return toast.warn('Escribe el precio del producto', { transition: Bounce });
    if (stock.trim() === '') return toast.warn('Escribe el stock del producto', { transition: Bounce });
    if (category.trim() === '') return toast.warn('Escribe la categoría del producto', { transition: Bounce });
    if (image.trim() === '') return toast.warn('Te olvidaste la imagen del producto', { transition: Bounce });

    const parametros = {
      nombre: name,
      descripcion: description,
      precio: parseFloat(price),
      stock: parseInt(stock),
      categoria: category,
      imagen_url: image,
    };

    const metodo = operation === 1 ? 'post' : 'put';
    if (operation === 2) parametros.id = id;

    try {
      const token = localStorage.getItem('token');
      const respuesta = await axios({
        method: metodo,
        url: url,
        data: parametros,
        headers: { Authorization: `Bearer ${token}` },
      });

      let tipo = respuesta.data[0];
      let msj = respuesta.data[1];

      if (tipo === 'success') {
        toast.success(msj, { transition: Bounce });
        document.getElementById('btnCerrar').click();
        getProductos();
      } else {
        toast.error(msj, { transition: Bounce });
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      toast.error('Error al comunicarse con el servidor', { transition: Bounce });
    }
  };

  const deleteProduct = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar el producto "${name}"?`)) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${url}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        toast.success('Producto eliminado con éxito', { transition: Bounce });
        getProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        toast.error('Error al eliminar el producto', { transition: Bounce });
      }
    }
  };

  return (
    <div className='App'>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-4'>
            <div className='d-grid mx-auto'>
              <button
                className='btn btn-dark'
                data-bs-toggle='modal'
                data-bs-target='#modalProducts'
                onClick={() => openModal(1)}
              >
                <i className='fa-solid fa-circle-plus'></i> Añadir Producto
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.nombre}</td>
                    <td>${new Intl.NumberFormat('es-AR').format(product.precio)}</td>
                    <td>{product.stock}</td>
                    <td>{product.categoria}</td>
                    <td>{product.descripcion}</td>
                    <td>
                      {product.imagen_url ? (
                        <img
                          src={product.imagen_url}
                          alt={product.nombre}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      ) : (
                        'Sin imagen'
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => openModal(2, product)}
                        className='btn btn-warning btn-sm me-2'
                        data-bs-toggle='modal'
                        data-bs-target='#modalProducts'
                      >
                        <i className='fa-solid fa-edit'></i>
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id, product.nombre)}
                        className='btn btn-danger btn-sm'
                      >
                        <i className='fa-solid fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className='modal fade' id='modalProducts' aria-hidden='true' tabIndex='-1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <form onSubmit={validar}>
              <div className='modal-body'>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                  <input
                    type='text'
                    id='nombre'
                    className='form-control'
                    placeholder='Nombre'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-align-left'></i></span>
                  <input
                    type='text'
                    id='descripcion'
                    className='form-control'
                    placeholder='Descripción'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                  <input
                    type='number'
                    step='0.01'
                    id='precio'
                    className='form-control'
                    placeholder='Precio'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-box'></i></span>
                  <input
                    type='number'
                    id='stock'
                    className='form-control'
                    placeholder='Stock'
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-tag'></i></span>
                  <input
                    type='text'
                    id='categoria'
                    className='form-control'
                    placeholder='Categoría'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa-image'></i></span>
                  <input
                    type='url'
                    id='imagen'
                    className='form-control'
                    placeholder='URL de la imagen'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <div className='d-grid col-6 mx-auto'>
                  <button type='submit' id='btnGuardar' className='btn btn-success'>
                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                  </button>
                </div>
              </div>
            </form>
            <div className='modal-footer'>
              <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminPanel;