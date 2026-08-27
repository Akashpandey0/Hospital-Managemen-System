import { Avatar, Button, Divider, Modal, NumberInput, Select, Table, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit, IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import DropdownData from "../../../data/DropdownData";
import { formatDate } from "../../../Utility/DateUtility";
import { getDoctor, updateDoctor } from "../../../service/DoctorProfileService";
import { Form, useForm } from "@mantine/form";
import { errorNotification, sucessNotification } from "../../../Utility/NotificationUtil";

const Profile = () => {
    const user = useSelector((state:any) => state.user);
    const [editMode, setEdit] = useState(false);
    const [opened, {open, close}] = useDisclosure(false);
    const [profile, setProfile] = useState<any>(true);
    
    useEffect(() => {
        getDoctor(user.profileId).then((data) => {
            setProfile({...data});
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const form = useForm({
        initialValues: {
            dob: '',
            phone: '',
            address: '',
            licenseNo: '',
            specialization: '',
            department: '',
            totalExperience: ''
        },
        validate: {
            dob: (value:any) => !value ? "Date of Birth is required" : undefined,
            phone: (value:any) => !value ? "Phone number is required" : undefined,
            address: (value:any) => !value ? "Address is required" : undefined,
            licenseNo: (value:any) => !value ? "License number is required" : undefined
        }
    });

    const handleEdit = () => {
        form.setValues({...profile});
        setEdit(true);
    }

    const handleSubmit = (e:any) => {
        let values = form.getValues();
        form.validate();
        if(!form.isValid()) return;
        updateDoctor({...profile, ...values}).then((_data) => {
            sucessNotification("Profile updated successfully");
            setProfile({...profile, ...values});
            setEdit(false);
        }).catch((error) => {
            errorNotification(error.response.data.message);
        })

    }

    return (
        <div className="p-10">
            <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">

                    <div className="flex flex-col items-center gap-2">
                        <Avatar src="/avatar.jpg" size={"xl"} alt="it's me" />
                        {editMode &&  <Button size={"sm"}onClick={open} variant="filled" leftSection={<IconUpload />} >Upload</Button>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-3xl font-medium text-neutral-700">{user?.name || "user"}</div>
                        <div className="text-xl text-neutral-500">{user?.email || "email"}</div>
                    </div>
                </div>
                {!editMode ? <Button onClick={handleEdit} variant="filled" type="button" leftSection={<IconEdit />}>Edit</Button>
                        : <Button onClick={handleSubmit} size="lg" type="submit" variant="filled" >Save</Button>}
            </div>

            <Divider my={"xl"} />
            <div>
                <div className="text-2xl font-medium text-neutral-900 mb-5">Personal Information</div>
                <Table striped stripedColor="primary.1" verticalSpacing={"md"} >
                    <Table.Tbody className="[&>tr]:!mb-3">
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Date Of Birth</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><DateInput {...form.getInputProps('dob')} placeholder="Date of Birth"/></Table.Td>
                                      : <Table.Td className="text-lg">{formatDate(profile.dob)??"-"}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Phone</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><NumberInput {...form.getInputProps('phone')} placeholder="Phone Number" maxLength={10} clampBehavior="strict" hideControls/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.phone??"-"}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Address</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><TextInput {...form.getInputProps('address')} placeholder="Address"/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.address??"-"}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">License Number</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><NumberInput {...form.getInputProps('licenseNo')} hideControls maxLength={12} clampBehavior="strict" placeholder="License Number"/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.licenseNo??"-"}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Specialization</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><Select {...form.getInputProps('specialization')}  data={DropdownData.doctorSpecialization}placeholder="Specialization"/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.specialization??"-"}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Department</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><Select {...form.getInputProps('department')} data={DropdownData.doctorDepartment} placeholder="Department"/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.department || "-"}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Total Experience</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><NumberInput {...form.getInputProps('totalExperience')} hideControls maxLength={2} placeholder="Total Experience"/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.totalExperience??profile.experience??"0"} {(profile.totalExperience || profile.experience) ? "years" : ""}</Table.Td>}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Image</span>}></Modal>
        </div>
    )
}

export default Profile;