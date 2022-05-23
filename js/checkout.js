const carritoCheckout = JSON.parse(localStorage.getItem("CarritoEmpanadas"));
const enlistarCheckout = document.getElementById("enlistarCheckout");
const totalCarrito = document.getElementById("totalCarrito");

let botonEditar = document.getElementById("botonEditarCheck");
let botonwhatapps = document.getElementById("botonEnviarWhatapps");
 

let carrito = 0;
let cantidadCarrito = 0;
let totalcantidadcarrito= 0;
let totalCarritoCobrar = 0;

function enlistarProductosCheckout(){    
        enlistarCheckout.innerHTML = ``;         
    for (const checkout of carritoCheckout) {        
        let verCheckout = document.createElement("tr");
        cantidadCarrito = checkout.cantidad; 
        carrito = parseFloat(checkout.precio * cantidadCarrito);         
        verCheckout.innerHTML = `<td>${cantidadCarrito} </td><td> ${checkout.nombre} </td><td> $ ${checkout.precio}</td><td> $ ${carrito}</td>`;
        enlistarCheckout.append(verCheckout);  
        totalcantidadcarrito += parseFloat(cantidadCarrito);
        totalCarritoCobrar += parseFloat(carrito);
                          
    }  
    totalCarrito.innerHTML = ``; 
    let verTotal = document.createElement("div"); 
    verTotal.innerHTML = `${totalcantidadcarrito} productos | Total $: ${totalCarritoCobrar}`; 
    totalCarrito.append(verTotal);  
    verTotal.classList.add("col");

    

    
}

botonEditar.onclick = () => {
    let editar = true;
    localStorage.setItem("editarCarrito", JSON.stringify(carritoCheckout));
    localStorage.setItem("carritoEditado", JSON.stringify(editar));
    let vaciarJson = [];
    localStorage.setItem("CarritoEmpanadas", JSON.stringify(vaciarJson));
    location.href = 'index.html'; 
 };


 botonwhatapps.onclick = () => {
    const urlDesktop = 'https://web.whatsapp.com/';
    const telefono = '+5492804011235'; 
    
    for (const carritoMensaje of carritoCheckout) {   
    }


    let mensaje = 'send?phone=' + telefono + '&text=Hola escribo para realizar el siguiente pedido %0A Pedido 1:' + '';
    window.open(urlDesktop + mensaje, '_blank'); 

 };


enlistarProductosCheckout();
