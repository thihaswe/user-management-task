// hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetail, fetchUsers } from "../utils/api";
import { User } from "@/types";

export const useUsers = (limit = 0, skip = 0, sortBy = "", order = "asc") => {
  return useQuery<User[]>({
    queryKey: ["users", limit, skip, sortBy, order],
    queryFn: () => fetchUsers(limit, skip, sortBy, order),
  });
};

export const useUser = (id: number) => {
  return useQuery<User | undefined>({
    queryKey: ["user", id],
    queryFn: () => fetchUserDetail(id),
    enabled: !!id,
  });
};
