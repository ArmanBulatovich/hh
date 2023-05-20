import { expressService } from "../axiosConfig";

export async function getAllDocuments() {
  // const res = await expressService.get("documents");
  // console.log("res.data")
  // return res.data;
  return await expressService.get("documents").then((res) => res.data);
}

// export async function getFreelancerById(id: string) {
//   const res = await expressService.get(`freelancer/${id}`);
//   console.log("res.data")
//   return res.data;
// }