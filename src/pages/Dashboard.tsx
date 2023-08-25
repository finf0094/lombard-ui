import { FC } from "react";
import { userApi } from "../store/userReducer/userApi";
import { CircularProgress, Grid } from "@mui/material";

export const Dashboard: FC = () => {
  const { data: userData, isLoading: isUserDataLoading, isError: isUserGetDataError } = userApi.useGetUserInformationQuery('');

  if (isUserGetDataError) {
    return <h2>Ошибка...</h2>
  }

  return (
    <Grid>
      {isUserDataLoading ? <CircularProgress color="secondary" /> : <div>

        <h2>
          Name: {userData?.fullName}
        </h2>
        login: {userData?.username}
        Email : {userData?.email}
        role: {userData?.roles.map(role => <h2 key={role.id}>{role.name}</h2>)}
        <h2>Общая сумма выдач: {userData?.totalAmountIssued}</h2>
      </div>}

    </Grid>
  );
};