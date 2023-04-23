export interface IValidationResult<TData> {
  valid: boolean;
  data?: TData;
  message?: string;
}
