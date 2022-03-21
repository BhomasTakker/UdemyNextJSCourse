import Link from "next/Link";

const ClientsPage = () => {
  const clients = [
    { id: "me", name: "thomas" },
    { id: "me2", name: "thomas2" },
    { id: "me3", name: "thomas3" },
    { id: "me4", name: "thomas4" },
  ];
  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
