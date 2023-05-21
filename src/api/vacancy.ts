import { expressService } from "../axiosConfig";

export async function getAllDocuments(filter: any) {
  const languageIds = filter?.languageIds && filter?.languageIds !== "" ? `&languageIds=${filter?.languageIds}` : "";
  const educationalInstitutionCategoryIds = filter?.educationalInstitutionCategoryIds && filter?.educationalInstitutionCategoryIds !== "" ? `&educationalInstitutionCategoryIds=${filter?.educationalInstitutionCategoryIds}` : "";
  return await expressService.get(`documents?${languageIds}${educationalInstitutionCategoryIds}`).then((res) => res.data);
}

export async function getDocumentById(id: string) {
  const res = await expressService.get(`documents/${id}`);
  return res.data;
}

export async function createVacancy(data: any) {
  const res = await expressService.post('vacancy', data);
  return res.data;
}

export async function getAllVacancies() {
  const res = await expressService.get('vacancy/own');
  return res.data;
}