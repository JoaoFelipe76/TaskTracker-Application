package service;

import entity.Todo;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import repository.TodoRepository;

import java.util.List;

@ApplicationScoped
public class TodoService {

    private final TodoRepository todoRepository;
    private final EntityManager entityManager;

    @Inject
    public TodoService(TodoRepository todoRepository, EntityManager entityManager) {

        this.todoRepository = todoRepository;
        this.entityManager = entityManager;

    }

    public Todo findById(Long id) {

        return todoRepository.findById(id);

    }

    public List<Todo> findAll() {

        PanacheQuery<Todo> all = todoRepository.findAll();
        return all.list();

    }


    public List<Todo> findAllOpen() {

        return todoRepository.findAllOpen();

    }

    public List<Todo> findAllClose() {

        return todoRepository.findAllClose();
    }

    public Todo save(Todo todo) {

        todoRepository.persist(todo);
        return todo;

    }

   public void delete(Long id) {

        todoRepository.deleteById(id);

   }

    @Transactional
    public void update(Long id, Todo todo) {
        Todo existingTodo = entityManager.find(Todo.class, id);

        if (existingTodo == null) {
            throw new EntityNotFoundException("Todo not found with id " + id);
        }

        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescricao(todo.getDescricao());
        existingTodo.setDataParaFinalizacao(todo.getDataParaFinalizacao());
        existingTodo.setFinalizado(todo.getFinalizado());

    }
}
