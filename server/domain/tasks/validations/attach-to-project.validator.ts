import { object, string } from "yup";
import { IdentityQuery, Validator } from "../../shared";
import { AttachTaskToProjectRequest } from "../models";

export class AttachTaskToProjectValidator extends Validator<
  IdentityQuery & AttachTaskToProjectRequest
> {
  schema = object({
    id: string().required(),
    projectId: string().required(),
  });
}
