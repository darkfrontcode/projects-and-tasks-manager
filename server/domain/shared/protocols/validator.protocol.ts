import { IValidationResult } from "./validation-result.protocol";

export interface IValidator<TValue> {
  validate: (value: TValue) => Promise<IValidationResult<TValue>>;
}
