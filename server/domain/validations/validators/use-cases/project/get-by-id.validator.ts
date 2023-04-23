import { object, string } from "yup";
import { IdentityQuery } from "../../../../interfaces";
import { Validator } from "../../validator";

export class GetProjectByIdValidator extends Validator<IdentityQuery> {
  schema = object({
    id: string().required(),
  });
}
