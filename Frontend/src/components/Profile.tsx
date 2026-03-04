import SEO from "./SEO";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
    const user = useSelector((store: any) => store.user);
    return (
        user && (
            <div>
                <SEO 
                    title={`${user.firstName} ${user.lastName} - Profile | DevTinder`} 
                    description={`View and edit the profile of ${user.firstName} ${user.lastName}`} 
                    url="https://devstinderr.site/profile"
                />
                <EditProfile user={user} />
            </div>
        )
    );
};
export default Profile;