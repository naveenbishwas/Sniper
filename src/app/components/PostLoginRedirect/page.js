"use client";

import { useProfileRedirect } from "@/hooks/useProfileRedirect";

export default function PostLoginRedirect() {
  useProfileRedirect();

  return <p>Checking your profile and redirecting...</p>;
}
