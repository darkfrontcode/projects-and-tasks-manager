import { ValidationError, number, object } from "yup";

export interface AnyModel {
  id: number;
}

export interface IValidator<TValue> {
  validate: (value: TValue) => Promise<IValidationResult<TValue>>;
}

export interface IValidationResult<TData> {
  valid: boolean;
  data?: TData;
  message?: string;
}

export class ValidationResult {
  private constructor() {}

  static ok<TData>(data: TData): IValidationResult<TData> {
    const valid = true;
    return { valid, data };
  }

  static error(message: string): IValidationResult<null> {
    const valid = false;
    return { valid, message };
  }
}

export class SchemaValidator<AnyModel> implements IValidator<AnyModel> {
  _schema = object({
    id: number().required(),
  });

  async validate(value: AnyModel): Promise<IValidationResult<AnyModel>> {
    try {
      await this._schema.validate(value);
      return ValidationResult.ok(value);
    } catch (error) {
      if (error instanceof ValidationError) {
        return ValidationResult.error(error.message);
      }

      return ValidationResult.error(error.toString());
    }
  }
}
