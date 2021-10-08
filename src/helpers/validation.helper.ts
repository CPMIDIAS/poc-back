import { ValidationError } from "class-validator";

export const validationErrorParser = (errorList: ValidationError[]): Record<string, unknown> =>
  errorList.reduce(
    (acc, err) => {
      if(err.constraints) {
        return { ...acc, [err.property]: Object.values(err.constraints).join(", ") }
      } else {
        return { ...acc }
      }
    },
    {}
  )
