import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Posts from "@/components/Posts";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

const DashboardPage = async () => {
  return (
    <main className="flex w-full flex-grow">
      <div className="flex flex-col flex-1 gap-y-8 max-w-lg mx-auto pb-20">
        <Suspense>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
};

export default DashboardPage;
