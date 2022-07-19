export type CallbackProps = {
  onSuccess?: () => void;
  // deno-lint-ignore no-explicit-any
  onError?: (error: any) => void;
};
