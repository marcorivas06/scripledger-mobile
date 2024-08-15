export function formatBalanceForAutocomplete(balances): {id:string, title:string}[]{
  const formattedBalances = balances.map(token => ({
    id: token.token_id,
    title: token.token_name,
    balance: token.balance
  }));
  return formattedBalances;
}