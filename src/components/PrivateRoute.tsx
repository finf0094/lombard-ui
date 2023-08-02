import { useAppSelector } from '../hooks/hooks'
import { RootState } from '../store/store'
import LoadingToRedirect from './LoadingToRedirect';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const {token} = useAppSelector((state: RootState) => state.auth)


    return token ? children : <LoadingToRedirect />
}

export default PrivateRoute