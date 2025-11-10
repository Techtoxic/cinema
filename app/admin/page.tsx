"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthChange } from "@/lib/auth";
import { User } from "firebase/auth";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser) {
        router.push("/admin/login");
      } else {
        router.push("/admin/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <LoadingAnimation isLoading={true} onComplete={() => {}} />;
  }

  return null;
}

