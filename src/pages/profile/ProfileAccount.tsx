import { getAuthUser } from "../../utils/localAuth";

const ProfileAccount = () => {
  const user = getAuthUser();

  return (
    <>
      <h1 className="mb-6">My Account</h1>

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
    </>
  );
};

export default ProfileAccount;
