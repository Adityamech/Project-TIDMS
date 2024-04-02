
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/app/admin/page';
 // Assuming you have an API utility function to fetch sales data

interface SalesItem {
  id: number;
  productName: string;
  quantity: number;
  totalPrice: number;
}

interface SalesListProps {
  salesData: SalesItem[];
}

const SalesList: React.FC<SalesListProps> = ({ salesData }) => {
  const router = useRouter();
  
  // Example of handling a click event to navigate to the sales details page
  const handleItemClick = (id: number) => {
    router.push(`/sales/${id}`);
  };

  return (
    <Layout>
      <Head>
        <title>Sales List</title>
      </Head>
      <div>
        <h1>Sales List</h1>
        <ul>
          {salesData.map((sale) => (
            <li key={sale.id} onClick={() => handleItemClick(sale.id)}>
              <div>{sale.productName}</div>
              <div>{sale.quantity}</div>
              <div>{sale.totalPrice}</div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch sales data from an API
  const salesData: SalesItem[] = await SalesData(); // Assuming getSalesData is an async function fetching data from an API

  return {
    props: {
      salesData,
    },
  };
};

export default SalesList;
