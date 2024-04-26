export const formatPrice = price => {
  if (price == null) return 'N/A'; // Handle cases where price is null or undefined
  return price
    .toLocaleString('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    .replace(',', '.');
};

export const sortList = list => {
  return list.sort((a, b) => {
    if (a.status === 'tersedia' && b.status !== 'tersedia') return -1;
    if (a.status !== 'tersedia' && b.status === 'tersedia') return 1;
    return 0;
  });
};
