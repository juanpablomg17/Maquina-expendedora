// transiciones permitidas, para pintar la tablita de transiciones
var transiciones = {};

// alfabeto permitido
var alfabeto = [500,1000,2000,5000];

// puntero que controla los movimientos
var puntero = 0;

// array para controlar los estados permitidos
var estados = [];

// controlar conexiones permitidas 
var conexiones = [];

var nodosVIS;

$(".pago").prop('disabled', true);
$("#retirar").prop('disabled', true);


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
function generarTablaTransiciones(producto){
    puntero = 0;
    $("#tabla_transiciones > tbody").empty();
    $("#d-price-product").text("$"+producto);
    $(".disable").prop('disabled', true);
    $(".pago").prop('disabled', false);


    var filasTabla  = [];

    //definir los estados y asociarlos con las transiciones
    for(i = 0; i<=producto; i+=500){
        var valoresCelda = [];
        valoresCelda.push(i);
        for(j = 0; j< alfabeto.length;j++){
            if((i+alfabeto[j]) <= producto){
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



function mostrarAutomata(tableTransition){
    
    estados = [];
    conexiones = [];
    nodosVIS;

    // llenar los estados del autómata, teniendo en cuenta la tabla
    for (let i = 0; i < tableTransition.length; i++) {
    
        // estado inicial
        if(i == 0){
            estados.push({
                id: tableTransition[i].l1, 
                label: ""+tableTransition[i].l1, 
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
        }else if(i == (tableTransition.length - 1)){
            estados.push({
                id: tableTransition[i].l1, 
                label: ""+tableTransition[i].l1, 
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
                id: tableTransition[i].l1, 
                label: ""+tableTransition[i].l1, 
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
    for (let i = 0; i < tableTransition.length; i++) {

        
        if(tableTransition[i].l2 != "-"){
            conexiones.push({
                from: tableTransition[i].l1, to: tableTransition[i].l2, label: ""+(tableTransition[i].l2 - tableTransition[i].l1)
            });
        }
        
        if(tableTransition[i].l3 != "-"){
            conexiones.push({
                from: tableTransition[i].l1, to: tableTransition[i].l3, label: ""+(tableTransition[i].l3 - tableTransition[i].l1)
            });
        }
        
        if(tableTransition[i].l4 != "-"){
            conexiones.push({
                from: tableTransition[i].l1, to: tableTransition[i].l4,label: ""+(tableTransition[i].l4 - tableTransition[i].l1)
            });
        }
        if(tableTransition[i].l5 != "-"){
            conexiones.push({
                from: tableTransition[i].l1, to: tableTransition[i].l5,label: ""+(tableTransition[i].l5 - tableTransition[i].l1)
            });
        }
    }

    
    var options = {
        physics: false,
        autoResize: true,
        height: '100%',
        width: '100%',
        nodosVIS:{
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
            arfilasTabla: "to",
            font: { size: 15, color:"black", face: "sans",},
        },
        interaction: {hover:false}
    };

    // nodos creados para la librería graficadora
    nodosVIS = new vis.DataSet(estados);
    
    
    var container_automata = document.getElementById('container_automata');
    
    
    var data = {
        nodosVIS: nodosVIS,
        edges: conexiones
    };
    
    var automata = new vis.Network(container_automata, data, options);

    
    recorrerEstados(0);
}


function recorrerEstados(estado) {
    //VARIABLE DEL LENGUAJE INGRESADO
    //VARIABLE QUE ME CARGA LOS ESTADO PERMITIDOS POR CADA LENGUAJE
    let estadosValidos = [];

    if(estado == 0){
        nodosVIS.update([{ id: estado, color: { background: "#009BFF", border: "#0061FF" } }]);
    }

    if(estado == 500){ 
        for(i = 0; i< transiciones.length;i++){
            if(transiciones[i].l2 != "-")
            estadosValidos.push(transiciones[i].l2); 
        }
        console.log(estadosValidos);
        validateTransition(id,estadosValidos);
    }
    if(estado == 1000){
        for(i = 0; i< transiciones.length;i++){
            if(transiciones[i].l3 != "-")
            estadosValidos.push(transiciones[i].l3); 
        }
        validateTransition(id,estadosValidos);
    }
    if(estado == 2000){
        for(i = 0; i< transiciones.length;i++){
            if(transiciones[i].l4 != "-")
            estadosValidos.push(transiciones[i].l4); 
        }
        validateTransition(id,estadosValidos);
    }
    if(estado == 5000){
        for(i = 0; i< transiciones.length;i++){
            if(transiciones[i].l5 != "-")
            estadosValidos.push(transiciones[i].l5); 
        }
        validateTransition(estado,estadosValidos);
    }
}


//validar transiciones dependiendo el lenguaje ingresado
function validateTransition(estado,estadosValidos){
    
    puntero += estado;

    //VALIDO QUE EL DINERO INGRESADO POR EL USUARIO ES UN VALIDO DENTRO DE LA COLUMNA DE UN LENGUAJE

    // code para validar que el estado sea válido

    if(estadosValidos.includes(puntero)){ 
        nodosVIS.update([
             { id: puntero, color: { background: "#0088CC", border: "#0061FF" }}]);
        if((puntero - estado) == 0){
            nodosVIS.update([{ id: (puntero - estado), color: { background: "#7AC23A", border: "#7AC23A"} }]);
        }else{
            nodosVIS.update([{ id: (puntero - estado), color: { background: "#7AC23A", border: "#7AC23A" } }]);
        }
        $("#d-acumulado").text("$"+puntero);

        // validar si el puntero está en el útimo estado
        if((estadosValidos.length - 1) == estadosValidos.indexOf(puntero)){
            alert('Pago completado');

            $("#retirar").prop('disabled', false);
            /* $(".pago").prop('disabled', true); */
            
        }   
    }else{
        puntero = puntero - id;
    } 
}


function cancelarBebida(){
    $(".disable").prop('disabled', false);
    $("#d-price-product").text("$0");
    $("#d-acumulado").text("$0");
    $("#table > tbody").empty();
    $(".pago").prop('disabled', true);
    $("#visualization").empty();
    $("#retirar").prop('disabled', true);
    toastr.error("Pago de producto cancelado");
}

function retirar(){
    
    $("#coffee-out").animate({
        left: '0px',
        display: 'block',
        right: '0px',
        opacity: '0.9',
        height: '170px',
        width: '110px'
    },700);
    toastr.success("Sirviendo Café, Espere...");
    setTimeout(()=>{
        
        $('#coffee-out').animate({
            opacity: 0,
            width: 180,
            height: 250,
            left: '100px',
            display: 'none'
        }, 1500);  
    },3000);
    setTimeout(() => {
        $("#coffee-out").animate({
            height: '150px',
            width: '90px'
        },100);
        $(".disable").prop('disabled', false);
        $("#d-price-product").text("$0");
        $("#d-acumulado").text("$0");
        $("#leyenda").text('Precio producto')
        $("#table > tbody").empty();
        $(".pago").prop('disabled', true);
        $("#visualization").empty();
        $("#retirar").prop('disabled', true);
        toastr.success("Maquina disponible nuevamente");
    }, 5000);
    
}