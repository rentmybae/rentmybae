export type FormState = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
  /** Echo of non-secret submitted values so the form keeps what the user typed after a server error. */
  values?: Record<string, string>;
};
export const initialState: FormState = {};

const SECRET = /password/i;
export function echo(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of fd.entries()) if (typeof v === "string" && !SECRET.test(k) && !k.startsWith("$")) out[k] = v;
  return out;
}
