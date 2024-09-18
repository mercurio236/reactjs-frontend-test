import { differenceInYears, parse } from "date-fns";

function calculateAge(dateCurrent) {
  const parsedDate = parse(dateCurrent, "yyyy-MM-dd", new Date());  
  const age = differenceInYears(new Date(), parsedDate);
  
  return age;
}

export { calculateAge };
