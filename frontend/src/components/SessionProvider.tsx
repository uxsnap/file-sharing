import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SessionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isAuth } = useSession();

  useEffect(() => {
    if (isAuth) {
      router.push("/");
      return;
    }

    router.push("/auth");
  }, [isAuth]);

  return children;
};

export default SessionProvider;
