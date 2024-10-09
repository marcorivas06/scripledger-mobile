import { IUserTransaction } from "@types/types";

export const sortTransactionsByDate = (transactionData: IUserTransaction[]):IUserTransaction[] => {
  const sortedTransactions = [...transactionData].sort((a, b) => {
    if (a.timestamp && b.timestamp) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return 0;
  });
  
  // Convert timestamp to readable format
  const formattedTransactions = sortedTransactions.map(transaction => {
    if (transaction.timestamp) {
      const date = new Date(transaction.timestamp);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const readableDate = date.toLocaleDateString('en-US', options);
      return { ...transaction, readableTimestamp: readableDate };
    }
    return transaction;
  });
  return formattedTransactions;
}

