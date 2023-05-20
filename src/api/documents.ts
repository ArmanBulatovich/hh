import { expressService } from "../axiosConfig";

export async function getAllDocuments(filter: any) {
  // const name = filter?.name && filter?.name !== "" ? `&name=${filter?.name}` : "";
  const languageIds = filter?.languageIds && filter?.languageIds !== "" ? `&languageIds=${filter?.languageIds}` : "";
  const educationalInstitutionCategoryIds = filter?.educationalInstitutionCategoryIds && filter?.educationalInstitutionCategoryIds !== "" ? `&educationalInstitutionCategoryIds=${filter?.educationalInstitutionCategoryIds}` : "";
  return await expressService.get(`documents?${languageIds}${educationalInstitutionCategoryIds}`).then((res) => res.data);
}

// export async function getFreelancerById(id: string) {
//   const res = await expressService.get(`freelancer/${id}`);
//   console.log("res.data")
//   return res.data;
// }