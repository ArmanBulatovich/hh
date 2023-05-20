import { expressService } from "../axiosConfig";

export async function getAllLanguages() {
  return await expressService.get("references/languages").then((res) => res.data);
}

export async function getAllEducationalInstitutionCategories() {
  return await expressService.get("references/educational-institution-categories").then((res) => res.data);
}