import { expressService } from "../axiosConfig";

export async function getAccount() {
  return await expressService.get("users/account").then((res) => res.data);
}