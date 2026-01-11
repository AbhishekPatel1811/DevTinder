import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { axiosInstance } from "@/lib/api"
import { addUser } from "@/utils/userSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { UserCard } from "./UserCard"

const EditProfile = ({ user }: { user: any }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [skills, setSkills] = useState(user.skills || []);
    const [errors, setErrors] = useState("");
    const dispatch = useDispatch();

    const onSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrors("");
        try {

            const res = await axiosInstance.patch("/profile/edit", {
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
                skills,
            })

            dispatch(addUser(res?.data?.data));
            toast.success(res?.data?.message || "Profile updated successfully!!");
        }
        catch (error: any) {
            console.error("Profile update error", error)
            setErrors(error.response?.data?.message || error.response?.data || "Profile update failed!!");
        }
    };

    return (
        <div className="flex justify-center items-center h-full gap-12">
            {/* Edit profile form */}
            <div className="flex flex-col items-center gap-8">
                <Card className="w-full md:w-[500px]">
                    <CardContent>
                        <form onSubmit={onSaveProfile} className="space-y-8">
                            <div className="gap-6 grid grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="Enter your First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Enter your Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="skills">Skills</Label>
                                    <Input
                                        id="skills"
                                        type="text"
                                        placeholder="List your skills (React, Node)"
                                        value={skills.join(",")}
                                        onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        placeholder="Enter your age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select value={gender} onValueChange={setGender}>
                                        <SelectTrigger
                                            id="gender"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Select your gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="others">Others</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="photoUrl">Photo URL</Label>
                                    <Input
                                        id="photoUrl"
                                        type="url"
                                        placeholder="Enter your photo URL"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="about">About</Label>
                                <Textarea
                                    id="about"
                                    placeholder="Write something about yourself"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Update Profile
                            </Button>
                            {errors && <p className="mt-1 text-sm text-red-500">{errors}</p>}
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="h-130 w-px bg-gray-300" />

            <UserCard
                user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
                showButtons={false}
            />
        </div>
    )
}

export default EditProfile