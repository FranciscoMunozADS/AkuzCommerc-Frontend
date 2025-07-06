import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


// Acá generaré un arreglo con datos de prueba automaticamente
const ProductManager = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      sku: 'PRD001',
      descripcion: 'Laptop Gaming',
      stock: 15,
      precioVenta: 899.99,
      descripcionDetallada: 'Laptop gaming de alta gama con procesador Intel i7, 16GB RAM, SSD 512GB y tarjeta gráfica RTX 3060',
      fotografia: 'https://via.placeholder.com/100x100?text=Laptop'
    },
    {
      id: 2,
      sku: 'PRD002',
      descripcion: 'Mouse Inalámbrico',
      stock: 25,
      precioVenta: 29.99,
      descripcionDetallada: 'Mouse inalámbrico ergonómico con sensor óptico de alta precisión, batería de larga duración',
      fotografia: 'https://via.placeholder.com/100x100?text=Mouse'
    }
  ]);

  const [categories, setCategories] = useState([
    {
      nombre: 'Electronica'
    },
    {
      nombre: 'Ropa'
    }
  ]); // Fin de la Arrow Function con datos de prueba



  // Controla si se muestra el modal y el otro hoock es para ver si se crea o mofifica
  const [showModal, setShowModal] = useState(false); // Genera un estado para controlar la visibilidad del modal  
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit' Genera un estado para controlar el modo del modal 


  // Hooks para mostrar modal de categorias y ver si se crea o modifica.-
  const [showModalCategory, setShowModalCategory] = useState(false); // Genera un estado para controlar la visibilidad del modal categoria
  const [modalModeCategory, setModalModeCategory] = useState('create'); // 'create' or 'edit' Genera un estado para controlar el modo del modal categoria
  
  // Genera un estado para controlar el producto actual un useState limpio
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    sku: '',
    descripcion: '',
    stock: 0,
    precioVenta: 0,
    descripcionDetallada: '',
    fotografia: ''
  });
  // Fin del Hook que limpia formularios


  // Genera un estado para controlar la categoria actual un useState limpio


const [currentProductCategory, setCurrentProductCategory] = useState({
    nombre : ''
});
// Fin del Hook que limpia formularios



  const [showDeleteModal, setShowDeleteModal] = useState(false); // Este tiene dos datos o es modal (true) o no (false)
  const [productToDelete, setProductToDelete] = useState(null); // Este tiene dos datos o es el producto a eliminar o es null


  // Funcion que muestra en Modo MODAL para crear un nuevo producto
  const handleCreate = () => {
    setModalMode('create'); // Llama al Hook setModalMode para cambiar el modo del modal a 'create'
    // Llama al Hook setCurrentProduct para limpiar el formulario
    setCurrentProduct({
      id: '',
      sku: '',
      descripcion: '',
      stock: 0,
      precioVenta: 0,
      descripcionDetallada: '',
      fotografia: ''
    });
    setShowModal(true);
  }; // Fin del hook que setea producto 

// Funcion que muestra en Modo MODAL para crear una nueva categoria
const handleCreateCategory = () => {
  setModalModeCategory ('create'); // Llama al Hook setModalMode para cambiar el modo del modal a 'create'
  // Llama al Hook setCurrentProduct para limpiar el formulario
  setCurrentProductCategory({
    nombre: ''
  });
  setShowModalCategory(true);
}; // Fin del hook que setea categoria


  // Funcion que maneja la edición del producto.
  const handleEdit = (product) => {
    setModalMode('edit'); // Llama al Hook setModalMode para cambiar el modo del modal a 'edit'
    setCurrentProduct({ ...product }); // Llama al hook que agrega un producto
    setShowModal(true); // muestra el modal 
  };
  // fin funcion que maneja la edición del producto desde el MODAL 




// Funcion que activa para Eliminar el producto
  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };
// Fin del hook que activa para Eliminar el producto





// Funcion que confirma la eliminacion del producto
  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };
// Fin del hook que confirma la eliminacion del producto




// Funcion que maneja el envio del formulario que crea los productos
  const handleSubmit = () => {
    if (!currentProduct.sku || !currentProduct.descripcion) {
      alert('SKU y Descripción son campos obligatorios');
      return;
    }
    
    if (modalMode === 'create') {
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts([...products, { ...currentProduct, id: newId }]);
    } else {
      setProducts(products.map(p => 
        p.id === currentProduct.id ? currentProduct : p
      ));
    }
    
    setShowModal(false);
  };
// Fin del hook que maneja el envio del formularion de crear productos

