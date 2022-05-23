class Catalogo {
    constructor(id, tipo, nombre, ingredientes, img, precio, cantidad) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.img = img;
        this.precio = precio;
        this.cantidad = cantidad;
    }

}

fetch("empanadas.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((catalogojson) => {
            let cargarfetch = new Catalogo(catalogojson.id, catalogojson.tipo, catalogojson.nombre, catalogojson.ingredientes, catalogojson.img, catalogojson.precio, catalogojson.cantidad)
            productosCatalogo.push(cargarfetch);
            enlistarProductos();
            accionesBotones();
        });
    })
    .catch(function (error) {
        console.log(error);
    })

function enlistarProductos() {
    divEmpanadas.innerHTML = ``;
    divPostres.innerHTML = ``;
    divSalsas.innerHTML = ``;
    for (const elementos of productosCatalogo) {
        let verCatalogo = document.createElement("div");
        verCatalogo.innerHTML = `<div class="card">
                                <div class="card-body">
                                <img src="images/empanadas/${elementos.img}" class="card-img-top my-1" alt="${elementos.nombre}">
                                <p class="card-title">${elementos.nombre}</p>
                                <p class="card-text d-none">${elementos.ingredientes}</p>
                                <p class="card-text">$ ${elementos.precio}</p>
                                <div class="row">                               
                                <button class="btnAgregar col btn btn-primary" value="${elementos.id}">Agregar</button>
                                </div>
                                </div>
                                </div>`;
        let tipoProducto = elementos.tipo;

        if (tipoProducto === "empanadas") {
            divEmpanadas.append(verCatalogo);
        } else if (tipoProducto === "postres") {
            divPostres.append(verCatalogo);
        } else if (tipoProducto === "salsas") {
            divSalsas.append(verCatalogo);
        }
        verCatalogo.classList.add("col", "altura");
    }
}

function accionesBotones() {
    for (const btn of botonagregar) {
        btn.addEventListener("click", function () {
            idproducto = btn.value;
            mostrarProducto(idproducto);
        });
    }
}

function eliminarbotones() {
    for (const eliminar of eliminarCarrito) {
        eliminar.addEventListener("click", function () {
        idproducto = eliminar.value;
        eliminarProducto(idproducto);
    });
    }
}

function sumarbotones() {
    for (const sumar of agregarCantidad) {
        sumar.addEventListener("click", function () {
        idproducto = sumar.value;
        sumarproducto(idproducto);
    });
    }
}

function restarbotones() {
    for (const restar of restarCantidad) {
        restar.addEventListener("click", function () {
        idproducto = restar.value;
        restarproducto(idproducto);        
    });
    }
}


function mostrarProducto(idproducto) {
    const agregarCarrito = productosCatalogo.find((item) => item.id === idproducto);
    Swal.fire({
        title: agregarCarrito.nombre,
        html: "Ingredientes: " + agregarCarrito.ingredientes + "</br> <span class='my-3'>Seleccionar Cantidad:</span> <input id='cantidad' type='number' name='agregar' value='1'>",
        imageUrl: "images/empanadas/" + agregarCarrito.img,
        confirmButtonText: 'Agregar Empanadas'
    }).then((result) => {
        let existe;
        if (result.isConfirmed) {
            let cantidadProducto = document.getElementById("cantidad").value;
            existe = carritoPedido.find((item) => item.id === idproducto);          
            if(cantidadProducto <= 0) {
                Swal.fire(
                'No se Agrego al Carrito',
                'La cantidad no puede estar vacia ni ser un número negativo',
                'warning'
                )
            } else if(existe != null) {
                Swal.fire(
                    'El producto ya esta en el carrito',
                    'Podes sumar la cantidad desde el listado del carrito, haciendo clic en el boton "Ver Listado"',
                    'warning'
                )
            } else {
                agregarCarrito['cantidad'] = cantidadProducto;
            carritoPedido.push(agregarCarrito);
            enlistarCarrito();
            console.log(carritoPedido);            
            Swal.fire(
                'Agregaste Al carrito',
                'Agregaste correctamente ' + agregarCarrito.cantidad + ' ' + agregarCarrito.nombre,
                'success'
            )
            }
        }
    })
}


function redondear(num) {
    let m = Number((Math.abs(num) * 100).toPrecision(15));
    carritoRedondeado = Math.round(m) / 100 * Math.sign(num);
}


