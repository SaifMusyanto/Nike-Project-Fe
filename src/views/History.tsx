import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import axios from 'axios';

const HistoryPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]); // State to store transaction data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Fetch transaction data when the component is mounted
    const fetchTransactions = async () => {
      try {
        // Replace with the correct API URL
        const response = await axios.get('http://localhost:8000/api/transactions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
        });
        setTransactions(response.data.data); // Update the state with the fetched data
      } catch (err: any) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // Empty array means this runs once when the component mounts

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen w-screen">
        <Navbar />
        <div className="container mx-auto py-8 px-4">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen w-screen">
        <Navbar />
        <div className="container mx-auto py-8 px-4 text-red-500">{error}</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen w-screen">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-8">Transaction History</h1>
        {transactions.map((transaction: any) => (
          <div key={transaction.id} className="bg-white p-6 rounded-md shadow mb-4">
            <h2 className="text-lg font-bold mb-2">Transaction #{transaction.id}</h2>
            <p className="text-sm text-gray-500 mb-4">Date: {transaction.created_at}</p>
            <div>
              {transaction.transaction_details.map((detail: any, index: number) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <div>
                    <img src={detail.product.image} alt={detail.product.name} width={50} className="rounded-md" />
                    <p className="font-bold">{detail.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {detail.quantity} | Price: Rp {detail.product.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="font-bold">
                    Total: Rp {(detail.product.price * detail.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <p className="font-bold text-right">
              Total Payment: Rp{' '}
              {transaction.transaction_details
                .reduce((total: number, detail: any) => total + detail.product.price * detail.quantity, 0)
                .toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