// Funcion que maneja el envio del formulario que crea la categoria
const handleSubmitcategorias = () => {
  if (!currentProductCategory.nombre) {
    alert('Nombre Categoria no puede ser Blanco');
    return;
  }
  
  if (modalModeCategory === 'create') {    
    setCategories([...categories, { ...currentProductCategory }]);
  
   setShowModalCategory(false); 
}};

// Fin del hook que maneja el envio del formularion de crear categorias




// Funcion que maneja el cambio de los inputs de Productos
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setCurrentProduct({...currentProductCategory, [name]: type === 'number' ? parseFloat(value) || 0 : value });
  };


  // Maneja el Imnput de Categorias
  const handleInputChangeCategory= (e) => {  
    const { name, value, type } = e.target; 
    setCurrentProductCategory({...currentProductCategory});
  };


  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
  
            <h2 className="mb-0">Mantiene Productos y Categorias</h2>

            
            {/* Boton Para Crear Producto */}
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleCreate}
            >
            <i className="bi bi-plus-circle me-2"></i>Crear Producto</button>


            <button 
              className="btn btn-primary btn-lg"
              onClick={handleCreateCategory}
            >
              <i className="bi bi-plus-circle me-2"></i>Crear Categoria</button>
          </div>

          <div className="card shadow">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>SKU</th>
                      <th>Foto</th>
                      <th>Descripción</th>
                      <th>Stock</th>
                      <th>Precio Venta</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="align-middle">
                          <span className="badge bg-secondary">{product.id}</span>
                        </td>
                        <td className="align-middle">
                          <strong>{product.sku}</strong>
                        </td>
                        <td className="align-middle">
                          <img 
                            src={product.fotografia} 
                            alt={product.descripcion}
                            className="rounded"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        </td>
                        <td className="align-middle">
                          <div>
                            <strong>{product.descripcion}</strong>
                            <br />
                            <small className="text-muted">
                              {product.descripcionDetallada.substring(0, 60)}...
                            </small>
                          </div>
                        </td>
                        <td className="align-middle">
                          <span className={`badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                            {product.stock} unidades
                          </span>
                        </td>
                        <td className="align-middle">
                          <strong className="text-success">
                            {formatPrice(product.precioVenta)}
                          </strong>
                        </td>
                        <td className="align-middle">
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEdit(product)}
                              title="Modificar"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(product)}
                              title="Eliminar"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Formulario */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === 'create' ? 'Crear Nuevo Producto' : 'Modificar Producto'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="sku" className="form-label">SKU *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sku"
                      name="sku"
                      value={currentProduct.sku}
                      onChange={handleInputChange}
                      placeholder="Ej: PRD001"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      value={currentProduct.descripcion}
                      onChange={handleInputChange}
                      placeholder="Nombre del producto"
                    />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="stock" className="form-label">Stock *</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      name="stock"
                      value={currentProduct.stock}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="precioVenta" className="form-label">Precio Venta *</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        id="precioVenta"
                        name="precioVenta"
                        value={currentProduct.precioVenta}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="fotografia" className="form-label">URL Fotografía</label>
                  <input
                    type="url"
                    className="form-control"
                    id="fotografia"
                    name="fotografia"
                    value={currentProduct.fotografia}
                    onChange={handleInputChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {currentProduct.fotografia && (
                    <div className="mt-2">
                      <img 
                        src={currentProduct.fotografia} 
                        alt="Vista previa"
                        className="img-thumbnail"
                        style={{ maxWidth: '150px', maxHeight: '150px' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150x150?text=Error';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="descripcionDetallada" className="form-label">Descripción Detallada</label>
                  <textarea
                    className="form-control"
                    id="descripcionDetallada"
                    name="descripcionDetallada"
                    rows="4"
                    value={currentProduct.descripcionDetallada}
                    onChange={handleInputChange}
                    placeholder="Descripción completa del producto..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  {modalMode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


{/*En esta sección se activa el modal para crear una nueva categoria*/}

{showModalCategory && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalModeCategory === 'create' ? 'Crear Nueva Categoria' : 'Modificar Categoria'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModalCategory(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombrecate" className="form-label">Descripcion *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombrecate"
                      name="ncategoria"
                      value={currentProductCategory.nombre}
                      onChange={handleInputChangeCategory}
                      placeholder="Ej: Café Nacional"
                    />
                  </div>                  
                </div>                            
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModalCategory(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleSubmitcategorias}
                >
                  {modalModeCategory === 'create' ? 'Crear Categoria' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )} 
     
































      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar el producto?</p>
                {productToDelete && (
                  <div className="alert alert-warning">
                    <strong>SKU:</strong> {productToDelete.sku}<br />
                    <strong>Descripción:</strong> {productToDelete.descripcion}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bootstrap Icons CSS */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" 
      />
    </div>
  );
};

export default ProductManager;