// hooks/useUsers.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetail, fetchUsers, fetchUsersByName } from "../utils/api";
import { User } from "@/types";

export const useUsers = (
  limit: number,
  skip: number,
  sortBy: string,
  order: string
) => {
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

// for client size user filtering
export const useSearchUser = (name: string) => {
  return useQuery<User[] | undefined>({
    queryKey: ["user", name],
    queryFn: () => fetchUsersByName(name),
    enabled: !!name,
  });
};
