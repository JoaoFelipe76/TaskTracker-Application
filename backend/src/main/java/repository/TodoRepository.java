package repository;

import entity.Todo;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;


import java.util.List;

@ApplicationScoped
public class TodoRepository implements PanacheRepository<Todo> {

    public List<Todo> findAllOpen() {

        return find("finalizado = ?1", Sort.by("dataParaFinalizacao"), false).list();
    }

    public List<Todo> findAllClose() {

        return find("finalizado = ?1", Sort.by("dataParaFinalizacao"), true).list();

    }
}
