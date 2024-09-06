                      CREATE TABLE todo (
                      id SERIAL PRIMARY KEY,
                      title VARCHAR(255),
                      descricao TEXT,
                      data_para_finalizacao TIMESTAMP,
                      finalizado BOOLEAN DEFAULT FALSE
                      );