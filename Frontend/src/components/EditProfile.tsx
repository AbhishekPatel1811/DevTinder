import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { axiosInstance } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { useEffect } from "react"

const editProfileSchema = z.object({
    firstName: z.string().min(3, "First Name must be at least 3 characters long"),
    lastName: z.string().min(3, "Last Name must be at least 3 characters long"),
    about: z.string().min(10, "About must be at least 10 characters long"),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    age: z.number().min(18, "Age must be at least 18"),
    gender: z.enum(["male", "female", "others"]),
    photoUrl: z.url("Invalid photo URL"),
}).refine((data) => data.age >= 18, {
    message: "Age must be at least 18",
    path: ["age"],
}).refine((data) => data.photoUrl.length > 0, {
    message: "Photo URL is required",
    path: ["photoUrl"],
}).refine((data) => data.skills.length <= 10, {
    message: "At most 10 skills are allowed",
    path: ["skills"],
})

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const EditProfile = ({ user, setUser }: { user: any, setUser: any }) => {

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        watch,
        control
    } = useForm<EditProfileFormData>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            about: user?.about || "",
            skills: Array.isArray(user?.skills) ? user.skills : (user?.skills ? user.skills.split(",").map((s: string) => s.trim()) : []),
            age: user?.age ? Number(user.age) : undefined,
            gender: user?.gender || undefined,
            photoUrl: user?.photoUrl || ""
        }
    })

    // Watch individual form values for live preview (prevents infinite loop)
    const firstName = watch("firstName")
    const lastName = watch("lastName")
    const about = watch("about")
    const skills = watch("skills")
    const age = watch("age")
    const gender = watch("gender")
    const photoUrl = watch("photoUrl")

    // Sync form values with parent state for live preview
    useEffect(() => {
        const skillsString = Array.isArray(skills)
            ? skills.join(", ")
            : (typeof skills === "string" ? skills : "");

        const newUserState = {
            firstName: firstName || "",
            lastName: lastName || "",
            about: about || "",
            skills: skillsString,
            age: age?.toString() || "",
            gender: gender || "",
            photoUrl: photoUrl || ""
        }

        // Only update if values actually changed to prevent infinite loop
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
                return prev // Return same reference if nothing changed
            }
            return newUserState
        })
    }, [firstName, lastName, about, skills, age, gender, photoUrl])

    const onSubmit = async (data: EditProfileFormData) => {
        try {
            console.log("data ----", data)

            const res = await axiosInstance.patch("/profile/edit", {
                firstName: data.firstName,
                lastName: data.lastName,
                about: data.about,
                skills: data.skills,
                age: data.age,
                gender: data.gender,
                photoUrl: data.photoUrl
            })

            const updatedUser = res.data;
            console.log("user ----", updatedUser)
            if (res.status === 200) {
                toast.success("Profile updated successfully!!");
            }
        }
        catch (error: any) {
            console.error("Profile update error", error)
            toast.error(error.response?.data?.message || error.response?.data || "Profile update failed!!");
        }
    };


    return (
        <div className="flex justify-center items-center h-full">
            {/* Edit profile form */}
            <div className="flex flex-col items-center gap-8">
                <Card className="w-full md:w-[500px]">
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="gap-6 grid grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="Enter your First Name"
                                        {...register("firstName")}
                                        aria-invalid={errors.firstName ? "true" : "false"}
                                    />
                                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Enter your Last Name"
                                        {...register("lastName")}
                                        aria-invalid={errors.lastName ? "true" : "false"}
                                    />
                                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="skills">Skills</Label>
                                    <Controller
                                        name="skills"
                                        control={control}
                                        render={({ field }) => {
                                            const skillsString = Array.isArray(field.value)
                                                ? field.value.join(", ")
                                                : (typeof field.value === "string" ? field.value : "");
                                            return (
                                                <Input
                                                    id="skills"
                                                    type="text"
                                                    placeholder="List your skills (React, Node)"
                                                    value={skillsString}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        const skillsArray = value.split(",").map(s => s.trim()).filter(s => s.length > 0);
                                                        field.onChange(skillsArray);
                                                    }}
                                                    aria-invalid={errors.skills ? "true" : "false"}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.skills && <p className="mt-1 text-sm text-red-500">{errors.skills.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Controller
                                        name="age"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="age"
                                                type="number"
                                                placeholder="Enter your age"
                                                value={field.value || ""}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === "") {
                                                        field.onChange(undefined);
                                                    } else {
                                                        const numValue = Number(value);
                                                        if (!isNaN(numValue)) {
                                                            field.onChange(numValue);
                                                        }
                                                    }
                                                }}
                                                aria-invalid={errors.age ? "true" : "false"}
                                            />
                                        )}
                                    />
                                    {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger
                                                    id="gender"
                                                    aria-invalid={errors.gender ? "true" : "false"}
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
                                        )}
                                    />
                                    {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="photoUrl">Photo URL</Label>
                                    <Input
                                        id="photoUrl"
                                        type="url"
                                        placeholder="Enter your photo URL"
                                        {...register("photoUrl")}
                                        aria-invalid={errors.photoUrl ? "true" : "false"}
                                    />
                                    {errors.photoUrl && <p className="mt-1 text-sm text-red-500">{errors.photoUrl.message}</p>}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="about">About</Label>
                                <Textarea
                                    id="about"
                                    placeholder="Write something about yourself"
                                    {...register("about")}
                                    aria-invalid={errors.about ? "true" : "false"}
                                    rows={4}
                                />
                                {errors.about && <p className="mt-1 text-sm text-red-500">{errors.about.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Updating profile..." : "Update Profile"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default EditProfile