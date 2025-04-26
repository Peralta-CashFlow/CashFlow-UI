import { useUserStore } from "../../stores/user/UserStore";

const Home: React.FC = () => {

    const user = useUserStore.getState().user;

    return (
        <h1>{'Welcome ' + user.firstName + ' ' + user.lastName}</h1>
    )
}

export default Home;