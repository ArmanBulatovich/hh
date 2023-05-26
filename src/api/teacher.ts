import { expressService } from "../axiosConfig";

export async function getTeacherById(id: string) {
  const res = await expressService.get(`teacher/${id}`);
  return res.data;
}