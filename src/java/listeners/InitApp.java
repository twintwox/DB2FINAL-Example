/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package listeners;

import classes.Product;
import java.util.HashSet;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Web application lifecycle listener.
 *
 * @author twintwox
 */
public class InitApp implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        
        sce.getServletContext().setAttribute("host", "http://localhost:8085/");
      
        
        HashSet<Product> products = new HashSet();
        int i = 0;
        Product p= new Product(i,"Notebook", 6500.0);
        products.add(p);
        i++;
        
        p= new Product(i,"Notebook", 6500.0);
        products.add(p);
        i++;
        
        p= new Product(i,"Teclado", 150.0);
        products.add(p);
        i++;
        
        p= new Product(i,"Mouse", 90.5);
        products.add(p);
        i++;
        
        p= new Product(i,"Monitor", 1700.0);
        products.add(p);
        i++;
        
        p= new Product(i,"LCD 32'", 3300.0);
        products.add(p);
        i++;
        
        p= new Product(i,"Fuente", 250.0);
        products.add(p);
        i++;
        
        p= new Product(i,"Pendrive 8gb", 110.0);
        products.add(p);
        i++;
        
        p= new Product(i,"Disco 500g", 300.0);
        products.add(p);
        i++;
        
        sce.getServletContext().setAttribute("products",products);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
