import React, { useEffect, useState } from "react";
import api from "../api/client.js";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [health, setHealth] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const helloRes = await api.get("/hello");
        setMessage(helloRes.data.message);

        const baseURL = api.defaults.baseURL?.replace("/api", "") || "";
        if (baseURL) {
          const healthRes = await api.get("/health", { baseURL });
          setHealth(healthRes.data);
        }

        const usersRes = await api.get("/users");
        setUsers(usersRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p><strong>Mensagem da API:</strong> {message || "..."}</p>

      <h3>Status da API</h3>
      {health ? <pre>{JSON.stringify(health, null, 2)}</pre> : <p>Carregando status...</p>}

      <h3>Usuários (exemplo)</h3>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul>{users.map(u => <li key={u._id}>{u.name} - {u.email}</li>)}</ul>
      )}
    </div>
  );
}
