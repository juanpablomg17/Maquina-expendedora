
// transiciones permitidas, para pintar la tablita de transiciones
var transiciones = {};

// alfabeto permitido
var alfabeto = [500,1000,2000,5000];

// Varaible que sirve para manipular los atributos del producto, pendiente validar bug
var producto = {
    id: '',
    nombre: '',
    precio: '',
    img: ''
};

// puntero que controla los movimientos
var puntero = 0;

// array para controlar los estados permitidos
var estados = [];

// controlar conexiones permitidas 
var conexiones = [];

var nodes;

$(".pago").prop('disabled', true);
$("#retirar").prop('disabled', true);
$("#btn_comprar").prop('disabled', true);


// seleccionar bebida
$(".pago").on('click', (e)=>{
    let productoVal = parseInt($(e.currentTarget).attr('val'));
    recorrerEstados(productoVal);
})

// retirar bebida
$("#retirar").on('click', (e)=>{
    retirar();
});


// crear tabla de transiciones, recibe como parámetro el producto como array
function generarTablaTransiciones(idProducto,valorProducto,nombreProducto,imgProducto){
    producto.id= idProducto;
    producto.nombre = nombreProducto;
    producto.precio = valorProducto;
    producto.img = imgProducto;

    console.log(producto);
    puntero = 0;
    $("#tabla_transiciones > tbody").empty();
    $("#container-data__price").text(valorProducto);
    $("#container-data__productName").text(nombreProducto);
    $(".code_products").prop('disabled', true);
    $(".pago").prop('disabled', false);
    $("#data-message__show").text("");


    var filasTabla  = [];

    //definir los estados y asociarlos con las transiciones
    for(i = 0; i<=valorProducto; i+=500){
        var valoresCelda = [];
        valoresCelda.push(i);
        for(j = 0; j< alfabeto.length;j++){
            if((i+alfabeto[j]) <= valorProducto){
                valoresCelda.push((i+alfabeto[j]));
            }else{
                valoresCelda.push("-");
            }
        }
        filasTabla.push({ 
            "l1"    : valoresCelda[0],
            "l2"  : valoresCelda[1],
            "l3"    : valoresCelda[2],
            "l4"    : valoresCelda[3],
            "l5"    : valoresCelda[4],
        });
    }
    //#ASIGNO LAS FILAS AL ARREGLO DE TRANSICIONES
    transiciones = filasTabla;

    //#LLENO LA TABLA CON LOS DATOS DE LAS TRANSCIONES
    for(i = 0; i< transiciones.length;i++){
        var tr = `<tr>
          <td class="text-center">`+transiciones[i].l1+`</td>
          <td class="text-center">`+transiciones[i].l2+`</td>
          <td class="text-center">`+transiciones[i].l3+`</td>
          <td class="text-center">`+transiciones[i].l4+`</td>
          <td class="text-center">`+transiciones[i].l5+`</td>
        </tr>`;
        $("#tabla-transiciones__body").append(tr);
    }
    mostrarAutomata(transiciones);
}



function mostrarAutomata(transiciones){
    
    estados = [];
    conexiones = [];
    nodes;


    // llenar los estados del autómata, teniendo en cuenta la tabla
    for (let i = 0; i < transiciones.length; i++) {
    
        // estado inicial
        if(i == 0){
            estados.push({
                id: transiciones[i].l1, 
                label: ""+transiciones[i].l1, 
                shape: "circle",
                color:{
                    background: "#00aaff",
                    border: "#00aaff", 
                    highlight: { background: "#00aaff", border: "#00aaff" },} ,
                size: 23, 
                font: {
                    size:23,
                    color: "#fff"
                },
            });

        // estado final
        }else if(i == (transiciones.length - 1)){
            estados.push({
                id: transiciones[i].l1, 
                label: ""+transiciones[i].l1, 
                shape: "circle",
                color:{
                    background: "#00244c",
                    border: "#00244c", 
                    highlight: { background: "#00244c", border: "#00244c" },} ,
                size: 23, 
                font: {
                    size:23,
                    color: "#fff"
                },
            });


        // estados del primero al final - 1 
        }else{
            estados.push({
                id: transiciones[i].l1, 
                label: ""+transiciones[i].l1, 
                shape: "circle",
                color:{
                    background: "#7AC23A",
                    border: "#7AC23A",
                    highlight: { background: "#7AC23A",border:"#7AC23A"}} ,
                size: 13,
                font: {
                    size:13,
                    color: "#fff"
                }
            });
        }
    }

    //relacionar las conexiones con los estados, y se validan que las transiciones sean válidas
    for (let i = 0; i < transiciones.length; i++) {

        
        if(transiciones[i].l2 != "-"){
            conexiones.push({
                from: transiciones[i].l1, to: transiciones[i].l2, label: ""+(transiciones[i].l2 - transiciones[i].l1)
            });
        }
        
        if(transiciones[i].l3 != "-"){
            conexiones.push({
                from: transiciones[i].l1, to: transiciones[i].l3, label: ""+(transiciones[i].l3 - transiciones[i].l1)
            });
        }
        
        if(transiciones[i].l4 != "-"){
            conexiones.push({
                from: transiciones[i].l1, to: transiciones[i].l4,label: ""+(transiciones[i].l4 - transiciones[i].l1)
            });
        }
        if(transiciones[i].l5 != "-"){
            conexiones.push({
                from: transiciones[i].l1, to: transiciones[i].l5,label: ""+(transiciones[i].l5 - transiciones[i].l1)
            });
        }
    }

    
    var options = {
        physics: false,
        autoResize: true,
        height: '100%',
        width: '100%',
        nodes:{
            borderWidth: 2,
            scaling: {
                min: 700,
                max: 1000,
            },
        },
        edges: {
            smooth: false,
            width: 1,
            length:100,
            color: {
                color: "black"
            },
            arrows: "to",
            font: { size: 15, color:"black", face: "sans",},
        },
        interaction: {hover:false}
    };

    // nodos creados para la librería graficadora
    nodes = new vis.DataSet(estados);
    
    
    var container_automata = document.getElementById('container-automata__visual');
    
    
    var data = {
        nodes: nodes,
        edges: conexiones
    };
    
    var network = new vis.Network(container_automata, data, options);

    
    recorrerEstados(0);
}


