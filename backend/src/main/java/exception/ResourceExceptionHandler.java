package exception;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ResourceExceptionHandler implements ExceptionMapper<ObjectNotFoundException> {

    @Override
    public Response toResponse(ObjectNotFoundException exception) {
        StandardError error = new StandardError(System.currentTimeMillis(), Response.Status.NOT_FOUND.getStatusCode(), exception.getMessage());

        return Response.status(Response.Status.NOT_FOUND).entity(error).build();
    }
}
