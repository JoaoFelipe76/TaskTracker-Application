package entity;

import io.quarkus.hibernate.orm.JsonFormat;
import jakarta.json.bind.annotation.JsonbDateFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


@Entity
@Data
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private String title;

    @Column()
    private String descricao;

    @Column()
    @JsonbDateFormat("yyyy-MM-dd")
    private LocalDate dataParaFinalizacao;

    @Column()
    private Boolean finalizado = false;

}
