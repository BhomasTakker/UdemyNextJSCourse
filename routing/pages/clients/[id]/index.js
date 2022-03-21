import { useRouter } from "next/router";

const IndividualClientsPage = () => {
  const router = useRouter();
  const loadProjectHandler = () => {
    //stuu
    router.push({
      pathname: "/clients/[id]/[clientsprojectid]",
      query: { id: "hippo", clientsprojectid: "pothomas" },
    });
    // router.push("/clients/max/projectA");
  };
  return (
    <div>
      <h1>IndividualClientsPage Projects Page for Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default IndividualClientsPage;
