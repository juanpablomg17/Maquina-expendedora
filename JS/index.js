var change = 0;
var totalToPay = 0;
var messagePostPay = "";
var products = [["Coca cola",4000], ["Corona",5000], ["Jugo Hit",2500], ["Pepsi",4000], ["Soda",3500], ["Agua",2000]];


/* productos: 

coca cola = 4000 ----> A1
corona = 5000 -------> A2
big cola  = 2500 -----> A3 
pepsi = 4000 -------->  B1
Soda = 3500 -------> B2
agua = 2000  --------> B3 */

function init() {
  const coin_500 = 500;
  const coin_1000 = 1000;
  const coin_2000 = 2000;
  const coin_5000 = 5000;

  $("body").on("click", "#coin_500", function () {
    totalToPay += coin_500;
    $("#show-info__message").text(totalToPay);
  });

  $("body").on("click", "#coin_1000", function () {
    totalToPay += coin_1000;
    $("#show-info__message").text(totalToPay);
  });

  $("body").on("click", "#coin_2000", function () {
    totalToPay += coin_2000;
    $("#show-info__message").text(totalToPay);
  });

  $("body").on("click", "#coin_5000", function () {
    totalToPay += coin_5000;
    $("#show-info__message").text(totalToPay);
  });
}




function cancelShop() {
  if (totalToPay > 0) {
    messagePostPay =
      "Transacción cancelada. $" + totalToPay + " han sido devueltos";
    $("#cancel-info__message").text(messagePostPay);

    setTimeout(() => {
      $("#cancel-info__message").text(
        "Insertar tu dinero y selecciona un refresco"
      );
    }, 4000);
  }

  $("#show-info__message").text("0");
  totalToPay = 0;
  change =0;
}




function buySoda(soda) {
 
  let totalToPaytext = $("#show-info__message").text();
  totalToPay = parseInt(totalToPaytext);

  if (totalToPay >0){
    console.log("El valor total es: "+totalToPay);

    change = 0;
    /* $("#cancel-info__message").text(messagePostPay); */
    let sodaSelect = products[soda]
    let sodaName = sodaSelect[0]
    let sodaPrice = sodaSelect[1];

    change = calculateChange(sodaPrice, totalToPay);

  if (change < 0){
      $("#cancel-info__message").text("Ups, aún te falta dinero para adquirir este producto"+ "$"+totalToPay+" han sido devueltos");
      totalToPay =0;
      change =0;
      $("#show-info__message").text("");

      setTimeout(() => {
        $("#cancel-info__message").text(
          "Insertar tu dinero y selecciona un refresco"
        );
      }, 4000);
      
  }
  else if (change >= 0){
      $("#cancel-info__message").text("¡Genial! disfruta tu "+sodaName+ ", $"+change+" han sido devueltos");
      $("#show-info__message").text("0");
      totalToPay =0;
      change =0;

      setTimeout(() => {
        $("#cancel-info__message").text(
          "Insertar tu dinero y selecciona un refresco"
        );
      }, 4000);

      
  }


  } else{
    $("#cancel-info__message").text("No tienes suficiente dinero para realizar esta compra");

    setTimeout(() => {
      $("#cancel-info__message").text(
        "Insertar tu dinero y selecciona un refresco"
      );
    }, 4000);

  }
 

  
}


function calculateChange(price, total){
  try {
    var tempChange =0;
    totalToPay = total;
    console.log(totalToPay);
  if (totalToPay > 0){
    return (tempChange = (totalToPay - price));
  } 
  
  return tempChange;
  } catch (error) {
    console.error("Error"+error)
  }
  
}