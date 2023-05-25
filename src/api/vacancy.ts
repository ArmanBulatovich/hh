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

export async function getAllOwnVacancies() {
  const res = await expressService.get('vacancy/own');
  return res.data;
}

export async function getAllVacancies() {
  const res = await expressService.get('vacancy');
  return res.data;
}

export async function deleteVacancy(id: string) {
  const res = await expressService.delete(`vacancy/${id}`);
  return res.data;
}

export async function getVacancyById(id: string) {
  const res = await expressService.get(`vacancy/${id}`);
  return res.data;
}

export async function postVacancyRequest(data: any) {
  const res = await expressService.post('vacancy-request/response', data);
  return res.data;
}

export async function getAllStatuses() {
  const res = await expressService.get('vacancy-request/statuses');
  return res.data;
}

export async function getResponsesByCode(code: string) {
  const res = await expressService.get(`vacancy-request/own/${code}`);
  return res.data;
}

export async function acceptResponse(id: string) {
  const res = await expressService.post(`vacancy-request/accept/${id}`);
  return res.data;
}

export async function rejectResponse(id: string) {
  const res = await expressService.post(`vacancy-request/reject/${id}`);
  return res.data;
}