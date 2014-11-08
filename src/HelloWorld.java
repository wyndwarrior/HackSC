import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloWorld extends HttpServlet {
    
    String s = "";
    public void service(HttpServletRequest request, HttpServletResponse response)
	throws IOException, ServletException
    {
	response.setContentType("text/html");
	String action = request.getParameter("action");
	if( action != null ){
	    PrintWriter out = response.getWriter();
	    switch(action){
	    case "put":
		s += request.getParameter("data");
		out.println("success");
		break;
	    case "get":
		out.println(s);
		break;
	    case "clear":
		s = "";
		break;
	    }
	}else{
	    PrintWriter out = response.getWriter();
	    out.println("Malformed request");
	}
    }
}
