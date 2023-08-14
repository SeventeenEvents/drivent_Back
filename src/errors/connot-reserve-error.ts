import { ApplicationError } from "@/protocols";

export function cannotReserveError(): ApplicationError {
  return {
    name: "CannotReserveError",
    message: "Cannot reserve this activity! Overcapacity!",
  };
}
