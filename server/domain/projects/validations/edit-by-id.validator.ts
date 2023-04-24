import { object, string } from "yup";
import { IdentityQuery, Validator } from "../../shared";
import { EditProjectRequest } from "../models";

export class EditProjectByIdValidator extends Validator<
  IdentityQuery & EditProjectRequest
> {
  schema = object({
    id: string().required(),
    name: string().required(),
  });
}
