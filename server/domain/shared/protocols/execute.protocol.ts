export interface IExecute<TRequest, TResponse> {
  execute(request: TRequest): TResponse;
}
