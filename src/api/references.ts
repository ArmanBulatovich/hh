import { expressService } from "../axiosConfig";

export async function getAllLanguages() {
  return await expressService.get("references/languages").then((res) => res.data);
}

export async function getAllEducationalInstitutionCategories() {
  return await expressService.get("references/educational-institution-categories").then((res) => res.data);
}

export async function experienceRanges() {
  return await expressService.get("references/experience-ranges").then((res) => res.data);
}

export async function getAllWorkShcedules() {
  return await expressService.get("references/work-shedules").then((res) => res.data);
}

export async function getAllEmploymentTypes() {
  return await expressService.get("references/employment-types").then((res) => res.data);
}

export async function getAllCurrencies() {
  return await expressService.get("references/currencies").then((res) => res.data);
}

export async function getAllSubjectsByEduCategoryId(id: string) {
  return await expressService.get(`references/subject-categories/${id}`).then((res) => res.data);
}