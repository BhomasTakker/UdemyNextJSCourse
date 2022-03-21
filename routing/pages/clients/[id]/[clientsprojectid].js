import { useRouter } from "next/router";

const IndividualClientsProjectPage = () => {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <h1>Specific file for specific client</h1>
    </div>
  );
};

export default IndividualClientsProjectPage;
