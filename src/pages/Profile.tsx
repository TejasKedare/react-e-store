import { Navigate } from "react-router-dom";
import { getAuthUser } from "../utils/localAuth";

const Profile = () => {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="mb-6">My Profile</h1>

      <div className="card space-y-4">
        <div>
          <label className="text-sm text-textMuted">Username</label>
          <p className="font-medium">{user.username}</p>
        </div>

        <div>
          <label className="text-sm text-textMuted">Email</label>
          <p className="font-medium">{user.email}</p>
        </div>

        <div>
          <label className="text-sm text-textMuted">Account Status</label>
          <p className="font-medium text-accent">Active</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
