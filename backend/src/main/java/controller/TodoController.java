package controller;

import entity.Todo;
import jakarta.inject.Inject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import jakarta.ws.rs.core.UriInfo;
import service.TodoService;

import java.net.URI;
import java.util.List;

@Path("/todos")
public class TodoController {

    private final TodoService repository;
    private final UriInfo uriInfo;

    @Inject
    public TodoController(TodoService repository, UriInfo uriInfo) {

        this.repository = repository;
        this.uriInfo = uriInfo;

    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            Todo byId = repository.findById(id);

            if (byId == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Todo não encontrado " + id)
                        .build();
            }

            return Response.status(Response.Status.OK).entity(byId).build();

        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Ocorreu um erro " + e.getMessage())
                    .build();
        }
    }

    @GET
    public Response getAll() {

        List<Todo> query = repository.findAll();
        return Response.status(Response.Status.OK).entity(query).build();

    }

    @GET
    @Path("/open")
    public Response listOpen() {

        List<Todo> list = repository.findAllOpen();
        return Response.status(Response.Status.OK).entity(list).build();


    }

    @GET
    @Path("/close")
    public Response listClose() {

        List<Todo> list = repository.findAllClose();
        return Response.status(Response.Status.OK).entity(list).build();


    }

    @POST
    @Transactional
    public Response create(Todo todo) {

        try {

            Todo save = repository.save(todo);
            URI uri = UriBuilder.fromUri(uriInfo.getRequestUri())
                    .path(String.valueOf(todo.getId()))
                    .build();

            return Response.status(Response.Status.CREATED).entity(save).build();

        }catch (IllegalArgumentException ex){

            return Response.status(Response.Status.BAD_REQUEST).entity(ex).build();


        }

    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, Todo todo) {
        try {
            repository.update(id, todo);
            return Response.ok().build();
        } catch (EntityNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Todo não encontrado.").build();
        }
    }


    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        try {
            Todo byId = repository.findById(id);

            if (byId == null) {
                throw new EntityNotFoundException("Objeto não encontrado");
            }

            repository.delete(id);

            return Response.status(Response.Status.NO_CONTENT).build();

        } catch (EntityNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Ocorreu um erro: " + e.getMessage()).build();
        }
    }

}
