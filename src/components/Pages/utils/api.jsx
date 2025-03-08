export async function fetchProducts(page, perPage) {
    const response = await fetch(`https://fakestoreapi.com/products?limit=${perPage}`);
    const products = await response.json();
    
    const startIndex = (page - 1) * perPage;
    const paginatedProducts = products.slice(startIndex, startIndex + perPage);
  
    return { products: paginatedProducts, total: products.length };
  }
  