import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import UserCard from "../cards/UserCard";

const RightSideBar = async () => {
  const user = await currentUser();
  const result = await fetchUsers({
    userId: user?.id || '',
    searchString: "",
    pageNumber: 1,
    pageSize: 25
  });
  console.log(result.users)
  return (
    <section className="cusrom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1 mb-8">
          Suggested Users
        </h3>
        {result?.users?.map((person) => (
          <UserCard
            key={person.id}
            id={person.id || ''}
            name={person.name}
            username={person.username}
            imgUrl={person.image}
            personType="User"
            isSmall={true}
          />
        ))}
      </div>
    </section>
  );
};

export default RightSideBar;
