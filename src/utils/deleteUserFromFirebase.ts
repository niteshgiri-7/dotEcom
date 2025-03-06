import { deleteUser, User } from "firebase/auth";

const deleteUserFromFireBase = async (user: User|null) => {
  if (user) {
    try {
      await deleteUser(user);
      console.log("user deleted due to backend error");
    } catch (error) {
      console.log(error);
    }
  } else
    console.log("no user detected,while calling deleteUser from firebase.");
};

export default deleteUserFromFireBase;
