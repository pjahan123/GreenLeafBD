const API_URL = 'http://localhost:5000/api';

async function request(path, options = {}) {
  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message || `Request failed (${response.status})`
      );
    }

    return data;

  } catch (error) {

    if (error.name === 'AbortError') {
      throw new Error(
        'Backend request timed out. Make sure GreenLeaf BD backend is running.'
      );
    }

    if (error instanceof TypeError) {
      throw new Error(
        'Cannot connect to GreenLeaf BD backend. Start the backend on port 5000.'
      );
    }

    throw error;

  } finally {
    clearTimeout(timer);
  }
}


// ==================== AUTH ====================

export const loginUser = (email, password) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });


export const registerUser = (name, email, password) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });


// ==================== PLANTS ====================

export const getPlants = () =>
  request('/plants');


// ==================== ORDERS ====================

export const createOrder = (token, items, customer) =>
  request('/orders', {
    method: 'POST',

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      items,
      customer,
    }),
  });


export const getOrders = (token) =>
  request('/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });