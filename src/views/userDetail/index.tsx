import MainLayout from "../../layouts/main/MainLayout";
import { useParams } from "react-router-dom";
import { mockUsers } from "../../mocks/userTableData";

const UserDetail = () => {
  const { id } = useParams();
  const user = mockUsers.find((u) => u.id === id);

  if (!user) return <div>User not found</div>;

  return (
    <MainLayout>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </MainLayout>
  );
};

export default UserDetail;