function recorrerEstados(estado) {
    //VARIABLE DEL LENGUAJE INGRESADO
    //VARIABLE QUE ME CARGA LOS ESTADO PERMITIDOS POR CADA LENGUAJE
    let estadosValidos = [];

    if(estado == 0){
        nodes.update([{ id: estado, color: { background: "#009BFF", border: "#0061FF" } }]);
    }

    if(estado == 500){ 
        for(i = 0; i< transiciones.length;i++){
            if(transiciones[i].l2 != "-")
            estadosValidos.push(transiciones[i].l2); 
        }
        console.log(estadosValidos);
        validarRecorrido(estado,estadosValidos);
    }
    if(estado == 1000){
        for(i = 0; i< transiciones.length;i++){
            if(transiciones[i].l3 != "-")
            estadosValidos.push(transiciones[i].l3); 
        }
        validarRecorrido(estado,estadosValidos);
    }
    if(estado == 2000){
        for(i = 0; i< transiciones.length;i++){
            if(transiciones[i].l4 != "-")
            estadosValidos.push(transiciones[i].l4); 
        }
        validarRecorrido(estado,estadosValidos);
    }
    if(estado == 5000){
        for(i = 0; i< transiciones.length;i++){
            if(transiciones[i].l5 != "-")
            estadosValidos.push(transiciones[i].l5); 
        }
        validarRecorrido(estado,estadosValidos);
    }
}


//validar transiciones dependiendo el lenguaje ingresado
function validarRecorrido(estado,estadosValidos){
    
    puntero += estado;

    //VALIDO QUE EL DINERO INGRESADO POR EL USUARIO ES UN VALIDO DENTRO DE LA COLUMNA DE UN LENGUAJE

    // code para validar que el estado sea válido

    if(estadosValidos.includes(puntero)){ 
        nodes.update([
             { id: puntero, color: { background: "#0088CC", border: "#0061FF" }}]);
        if((puntero - estado) == 0){
            nodes.update([{ id: (puntero - estado), color: { background: "#7AC23A", border: "#7AC23A"} }]);
        }else{
            nodes.update([{ id: (puntero - estado), color: { background: "#7AC23A", border: "#7AC23A" } }]);
        }
        $("#container-data__counter").text(puntero);

        // validar si el puntero está en el útimo estado
        if((estadosValidos.length - 1) == estadosValidos.indexOf(puntero)){
            $("#btn_comprar").prop('disabled', false);
            $("#data-message__show").text("Bebida lista, presiona en 'Comprar'");
            /* $(".pago").prop('disabled', true); */
            
        }   
    }else{
        puntero = puntero - estado;
        $("#data-message__show").css("color", "#FF0000");
        $("#data-message__show").text(`¡Dinero rechazado!,supera el precio del producto (`+producto.id+` `+producto.nombre+`)`);

        setTimeout(()=> {
            $("#data-message__show").css("color", "#fff");
            $("#data-message__show").text("");
        },5000);
        

        
    } 
}

function limpiarTabla(){
    $("#tabla_transiciones > tbody").empty();
    for(i = 0; i<5 ;i++){
        var tr = `<tr>
          <td class="text-center">...</td>
          <td class="text-center">...</td>
          <td class="text-center">...</td>
          <td class="text-center">...</td>
          <td class="text-center">...</td>
        </tr>`;
        $("#tabla-transiciones__body").append(tr);
    }
}

function limpiarAutomata(){
    $("#container-automata__visual").empty();
}

function cancelarBebida(){

    let cashIngresado =  parseInt($("#container-data__counter").text());
    $("#btn_comprar").prop('disabled', true);
    if (cashIngresado > 0){
        $("#data-message__show").text("$"+$("#container-data__counter").text()+ " fueron devueltos");
        setTimeout(()=> {
            $("#data-message__show").text("Elige un producto e introduce dinero");
        },3000)
        
    }else{

        $("#data-message__show").text("Transacción cancelada...");
        setTimeout(()=> {
            $("#data-message__show").text("Elige un producto e introduce dinero");    
        },3000)
        
    }
    
    $("#container-data__productName").text('Producto');

    $(".code_products").prop('disabled', false);
    $("#container-data__price").text("0");
    $("#container-data__counter").text("0");
    $("#message-show__img").empty();
    $(".pago").prop('disabled', true);
    limpiarTabla();
    limpiarAutomata();
    
    producto.id= '';
    producto.nombre = '';
    producto.precio = '';
    producto.img = '';
    



    
}

function comprarBebida() { 

    let img = `<img src="`+producto.img+`" alt="product-image" style="width: 50px; height: 50px;"/>`
    $("#container-data__productName").text('Producto');
    $(".code_products").prop('disabled', false);
    $("#container-data__price").text("0");
    $("#container-data__counter").text("0");
    limpiarTabla();
    limpiarAutomata();

    $("#data-message__show").text("Cargando "+producto.nombre+"...");
    
    setTimeout(()=> {
        $("#data-message__show").text("Listo para retirar");
        $("#message-show__img").append(img);
        
    },3000)


    setTimeout(()=> {
        $("#data-message__show").text("");
        $("#message-show__img").empty();
        
    },10000)



    
    

    
 }

