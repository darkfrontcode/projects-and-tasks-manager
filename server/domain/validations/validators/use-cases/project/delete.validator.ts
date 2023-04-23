import { array, object, string } from "yup";
import { IdentityQuery } from "../../../../interfaces";
import { Validator } from "../../validator";

export class DeleteProjectByIdValidator extends Validator<IdentityQuery[]> {
  schema = object({
    ids: array()
      .of(
        object().shape({
          id: string().required(),
        })
      )
      .required(),
  });
}
