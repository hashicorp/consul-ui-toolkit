export interface CopyBlockSignature {
  Args: {
    clipboardText: string;
    timeout?: number;
    onSuccess(): void;
  };
}
