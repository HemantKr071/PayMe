import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const fetchAccountBalance = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        console.log('Balance:', response.data.balance);
        return response.data.balance;

      } catch (error) {
        console.error('Error fetching balance:', error.message);
      }
    };


export const Balance = () => {
    const [balance,setBalance] = useState("Loading");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
          try {
            const balance = await fetchAccountBalance();
            setBalance(balance);
          } catch (error) {
            setError('Error fetching balance');
          } finally {
            setLoading(false);
          }
        };
    
        fetchBalance();
      }, [balance]);
      
     
      const formatBalance = (balance) => {
        if (typeof balance !== 'number') return balance; // Handle non-numeric values gracefully
        return parseInt(balance).toLocaleString(); // Converts to integer and adds commas for thousands separator
      };
    
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
        {loading ? 'Loading Balance...' : error ? 'Error fetching balance' : `Rs ${formatBalance(balance)}`}
        </div>
    </div>
}