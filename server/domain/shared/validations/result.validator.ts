import { IValidationResult } from "../protocols";

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
