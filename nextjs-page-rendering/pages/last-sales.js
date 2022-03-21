import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoadeing] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-course-ae717-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    const transformedSales = [];

    for (const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    setSales(transformedSales);
  }, [data]);
  //   useEffect(() => {
  //     setIsLoadeing(true);
  //     fetch("https://nextjs-course-ae717-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setIsLoadeing(false);
  //         setSales(transformedSales);
  //       });
  //   }, []);
  if (error) {
    return <p>Failed to Load</p>;
  }
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  return fetch(
    "https://nextjs-course-ae717-default-rtdb.firebaseio.com/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return {
        props: {
          sales: transformedSales,
        },
        revalidate: 10,
      };
    });
}

export default LastSalesPage;
