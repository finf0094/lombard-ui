import { FC } from "react";
import { userApi } from "../store/userReducer/userApi";

export const Dashboard: FC = () => {
  const {data: userData, isLoading: isUserDataLoading, isError: isUserGetDataError} = userApi.useGetUserInformationQuery('');
  
  if(isUserGetDataError) {
    return <h2>Ошибка...</h2>
  }

  return (
    <div>
      {isUserDataLoading ? "..." : <div>
          Name: {userData?.username}
          Email : {userData?.email}
          role: {userData?.roles.map(role => <h2 key={role.id}>{role.name}</h2>)}
        </div>}

    </div> 
  );
};