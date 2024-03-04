// Esperamos a que el contenido del documento se cargue completamente.
document.addEventListener('DOMContentLoaded', function() {

    // Obtenemos los elementos del botón para agregar y eliminar productos, y la lista donde se muestran.
    const botonAgregar = document.getElementById('agregarProducto');
    const botonEliminar = document.getElementById('eliminarProductos');
    const listaProductos = document.getElementById('listaProductos');
  
    // Recuperamos el contador de productos del almacenamiento local si existe, si no, empieza en 0.
    let contadorProductos = JSON.parse(localStorage.getItem('contadorProductos')) || 0;
  
    // Establecemos un escuchador de eventos para el botón de agregar producto.
    botonAgregar.addEventListener('click', agregarProductoAlCarrito);
    // Establecemos un escuchador de eventos para el botón de eliminar todos los productos.
    botonEliminar.addEventListener('click', vaciarCarrito);
  
    // Define la función para agregar un producto al carrito.
    function agregarProductoAlCarrito() {
        
      contadorProductos++; // Aumentamos el contador para cada producto nuevo.
      // Creamos un objeto de producto con un ID único y nombre.
      const producto = { id: contadorProductos, nombre: 'Producto ' + contadorProductos };
      guardarEnLocalStorage(producto); // Guardamos el producto en el almacenamiento local.
      mostrarProductoEnLista(producto); // Mostramos el producto en la lista de la página.
      // Guardamos el contador actualizado en el almacenamiento local.
      localStorage.setItem('contadorProductos', JSON.stringify(contadorProductos));
    }
  
    // Define la función para guardar el producto en el almacenamiento local.
    function guardarEnLocalStorage(producto) {

      // Obtenemos la lista de productos del almacenamiento local o iniciamos una si no existe.
      let productos = JSON.parse(localStorage.getItem('carrito')) || [];
      productos.push(producto); // Añadimos el nuevo producto a la lista.
      // Guardamos la lista actualizada de productos en el almacenamiento local.
      localStorage.setItem('carrito', JSON.stringify(productos));
    }
  
    // Define la función para mostrar cada producto en la lista visible en la página.
    function mostrarProductoEnLista(producto) {

      // Creamos un nuevo elemento de lista <li>.
      const elementoLista = document.createElement('li');
      elementoLista.textContent = producto.nombre; // Establecemos el nombre del producto como texto.
      listaProductos.appendChild(elementoLista); // Añadimos el elemento de lista a la lista de productos.
    }
  
    // Define la función para cargar los productos previamente guardados al recargar la página.
    function cargarProductosPrevios() {
      // Obtenemos la lista de productos del almacenamiento local o iniciamos una vacía si no hay.
      const productos = JSON.parse(localStorage.getItem('carrito')) || [];

      //Hacemos un loop para mostrar cada producto de la lista
      productos.forEach(producto => {
        mostrarProductoEnLista(producto); // Mostramos cada producto en la lista.
      });
    }
  
    // Define la función para vaciar el carrito de compras.
    function vaciarCarrito() {
      // Eliminamos el carrito y el contador del almacenamiento local.
      localStorage.removeItem('carrito');
      localStorage.removeItem('contadorProductos');
      contadorProductos = 0; // Reiniciamos el contador de productos.
  
      // Limpiamos la lista visual de productos en la página.
      listaProductos.innerHTML = '';
    }
  
    cargarProductosPrevios(); // Llamamos a la función para cargar productos cuando se recarga la página.
  });
  