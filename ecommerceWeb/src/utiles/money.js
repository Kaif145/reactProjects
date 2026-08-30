
export function moneyGenrator(centsMoney){
  return `$${(centsMoney / 100).toFixed(2)}`;
}




export default moneyGenrator;
