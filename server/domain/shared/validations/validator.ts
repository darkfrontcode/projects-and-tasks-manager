import { Schema, ValidationError } from "yup";
import { IValidationResult, IValidator } from "../protocols";
import { ValidationResult } from "./result.validator";

export abstract class Validator<TValue> implements IValidator<TValue> {
  schema: Schema;

  async validate(value: TValue): Promise<IValidationResult<TValue>> {
    try {
      await this.schema.validate(value);
      return ValidationResult.ok(value);
    } catch (error) {
      if (error instanceof ValidationError) {
        return ValidationResult.error(error.message);
      }

      return ValidationResult.error(error.toString());
    }
  }
}
