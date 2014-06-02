<%-- 
    Document   : index
    Created on : May 30, 2014, 2:49:32 PM
    Author     : twintwox
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Inicio</title>
        <script src="jquery.js" type="text/javascript"></script>
        <script src="ajax.js" type="text/javascript"></script>
       
    </head>
    <body>
        
        <h2>Datos a utilizar</h2>
        <form id="initForm" action="Login" method="POST">
            <input type="text" required id="page" name="page" placeholder="Pagina web"/>
            <input type="text" required id="user" name="user" placeholder="Usuario"/>
            <input type="hidden" id="host" value="<%= application.getAttribute("host") %>">
            <input type="hidden" id="webToken" name="webToken" />
            <input type="hidden" id="userToken" name="userToken"/>
            <input type="submit" value="Ingresar"/>
        </form>
    </body>
</html>
