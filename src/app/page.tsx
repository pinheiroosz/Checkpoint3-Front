import React from "react";
import {
  UserPlusIcon,
  GiftIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.8rem",
          fontWeight: "bold",
          marginBottom: "4rem",
          marginTop: "-15rem",
          color: "#007bff",
        }}
      >
        Bem-vindo ao Sistema da Lanchonete!
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          width: "100%",
          maxWidth: "800px",
          marginTop: "6rem",
        }}
      >
        <a
          href="/Clientes"
          style={{
            textDecoration: "none",
            textAlign: "center",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            color: "#222",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <UserPlusIcon
            style={{
              width: "8rem",
              height: "8rem",
              color: "#007bff",
              marginLeft: "1.1rem",
              marginTop: "1rem",
              paddingBottom: "1rem",
            }}
          />
          <h2
            style={{
              fontSize: "1.25rem",
              marginTop: "1rem",
            }}
          >
            Cadastro de Clientes
          </h2>
        </a>
        <a
          href="/Pedidos"
          style={{
            textDecoration: "none",
            textAlign: "center",
            padding: "2rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            color: "#222",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <GiftIcon
            style={{
              width: "8rem",
              height: "8rem",
              color: "#007bff",
            }}
          />
          <h2
            style={{
              fontSize: "1.25rem",
              marginTop: "1rem",
            }}
          >
            Cadastro de Pedidos
          </h2>
        </a>
        <a
          href="/Listagem"
          style={{
            textDecoration: "none",
            textAlign: "center",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            color: "#222",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <ListBulletIcon
            style={{
              width: "8rem",
              height: "8rem",
              color: "#007bff",
              marginTop: "1rem",

            }}
          />
          <h2
            style={{
              fontSize: "1.25rem",
              marginTop: "2rem",
            }}
          >
            Listagem de Pedidos
          </h2>
        </a>
      </div>
    </div>
  );
}
