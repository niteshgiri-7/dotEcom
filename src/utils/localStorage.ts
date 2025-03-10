export const setAuthInLocalStorage = (role: "admin" | "user") => {
  localStorage.setItem("hasUser", JSON.stringify(true));
  localStorage.setItem("role", role);
};

type TRole = "admin"|"user";

export const getAuthFromLocalStorage = () => {
  const hasUser: boolean = JSON.parse(
    localStorage.getItem("hasUser") as string
  );
  const role:"admin"|"user" = localStorage.getItem("role") as TRole;

  return { hasUser, role };
};

export const removeAuthFromLocalStorage = ()=>{
    localStorage.removeItem("hasUser");
    localStorage.removeItem("role");
}
