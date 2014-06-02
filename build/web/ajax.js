$(document).ready(function(){
	
	var host= $("#host").val();	

	function ajaxError(url, action){
		console.log("Error to access "+url+" trying to: "+action);
		alert("Couldn't connect to Cart");
		event.preventDefault();
	}

	function error404(url, action){
		console.log("Error 404 in "+url+" trying to: "+action)
		alert("Error 404");
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
  			dataType: 'jsonp', async: false,
  			statusCode: {
		    404: error404(host+"token/"+web,"Getting site's token")
			},
			error: ajaxError(host+"token/"+web,"Getting site's token"),
		    beforeSend: function () {
				$("#console").html("Procesando, espere por favor...");
			},
			success:  function (response) {
				console.log(response);
				webToken=$(response).text();
			}
		});


		//THIS GETS THE USER TOKEN FROM SERVICE
		$.ajax({
			//token/{site-token}/{user-id}
  			url:host+"token/"+webToken+"/"+user,
  			type: 'GET',
  			dataType: 'jsonp', async: false,
  			statusCode: {
		    404: error404(host+"token/"+webToken+"/"+user,"Getting user's token")
			},
			error: ajaxError(host+"token/"+webToken+"/"+user,"Getting user's token"),
			beforeSend: function () {
				$("#console").html("Procesando, espere por favor...");
			},
			success:  function (response) {
				userToken=$(response).text();
			}
		});		

		//SAVE BOTH TOKENS
		$("#webToken").val(webToken);
		$("#userToken").val(userToken);
	});

////////////////////////////////////////

//// ________PRODUCTS.JSP_________/////

var token = $("#userToken").val();

	$(".btn").on("click",function(){
		//THIS EVALUATES AND PERFORM EACH ACTION

		var pid= $(this).attr("id").split("-")[0];
		var action = $(this).attr("id").split("-")[1];
		var value,url,method,token;

		//DECIDES ACTION
		switch (action){
			case "add":
				//	cart/{cart-token}/{id-product}/{quantity}
				method="POST";
				value=$(this).parent().parent().find(".value").val();
				url= "cart/"+token+"/"+pid+"/"+value;
				break;
			case "remove":
				//  cart/{cart-token}/{id-product}/{quantity}
				method="DELELTE";
				url= "cart/"+token+"/"+pid+"/"+value;
				value=$(this).parent().parent().find(".value").val();
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
				value=$(this).parent().parent().find(".value").val();
				url= "cart/"+token+"/"+pid+"/set/"+value;
				break;
		}

		//PERFORM ACTION
		$.ajax({
  			url:host+url,
  			type: method,
  			dataType: 'jsonp',
  			statusCode: {
		    404: error404(host+url,"Performing action")
			},
			error: ajaxError(host+url,"Performing action"),
			beforeSend: function () {
				console.log("Procesando, espere por favor...");
			},
			success:  function (response) {
				console.log("Operacion terminada...");
			}
		});
		//refreshCart();
	});


	//REFRESH CART
	function refreshCart(){
		// cart/{cart-token}
		$.ajax({
  			url:host+"cart/"+token,
  			type: 'GET',
  			dataType: 'jsonp',
  			statusCode: {
		    404: error404(host+"cart/"+token,"Refreshing cart")
			},
			error: ajaxError(host+"cart/"+token,"Refreshing cart"),
			beforeSend: function () {
				console.log("Procesando, espere por favor...");
			},
			success:  function (response) {
				$("#cart").html("response");
				console.log("Carrito actualizado");
			}
		});
	};


});