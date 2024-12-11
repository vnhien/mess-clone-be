import { UserModel } from "../../model";
import { hashString } from "../../utils";
import { uuid as v4 } from "uuidv4";

export async function generateUser(userNum: number) {
  const userArr = [...Array(userNum).keys()];
  return (
    await Promise.allSettled(
      userArr.map((i) => {
        return createUser({
          userName: `HuyAnCut${i}`,
          password: `huyancut`,
        });
      })
    )
  )
    .map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return undefined;
      }
    })
    .filter((i) => Boolean(i));
}

const createUser = async ({ password, userName }: { userName: string; password: string }) => {
  const hashedPassword = await hashString(String(password));
  const newUserId = v4();
  const newUser = new UserModel({
    avatar: "",
    id: newUserId,
    passwordHashed: hashedPassword,
    userName: userName,
  });
  await newUser.save();
  return { userName: userName };
};
