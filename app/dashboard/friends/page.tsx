import FriendRequestContainer from "@/components/FriendRequestContainer";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

const Page = async () => {
  const user = await currentUser();

  const data = await prisma.friendRequests.findMany({
    where: {
      receiverId: user?.id,
    },
    select: {
      sender: true,
    },
  });

  // console.log(data);

  return <FriendRequestContainer data={data} />;
};

export default Page;