$(document).ready(function(){
	
	var host= $("#host").val();	

	function ajaxError(url, action){
		console.log("Error to access "+url+" trying to: "+action);
		alert("Couldn't connect to Cart");
		event.preventDefault();
	}

//// ________INDEX.JSP_________/////

	$("#initForm").on("submit",function(){

		var web= $("#page").val();
		var user= $("#user").val();
		var webToken,userToken;
	
		//THIS GETS THE WEB TOKEN FROM SERVICE
		$.ajax({
			//token/{site-name} 
  			url:host+"token/"+web,
  			type: 'GET',
  			async: false,
			error: function(xhr, status, error) {
			  console.error(error);
			},
		    beforeSend: function () {
				$("#console").html("Procesando, espere por favor...");
			},
			success:  function (response) {
				webToken=response;
			}
		});


		//THIS GETS THE USER TOKEN FROM SERVICE
		$.ajax({
			//token/{site-token}/{user-id}
  			url:host+"token/"+webToken+"/"+user,
  			type: 'POST',
  			async: false,
			error: function(xhr, status, error) {
			  console.error(error);
			},
			beforeSend: function () {
				$("#console").html("Procesando, espere por favor...");
			},
			success:  function (response) {
				console.log(response);
				userToken=response;
			}
		});		

		//SAVE BOTH TOKENS
		$("#webToken").val(webToken);
		$("#userToken").val(userToken);

		//event.preventDefault();
	});

////////////////////////////////////////

//// ________PRODUCTS.JSP_________/////

var token = $("#userToken").val();


	$(".btn-action").on("click",function(){
		//THIS EVALUATES AND PERFORM EACH ACTION
		var pid= $(this).attr("id").split("-")[0];
		var action = $(this).attr("id").split("-")[1];
		var value,url,method;
                value=$("#input-"+pid).val();
		//DECIDES ACTION
		switch (action){
			case "add":
				//	cart/{cart-token}/{id-product}/{quantity}
				method="POST";
				url= "cart/"+token+"/"+pid+"/"+value;
				break;
			case "remove":
				//  cart/{cart-token}/{id-product}/{quantity}
				method="DELETE";
				url= "cart/"+token+"/"+pid+"/"+value;
				break;
			case "more":
				//  cart/{cart-token}/{id-product}
				method="POST";
				url= "cart/"+token+"/"+pid
				break;
			case "less":
				//  cart/{cart-token}/{id-product}/{quantity}
				method="DELETE";
				url= "cart/"+token+"/"+pid+"/"+1;
				break;
			case "delete":
				//	cart/{cart-token}/{id-product}
				method="DELETE";
				url= "cart/"+token+"/"+pid;
				break;
			case "set":
				//	cart/{cart-token}/{id-product}/set/{quantity}
				method="POST";
				url= "cart/"+token+"/"+pid+"/set/"+value;
				break;
			case "checkout":
				method="DELETE";
				url="cart/"+token;
				break;
		}

		//PERFORM ACTION
		$.ajax({
  			url:host+url,
  			type: method,
  			async:false,
  			dataType: 'json',
			error: function(xhr, status, error) {
			  console.error(error);
			},
			beforeSend: function () {
				console.log("Procesando, espere por favor...");
			},
			success:  function (response) {
				console.log("Operacion terminada...");
			}
		});
		refreshCart();
	});
	

	//REFRESH CART
	function refreshCart(){
		// cart/{cart-token}
		$.ajax({
  			url:host+"cart/"+token,
  			type: 'GET',
  			async:false,
  			dataType: 'json',
			error: function(xhr, status, error) {
			  $("#cart").html("Error al conectarse con el servicio");	
			  console.error(error);
			},
			beforeSend: function () {
				console.log("Procesando, espere por favor...");
			},

			success:  function (response) {
				$("#cart").html("");
				var quantities = response.products;
				var length = Object.keys(quantities).length;
				var total=0;

				$("#cart").append('<tr><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>');
				for (var i = 0; i < length; i++) {
					var id = Object.keys(quantities)[i];
					var quantity = quantities[id];

					var name= $("#prod-"+id).val();
					var value=$("#val-"+id).val();
					
					$("#input-"+id).val(quantity);
					$("#cart").append('<tr><td>'+name+"</td><td>x"+quantity+"</td><td>$"+(quantity*value)+'</td></tr>');
					total+=(quantity*value);
				}
				$("#cart").append('<tr class="success"><td><b>Total:</td><td></td><td>$'+total+'</b></td></tr>');
			}
		});
	};


});