import Link from "next/Link";

const HomePage = () => {
  return (
    <div>
      <h1>Homepage Worldie!</h1>
      <ul>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
