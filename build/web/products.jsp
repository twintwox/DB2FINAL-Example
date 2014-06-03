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
        <script src="jquery.js" type="text/javascript"></script>
        <script src="ajax.js" type="text/javascript"></script>
        <style>
            .carrito{
                position:absolute;
                right: 1.5em;
                top:1em;
                border: 1px solid blue;
                padding: 1em;
            }
            
        </style>
    </head>
    <body>
        <h1>Seleccione los productos a comprar</h1>
        
        <input type="hidden" id="host" value="<%= application.getAttribute("host") %>">
        <input type="hidden" id="userToken" value="<%= session.getAttribute("userToken") %>">
        
        <table>
        <% 
           HashSet<Product> products= (HashSet<Product>) application.getAttribute("products");
           for(Product p: products){
        %>        
        
        <tr>
            
            <td>  <%= p.getName() %> <input type="hidden" id="prod-<%= p.getId()%>" value="<%= p.getName() %>"/> </td>
            <td>  $<%= p.getPrice() %>  <input type="hidden" id="val-<%= p.getId()%>" value="<%= p.getPrice()%>"/>  </td>
            <td><button class="btn" id="<%= p.getId()%>-more" >+</button></td>
            <td><button class="btn" id="<%= p.getId()%>-less"  >-</button></td>
            
            <td><input type="number" placeholder="cantidad" style= " width:50px;" value="0" min="0" class="value" /></td>
            <td><button class="btn" id="<%= p.getId()%>-set" >Establecer</button></td>
            
            <td><button class="btn" id="<%= p.getId()%>-add" >Agregar</button></td>
            <td><button class="btn" id="<%= p.getId()%>-remove" >Quitar</button></td>
            <td><button class="btn" id="<%= p.getId()%>-delete"  >X</button></td>
            
        </tr>
                
        <%  
            }
        %>
        </table>

        <div class="carrito">
            <h3>Carrito de compras</h3>
            <table id="cart">
            </table>
        </div>
        
    </body>
</html>
