const productosCatalogo = [];

let carritoPedido = [];

const divEmpanadas = document.getElementById("catalogoEmpanadas");
const divPostres = document.getElementById("catalogoPostres");
const divSalsas = document.getElementById("catalogoSalsas");
const listadoCarrito = document.getElementById("listadoCarrito");
const cantidadPrevia = document.getElementById("cantidadPrevia");
const totalCarritoTexto = document.getElementById("totalCarrito");
const verDetalle = document.getElementById("detalleCarrito");
const verDetalleSimplificado = document.getElementById("detalleSimplificado");
const botonagregar = document.getElementsByClassName("btnAgregar");
const botonVerDetalle = document.getElementById("verDetalle");
const ocultarDetalle = document.getElementById("ocultarDetalle");

const catalogoColumna = document.getElementById("catalogoColumna");
const carritoColumna = document.getElementById("carritoColumna");

const contenedorCheck = document.getElementById("contenedorCheck");

const eliminarCarrito = document.getElementsByClassName("eliminarDelCarrito");

const agregarCantidad  = document.getElementsByClassName("agregarCantidad");
const restarCantidad = document.getElementsByClassName("restarCantidad");

let idproducto = "";

let totalcarrito = 0;
let carritoRedondeado = 0;
let cantidadCarrito = 0;

let totalcantidadcarrito = 0;

let verTotal;
let verCantidadPrevia;
