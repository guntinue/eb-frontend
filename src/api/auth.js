import apiClient from "./axios";

export const callGetMemberAPI = async ({ memberId }) => {
  try {
    const response = await apiClient.get(`/api/v1/members/${memberId}`);
    console.log("[MemberAPICalls] callGetMemberAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[MemberAPICalls] callGetMemberAPI ERROR : ", error);
    throw error;
  }
};

export const callLoginAPI = async ({ form }) => {
  try {
    const response = await apiClient.post("/auth/login", {
      memberId: form.memberId,
      memberPassword: form.memberPassword,
    });
    console.log("[MemberAPICalls] callLoginAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[MemberAPICalls] callLoginAPI ERROR : ", error);
    throw error;
  }
};

export const callLogoutAPI = () => {
  console.log("[MemberAPICalls] callLogoutAPI RESULT : SUCCESS");
  return { status: 200, message: "로그아웃 성공" };
};

export const callRegisterAPI = async ({ form }) => {
  try {
    const response = await apiClient.post("/auth/signup", {
      memberId: form.memberId,
      memberPassword: form.memberPassword,
      memberName: form.memberName,
      memberEmail: form.memberEmail,
    });
    console.log("[MemberAPICalls] callRegisterAPI RESULT : ", response.data);
    return response.data;
  } catch (error) {
    console.error("[MemberAPICalls] callRegisterAPI ERROR : ", error);
    throw error;
  }
};