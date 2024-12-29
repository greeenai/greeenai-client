interface MSStream {
  readonly type: string;
  msClose(): void;
  msDetachStream(): any;
}

declare global {
  interface Window {
    MSStream?: MSStream;
  }
}

export {};