function enlistarCarrito() { 
   listadoCarrito.innerHTML = ` `; 
   
   
   for (const elementos of carritoPedido) {
        let verListado = document.createElement("tr");
        cantidadCarrito = parseFloat(elementos.cantidad);       
        let carrito = parseFloat(elementos.precio * cantidadCarrito);
        redondear(carrito);      
        
        verListado.innerHTML = `<td><button class="agregarCantidad btn btn-danger btn-sm mx-2" value="${elementos.id}">+</button>${cantidadCarrito} <button class="restarCantidad btn btn-success btn-sm mx-2" value="${elementos.id}">-</button></td><td> ${elementos.nombre} </td><td> $ ${elementos.precio}</td><td> $ ${carritoRedondeado} <button class="eliminarDelCarrito btn btn-danger btn-sm mx-2" value="${elementos.id}">x</button></td>`;
        listadoCarrito.append(verListado);
        localStorage.setItem("CarritoEmpanadas", JSON.stringify(carritoPedido));     
    } 
   
  
    totalcantidadcarrito += parseFloat(cantidadCarrito);
    
    
    cantidadPrevia.innerHTML = ``;
    verCantidadPrevia = document.createElement("span");
    verCantidadPrevia.innerHTML = `(${totalcantidadcarrito })`;
    cantidadPrevia.append(verCantidadPrevia);
    
    totalcarrito += parseFloat(carritoRedondeado); 

    totalCarritoTexto.innerHTML = ``;
    verTotal = document.createElement("div");
    verTotal.innerHTML = `Total $: ${totalcarrito}`;
    totalCarritoTexto.append(verTotal);
    verTotal.classList.add("col"); 
    
    sumarbotones();
    restarbotones();
    eliminarbotones();     

};


function actualizarPrecioFinal() {
    verCantidadPrevia.innerHTML = ``;    
    carritoPedido.forEach((item) => {
       enlistarCarrito();
    });    
    verTotal.innerText = "Total $: " + carritoPedido.reduce(
        (totalcant, item) => totalcant + item.precio * item.cantidad,
        0);
    verCantidadPrevia.innerHTML = carritoPedido.reduce(
         (totalcant, item) => totalcant + item.cantidad,
         0
     );
}

function eliminarProducto(idproducto) {
    let productoEliminado = carritoPedido.find((item) => item.id == idproducto);
    let indiceDeProducto = carritoPedido.indexOf(productoEliminado); 
    carritoPedido.splice(indiceDeProducto, 1); 
    verTotal.innerHTML = ` `;  
    actualizarPrecioFinal();   

}

function sumarproducto(idsumarproducto) {    
    let productoSumado = carritoPedido.find((item) => item.id == idsumarproducto);
    productoSumado.cantidad++;
    actualizarPrecioFinal();
}

function restarproducto(idsrestarproducto) { 
    let idmodificar = idsrestarproducto;
    let productoRestado = carritoPedido.find((item) => item.id == idmodificar);
    let restarproductocarrito = productoRestado.cantidad--;
     if (restarproductocarrito === 1) {
         eliminarProducto(idmodificar);
         console.log(idmodificar);
     }    
     actualizarPrecioFinal();
    
}


botonVerDetalle.onclick = () => {
    verDetalle.classList.remove('d-none');
    verDetalle.classList.add('d-block');
    verDetalleSimplificado.classList.remove('d-block');
    verDetalleSimplificado.classList.add('d-none');
    catalogoColumna.classList.add('catalogo-contraido');
    carritoColumna.classList.remove('catalogo-expandido');
    carritoColumna.classList.add('carrito-expandido');
    carritoColumna.classList.remove('carrito-contraido');
    divEmpanadas.classList.remove('row-cols-md-6');
    divEmpanadas.classList.add('row-cols-md-4');
    divPostres.classList.remove('row-cols-md-6');
    divPostres.classList.add('row-cols-md-4');
    divSalsas.classList.remove('row-cols-md-6');
    divSalsas.classList.add('row-cols-md-4');
    contenedorCheck.classList.remove('container');
    contenedorCheck.classList.add('container-fluid');   
    
};

ocultarDetalle.onclick = () => {
    verDetalle.classList.remove('d-block');
    verDetalle.classList.add('d-none');
    verDetalleSimplificado.classList.remove('d-none');
    verDetalleSimplificado.classList.add('d-block');
    catalogoColumna.classList.remove('catalogo-contraido');
    carritoColumna.classList.add('catalogo-expandido');
    carritoColumna.classList.remove('carrito-expandido');
    carritoColumna.classList.add('carrito-contraido');
    divEmpanadas.classList.add('row-cols-md-6');
    divEmpanadas.classList.remove('row-cols-md-4');
    divPostres.classList.add('row-cols-md-6');
    divPostres.classList.remove('row-cols-md-4');
    divSalsas.classList.add('row-cols-md-6');
    divSalsas.classList.remove('row-cols-md-4');
    contenedorCheck.classList.add('container');
    contenedorCheck.classList.remove('container-fluid');
};



