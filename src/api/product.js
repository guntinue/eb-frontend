import apiClient from "./axios";

export const callSearchProductAPI = async ({ search }) => {
  try {
    const response = await apiClient.get(`/api/v1/products/search?s=${search}`);
    console.log("[ProductAPICalls] callSearchProductAPI RESULT : ", response.data);
    return response.data.data;
  } catch (error) {
    console.error("[ProductAPICalls] callSearchProductAPI ERROR : ", error);
    throw error;
  }
};

export const callProductRegistAPI = async ({ form }) => {
  try {
    const response = await apiClient.post("/api/v1/products", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("[ProductAPICalls] callProductRegistAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductRegistAPI ERROR : ", error);
    throw error;
  }
};

export const callProductUpdateAPI = async ({ form }) => {
  try {
    const response = await apiClient.put("/api/v1/products", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("[ProductAPICalls] callProductUpdateAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductUpdateAPI ERROR : ", error);
    throw error;
  }
};

export const callProductDetailForAdminAPI = async ({ productCode }) => {
  try {
    const response = await apiClient.get(`/api/v1/products-management/${productCode}`);
    console.log("[ProductAPICalls] callProductDetailForAdminAPI RESULT : ", response.data);
    if (response.status === 200) {
      return response.data.data.content;
    }
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductDetailForAdminAPI ERROR : ", error);
    throw error;
  }
};

export const callProductDetailAPI = async ({ productCode }) => {
  try {
    const response = await apiClient.get(`/api/v1/products/${productCode}`);
    console.log("[ProductAPICalls] callProductDetailAPI RESULT : ", response.data);
    if (response.status === 200) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductDetailAPI ERROR : ", error);
    throw error;
  }
};

export const callProductListForAdminAPI = async ({ currentPage }) => {
  const url = currentPage
    ? `/api/v1/products-management?offset=${currentPage}`
    : `/api/v1/products-management`;
  
  try {
    const response = await apiClient.get(url);
    if (response.status === 200) {
      console.log("[ProductAPICalls] callProductListForAdminAPI RESULT : ", response.data);
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductListForAdminAPI ERROR : ", error);
    throw error;
  }
};

export const callProductListAPI = async ({ currentPage }) => {
  const url = currentPage
    ? `/api/v1/products?offset=${currentPage}`
    : `/api/v1/products`;

  try {
    const response = await apiClient.get(url);
    if (response.status === 200) {
      console.log("[ProductAPICalls] callProductListAPI RESULT : ", response.data);
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductListAPI ERROR : ", error);
    throw error;
  }
};

export const callProductListAboutMealAPI = async () => {
  try {
    const response = await apiClient.get("/api/v1/products/meals");
    if (response.status === 200) {
      console.log("[ProductAPICalls] callProductListAboutMeal RESULT : ", response.data);
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductListAboutMealAPI ERROR : ", error);
    throw error;
  }
};

export const callProductListAboutDessertAPI = async () => {
  try {
    const response = await apiClient.get("/api/v1/products/dessert");
    if (response.status === 200) {
      console.log("[ProductAPICalls] callProductListAboutDessert RESULT : ", response.data);
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductListAboutDessertAPI ERROR : ", error);
    throw error;
  }
};

export const callProductListAboutBeverageAPI = async () => {
  try {
    const response = await apiClient.get("/api/v1/products/beverage");
    if (response.status === 200) {
      console.log("[ProductAPICalls] callProductListAboutBeverage RESULT : ", response.data);
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error("[ProductAPICalls] callProductListAboutBeverageAPI ERROR : ", error);
    throw error;
  }
};
