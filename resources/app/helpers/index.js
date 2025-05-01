export const formatPriceLocale = price => {
  if (price == null) return 'N/A'; // Handle cases where price is null or undefined
  return price
    .toLocaleString('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
    .replace(',', '.');
};

export const formatPrice = price => {
  if (price == null) return '0'; // Kalau null/undefined

  if (price < 1000) return price.toString(); // Kalau kurang dari 1000, tetap angka biasa

  if (price < 1000000) {
    const value = price / 1000;
    return parseFloat(value.toFixed(2)) + ' Ribu'; // Format ribu dengan satu angka desimal
  }

  if (price < 1000000000) {
    const value = price / 1000000;
    return parseFloat(value.toFixed(2)) + ' Juta'; // Format juta dengan dua angka desimal
  }

  if (price < 1000000000000) {
    const value = price / 1000000000;
    return parseFloat(value.toFixed(2)) + ' Miliar'; // Format miliar dengan satu angka desimal
  }

  const value = price / 1000000000000;
  return parseFloat(value.toFixed(2)) + ' Triliun'; // Format triliun dengan satu angka desimal
};

export const sortList = list => {
  return list.sort((a, b) => {
    if (a.status === 'tersedia' && b.status !== 'tersedia') return -1;
    if (a.status !== 'tersedia' && b.status === 'tersedia') return 1;
    return 0;
  });
};

export const formattedSlug = slug => {
  if (slug == null) return 'N/A'; // Handle cases where price is null or undefined
  return slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

export const formatViews = views => {
  if (views == null) return '0';
  if (views < 1000) return views.toString();
  if (views < 1000000) {
    const value = views / 1000;
    return (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)) + 'k';
  }
  const value = views / 1000000;
  return (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)) + 'M';
};

export const formatPhone = phone => {
  if (!phone) return '';

  // Hanya menampilkan 8 digit pertama, sisanya diganti dengan 'xxxx'
  const cleaned = phone.replace(/\s+/g, ''); // hapus spasi jika ada
  return cleaned.slice(0, 6) + 'xxxx';
};
