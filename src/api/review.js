import apiClient from "./axios";

export const callReviewDetailAPI = async ({ reviewCode }) => {
  try {
    const response = await apiClient.get(`/api/v1/reviews/detail/${reviewCode}`);
    console.log("[ReviewAPICalls] callReviewDetailAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[ReviewAPICalls] callReviewDetailAPI ERROR : ", error);
    throw error;
  }
};

export const callReviewWriteAPI = async ({ form }) => {
  console.log("[ReviewAPICalls] callReviewWriteAPI Call");

  try {
    const response = await apiClient.post("/api/v1/reviews", {
      productCode: form.productCode,
      memberCode: form.memberCode,
      reviewTitle: form.reviewTitle,
      reviewContent: form.reviewContent,
    });
    console.log("[ReviewAPICalls] callReviewWriteAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[ReviewAPICalls] callReviewWriteAPI ERROR : ", error);
    throw error;
  }
};

export const callReviewUpdateAPI = async ({ form }) => {
  console.log("[ReviewAPICalls] callReviewUpdateAPI Call");

  try {
    const response = await apiClient.put("/api/v1/reviews", {
      reviewCode: form.reviewCode,
      reviewTitle: form.reviewTitle,
      reviewContent: form.reviewContent,
    });
    console.log("[ReviewAPICalls] callReviewUpdateAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[ReviewAPICalls] callReviewUpdateAPI ERROR : ", error);
    throw error;
  }
};

export const callReviewsAPI = async ({ productCode, currentPage }) => {
  console.log("[ReviewAPICalls] callReviewsAPI Call");

  try {
    const response = await apiClient.get(`/api/v1/reviews/product/${productCode}?offset=${currentPage}`);
    console.log("[ReviewAPICalls] callReviewsAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[ReviewAPICalls] callReviewsAPI ERROR : ", error);
    throw error;
  }
};
