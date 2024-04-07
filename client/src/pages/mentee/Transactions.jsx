import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Box, Text } from '@chakra-ui/react';
import { baseUrl } from '../../api/apis';
import { UserState } from '../../context/user';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = UserState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl + 'user/getAll-transaction');
        setTransactions(response.data.transactions.filter(user.id));
      } catch (error) {
        setError('Error fetching transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={4} bgColor={'white'}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Payment Transactions</Text>
      {loading && <Spinner color="blue.500" />}
      {error && <Text color="red.500">{error}</Text>}
      {!loading && !error && (
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>User ID</Th>
              <Th>Amount</Th>
              <Th>Currency</Th>
              <Th>Payment ID</Th>
              <Th>Order ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map(transaction => (
              <Tr key={transaction._id}>
                <Td>{transaction.userId}</Td>
                <Td>&#8377;{transaction.amount}</Td>
                <Td>{transaction.currency}</Td>
                <Td>{transaction.paymentId}</Td>
                <Td>{transaction.orderId}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Transactions;
