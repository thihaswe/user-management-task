// hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../utils/api";
import { User } from "@/types";

export const useUsers = (limit = 0, skip = 0, sortBy = "", order = "asc") => {
  return useQuery<User[]>({
    queryKey: ["users", limit, skip, sortBy, order],
    queryFn: () => fetchUsers(limit, skip, sortBy, order),
  });
};
