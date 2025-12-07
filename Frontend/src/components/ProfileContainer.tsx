// Frontend/src/components/ProfileContainer.tsx
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import { UserCard } from './UserCard';
import { useState, useEffect } from 'react';

const ProfileContainer = () => {
    const profile = useSelector((store: any) => store.user)

    const [user, setUser] = useState({
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        about: profile?.about || "",
        skills: Array.isArray(profile?.skills) ? profile.skills.join(", ") : (profile?.skills || ""),
        age: profile?.age || "",
        gender: profile?.gender || "",
        photoUrl: profile?.photoUrl || ""
    });

    // Sync with profile when it updates (only if profile actually changed)
    useEffect(() => {
        if (profile) {
            const newUserState = {
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                about: profile.about || "",
                skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : (profile.skills || ""),
                age: profile.age || "",
                gender: profile.gender || "",
                photoUrl: profile.photoUrl || ""
            };

            // Only update if values actually changed
            setUser((prev: any) => {
                if (
                    prev.firstName === newUserState.firstName &&
                    prev.lastName === newUserState.lastName &&
                    prev.about === newUserState.about &&
                    prev.skills === newUserState.skills &&
                    prev.age === newUserState.age &&
                    prev.gender === newUserState.gender &&
                    prev.photoUrl === newUserState.photoUrl
                ) {
                    return prev; // Return same reference if nothing changed
                }
                return newUserState;
            });
        }
    }, [profile]);

    return (
        <div className="flex justify-center items-center gap-12">
            <UserCard user={[user]} />
            <div className="h-120 w-px bg-gray-300" />
            <EditProfile user={user} setUser={setUser} />
        </div>
    );
};

export default ProfileContainer;