import { differenceInYears, parse, format } from "date-fns";

function calculateAge(dateCurrent) {
  const formatDate = format(dateCurrent, "dd/MM/yyyy", new Date());
  const date = parse(formatDate, "dd/MM/yyyy", new Date());
  const age = differenceInYears(new Date(), date);
  return age;
}

export { calculateAge };
