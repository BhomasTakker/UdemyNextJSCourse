const fsPromises = require("fs").promises;
//import fs from 'fs/promises'
import path from "path";
import Link from "next/Link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((prod) => (
        <li key={prod.id}>
          <Link href={`/products/${prod.id}`}>{prod.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("RE-generating");
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fsPromises.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
