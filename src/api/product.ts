import api from '.';

export async function getProductById(productId: number) {
  return api.get(`products/${productId}`);
}

export async function createProduct(body: Record<string, any>) {
  return api.post('products', body);
}

export async function updateProduct(productId: number, body: Record<string, any>) {
  return api.put(`products/${productId}`, body);
}