import React, { useState, useEffect } from 'react';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      const response = await fetch('/api/usuarios');
      const data = await response.json();
      setUsuarios(data);
      setLoading(false);
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>{usuario.nombre}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaUsuarios;
