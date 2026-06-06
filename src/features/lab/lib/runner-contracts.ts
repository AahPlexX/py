export type RunnerStatus =
  | "idle"
  | "loading"
  | "ready"
  | "running"
  | "load-error";

export type RunResult = {
  stdout: string;
  stderr: string;
  error: RunError | null;
  durationMs: number;
};

export type RunError = {
  name: string;
  message: string;
  lineno?: number;
  beginnerExplanation?: string;
};

export type RunRequest = {
  id: string;
  code: string;
  timeoutMs?: number;
};

export const DEFAULT_TIMEOUT_MS = 10_000;

export const BEGINNER_ERROR_MESSAGES: Record<string, string> = {
  SyntaxError:
    "Python found a problem with how your code is written. Check for missing quotes, colons, or parentheses.",
  NameError:
    "Python couldn't find a name you used. Make sure the variable or function is defined before you use it.",
  TypeError:
    "Python received the wrong type of value. Check that you're passing numbers to math operations and strings to string methods.",
  ValueError:
    "The value you provided is the right type but has an invalid content. For example, int('hello') fails because 'hello' isn't a number.",
  IndexError:
    "You tried to access a list position that doesn't exist. Remember that list indexes start at 0.",
  KeyError:
    "You tried to access a dictionary key that doesn't exist. Use .get() to avoid this error.",
  AttributeError:
    "You tried to use a method or attribute that the object doesn't have. Check your spelling and the object type.",
  ZeroDivisionError:
    "You tried to divide a number by zero. Python can't do that — check your divisor.",
  IndentationError:
    "Python requires consistent indentation. Make sure each block is indented with the same number of spaces.",
  RecursionError:
    "Your function called itself too many times. Make sure recursive functions have a base case.",
};

export function enrichError(error: RunError): RunError {
  const explanation =
    BEGINNER_ERROR_MESSAGES[error.name] ??
    "Something went wrong. Read the error message carefully — Python usually tells you exactly what happened.";
  return { ...error, beginnerExplanation: explanation };
}
