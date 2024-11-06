import { allNav } from "./allNav";

export const getAllNav = (role) => {
  const result = [];

  for(let i = 0; i < allNav.length; i++) {
    if(role === allNav[i].role) {
      result.push(allNav[i]);
    }
  }
  return result;
}