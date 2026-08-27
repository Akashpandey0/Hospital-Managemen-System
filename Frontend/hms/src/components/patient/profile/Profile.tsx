import { Avatar, Button, ButtonGroupSection, Divider, Modal, NumberInput, Select, Table, TagsInput, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconEdit, IconUpload } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { getPatient, updatePatient } from "../../../service/PatientProfileService";
import { formatDate } from "../../../Utility/DateUtility";
import { useForm } from "@mantine/form";
import { sucessNotification } from "../../../Utility/NotificationUtil";
import { arrayToCSV } from "../../../Utility/OtherUtilty";
import DropdownData from "../../../data/DropdownData";

const Profile = () => {
    const user = useSelector((state:any) => state.user);
    const [editMode, setEdit] = useState(false);
    const [opened, {open, close}] = useDisclosure(false);
    const [profile, setProfile] = useState<any>({});
    useEffect(() => {
        getPatient(user.profileId).then((data) => {
            setProfile({...data, allergies: data.allergies? (JSON.parse(data.allergies)):null, chronicDisease: data.chronicDisease? (JSON.parse(data.chronicDisease)):null});
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const form = useForm({
            initialValues: {
                dob: '',
                phone: '',
                address: '',
                aadharNo: '',
                bloodGroup: '',
                allergies:[],
                chronicDisease: []
            },
            validate: {
                dob: (value:any) => !value ? "Date of Birth is required" : undefined,
                phone: (value:any) => !value ? "Phone number is required" : undefined,
                address: (value:any) => !value ? "Address is required" : undefined,
                aadharNo: (value:any) => !value ? "Aadhar number is required" : undefined
            }
        });

    const handleEdit = () => {
        form.setValues({...profile, dob: profile.dob ? new Date(profile.dob) : undefined, chronicDisease: profile.chronicDisease??[], allergies: profile.allergies??[]});
        setEdit(true);
    }

    const handleSubmit = (e:any) => {
        let values = form.getValues();
        form.validate();
        if(!form.isValid()) return;
        updatePatient({...profile, ...values, allergies: values.allergies? JSON.stringify(values.allergies) : null, chronicDisease: values.chronicDisease? JSON.stringify(values.chronicDisease) : null}).then((_data) => {
            sucessNotification("Profile updated successfully");
            setProfile({...profile, ...values});
            setEdit(false);
        }).catch((err) => {
            console.log(err.response.data.errorMessage);
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
                {!editMode ? <Button onClick={handleEdit} variant="filled" leftSection={<IconEdit />}>Edit</Button>
                        : <Button onClick={handleSubmit} variant="filled" >Save</Button>}
            </div>

            <Divider my={"xl"} />
            <div>
                <div className="text-2xl font-medium text-neutral-900 mb-5">Personal Information</div>
                <Table striped stripedColor="primary.1" verticalSpacing={"md"} >
                    <Table.Tbody className="[&>tr]:!mb-3 [&_td]:!w-1/2">
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Date Of Birth</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><DateInput {...form.getInputProps('dob')} placeholder="Date of Birth"/></Table.Td>
                                      : <Table.Td className="text-lg">{formatDate(profile.dob)??'-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Phone</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><NumberInput {...form.getInputProps('phone')} placeholder="Phone Number" maxLength={10} clampBehavior="strict" hideControls/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.phone??'-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Address</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><TextInput {...form.getInputProps('address')} placeholder="Address"/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.address??'-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Aadhar Number</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><NumberInput {...form.getInputProps('aadharNo')} hideControls maxLength={12} clampBehavior="strict" placeholder="Aadhar Number"/></Table.Td>
                                      :<Table.Td className="text-lg">{profile.aadharNo??'-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Blood Group</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><Select {...form.getInputProps('bloodGroup')} data={DropdownData.bloodGroups} placeholder="Blood Group"/></Table.Td>
                                      :<Table.Td className="text-lg">{DropdownData.bloodGroup[profile.bloodGroup]??'-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Allergies</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><TagsInput {...form.getInputProps('allergies')} placeholder="Allergies"/></Table.Td>
                                      :<Table.Td className="text-lg">{arrayToCSV(profile.allergies)??'-'}</Table.Td>}
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td className="font-semibold text-lg">Chronic Disease</Table.Td>
                            {editMode ? <Table.Td className="text-lg"><TagsInput {...form.getInputProps('chronicDisease')} placeholder="Chronic Disease"/></Table.Td>
                                      :<Table.Td className="text-lg">{arrayToCSV(profile.chronicDisease)??'-'}</Table.Td>}
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </div>
            <Modal centered opened={opened} onClose={close} title={<span className="text-xl font-medium">Upload Image</span>}></Modal>
        </div>
    )
}

export default Profile;