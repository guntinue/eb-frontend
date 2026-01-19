import apiClient from "./axios";

export const callPurchaseListAPI = async ({ memberId }) => {
  console.log("[PurchaseAPICalls] callPurchaseListAPI called with memberId:", memberId);

  try {
    const response = await apiClient.get(`/api/v1/orders/${memberId}`);
    console.log("[PurchaseAPICalls] callPurchaseListAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[PurchaseAPICalls] callPurchaseListAPI ERROR : ", error);
    throw error;
  }
};

export const callPurchaseAPI = async ({ form }) => {
  console.log("[PurchaseAPICalls] callPurchaseAPI Call");

  try {
    const response = await apiClient.post("/api/v1/purchase", {
      productCode: form.productCode,
      memberId: form.orderMemberId,
      orderPhone: form.orderPhone,
      orderEmail: form.orderEmail,
      orderReceiver: form.orderReceiver,
      orderAddress: form.orderAddress,
      orderAmount: form.orderAmount,
    });
    console.log("[PurchaseAPICalls] callPurchaseAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[PurchaseAPICalls] callPurchaseAPI ERROR : ", error);
    throw error;
  }
};
