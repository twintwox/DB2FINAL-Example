<%-- 
    Document   : products
    Created on : May 30, 2014, 3:03:43 PM
    Author     : twintwox
--%>

<%@page import="classes.Product"%>
<%@page import="java.util.HashSet"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Productos</title>
        <link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="resources/css/default.css" />
        <script src="jquery.js" type="text/javascript"></script>
        <script src="ajax.js" type="text/javascript"></script>
        <script src="resources/bootstrap/js/bootstrap.min.js"></script>
            
    </head>
    <body>
        <h1>Seleccione los productos a comprar</h1>
        
        <input type="hidden" id="host" value="<%= application.getAttribute("host") %>">
        <input type="hidden" id="userToken" value="<%= session.getAttribute("userToken") %>">
        
        <div class="row">
      
            <div class="col-xs-12 col-md-6">
            <table class="table table-striped">
                <% 
                   HashSet<Product> products= (HashSet<Product>) application.getAttribute("products");
                   for(Product p: products){
                %>        

              <tr>

              <td>  <%= p.getName() %> <input type="hidden" id="prod-<%= p.getId()%>" value="<%= p.getName() %>"/> </td>
              <td>  $<%= p.getPrice() %>  <input type="hidden" id="val-<%= p.getId()%>" value="<%= p.getPrice()%>"/>  </td>
              <td>
                  <button type="button" class="btn btn-default btn-sm btn-action" id="<%= p.getId()%>-more">
                    <span class="glyphicon glyphicon-plus"></span> 
                  </button>
                  
                  <button type="button" class="btn btn-default btn-sm btn-action" id="<%= p.getId()%>-less">
                    <span class="glyphicon glyphicon-minus"></span> 
                  </button>
              </td>
   
              <td>
                <div class="input-group">
                  <input type="number" id="input-<%= p.getId()%>" placeholder="cantidad" value="0" min="0" class="value form-control" />
                  <div class="input-group-btn">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></button>
                    <ul class="dropdown-menu pull-right">
                        <li><a class="btn-action" id="<%= p.getId()%>-set" href="#" >Establecer</a></li>
                        <li><a class="btn-action" id="<%= p.getId()%>-add" href="#" >Agregar</a></li>
                        <li><a class="btn-action" id="<%= p.getId()%>-remove" href="#" >Quitar</a></li> 
                    </ul>
                  </div><!-- /btn-group -->
                </div><!-- /input-group -->
              </td>            
              <td>            
                  <button type="button" class="btn btn-action btn-danger btn-sm" id="<%= p.getId()%>-delete">
                    <span class="glyphicon glyphicon-remove"></span> 
                  </button>
              </td>
              </tr>
              

                <%  
                    }
                %>
            </table>
            </div>
            <div class="col-xs-6 col-md-4">
            <div class="panel panel-success">
            <div class="carrito panel-heading"> Carrito de compras | 
            <a href="index.jsp" class="btn-action" id="0-checkout">Checkout!!</a>
            
            </div>
            <div class="panel-body">
                <table id="cart" class="table-condensed table">
                </table>
            </div>
            
            </div>
            </div>
     </div>
        
    </body>
</html>
