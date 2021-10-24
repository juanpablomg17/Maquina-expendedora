var change = 0;
var totalToPay = 0;
var messagePostPay = "";
var products = [["Coca cola",4000], ["Corona",5000], ["Big Cola",2500], ["Pepsi",3000], ["Aguila",3500], ["Agua",2000]];


/* productos: 

coca cola = 4000 ----> A1
corona = 5000 -------> A2
big cola  = 2500 -----> A3 
pepsi = 3000 -------->  B1
aguila = 3500 -------> B2
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





function getProducts() {
  try {
    let total_price = 0;

    if (totalToPay === 0) {
      setTimeout(() => {
        $("#cancel-info__message").text(
          "Ups aún no has ingresado nada, por favor inserta una moneda"
        );
      }, 6000);
    } else if (totalToPay > 0) {

        $("body").on("click", "#a1_code", function () {
            products.push({
                "name": "Coca Cola",
                "price": 4000,
            })
            total_price += 4000;            
          });

        $("body").on("click", "#a2_code", function () {
            products.push({
                "name": "Corona",
                "price": 5000,
            })
            total_price += 5000;            
          });   

        $("body").on("click", "#a3_code", function () {
            products.push({
                "name": "Big Cola",
                "price": 2500,
            })
            total_price += 2500;            
          });      

          $("body").on("click", "#b1_code", function () {
            products.push({
                "name": "Pepsi",
                "price": 3000,
            })
            total_price += 3000;            
          });
          
          

      
    }
  } catch (error) {
    console.error(error);
  }
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
    }, 6000);
  }

  $("#show-info__message").text("0");
  totalToPay = 0;
  change =0;
}


function calculateChange(price){
  try {
    var tempChange =0;

  if (totalToPay > 0){
    return (tempChange = (totalToPay - price));
  } 
  
  return tempChange;
  } catch (error) {
    console.error("Error"+error)
  }
  
}

function buySoda(soda) {
  change = 0;
  /* $("#cancel-info__message").text(messagePostPay); */
  let sodaSelect = products[soda]
  let sodaName = sodaSelect[0]
  let sodaPrice = sodaSelect[1];

  change = calculateChange(sodaPrice);

  if (change < 0){
      $("#cancel-info__message").text("Ups, aún te falta dinero para adquirir este producto"+ "$"+totalToPay+" han sido devueltos");
      totalToPay =0;
      change =0;
      $("#show-info__message").text("");

      setTimeout(() => {
        $("#cancel-info__message").text(
          "Insertar tu dinero y selecciona un refresco"
        );
      }, 6000);
      
  }
  else if (change > 0){
      $("#cancel-info__message").text("¡Genial! disfruta tu refresco"+ "$"+change+" han sido devueltos");
      $("#show-info__message").text("");
      totalToPay =0;
      change =0;

      setTimeout(() => {
        $("#cancel-info__message").text(
          "Insertar tu dinero y selecciona un refresco"
        );
      }, 6000);

      
  }
}
