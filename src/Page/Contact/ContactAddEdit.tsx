import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { addNewContact, updateContact } from "../../store/contacts/actions";


const ContactAddEdit = (): JSX.Element => {

    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode: boolean = location?.state ? true : false;

    const contactSchema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        status: yup.string().required("Status is required"),
    });

    type FormData = yup.InferType<typeof contactSchema>;

    const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({
        mode: "all",
        resolver: yupResolver(contactSchema)
    });

    const onSubmit = (data: FormData) => {

        if (!isEditMode) {
            dispatch(addNewContact(data));
        } else {
            dispatch(updateContact(data));
        }

        navigate('/contact')
        reset();
    }

    useEffect(() => {
        if (isEditMode) {
            Object.entries(location?.state)?.forEach((item: any) => {
                const [key, value] = item;
                setValue(key, value);
            })
        }
    }, [location?.state])

    return (
        <React.Fragment>
            <div className='flex justify-between border-b-2'>
                <h1 className="text-2xl font-semibold mb-2">{isEditMode ? 'Edit Contact' : 'Add Contact'}</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        First Name
                    </label>
                    <input type="text" placeholder="First Name" {...register("firstName")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <p className="text-red-500 text-xs italic">{errors?.firstName?.message}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Last Name
                    </label>
                    <input type="text" placeholder="Last Name" {...register("lastName")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <p className="text-red-500 text-xs italic">{errors?.lastName?.message}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Status
                    </label>
                    <input id="active" type="radio" value={'active'} {...register("status")} className="" /> Active {' '}
                    <input id="inactive" type="radio" value={'in-active'} {...register("status")} className="" />In-Active
                    <p className="text-red-500 text-xs italic">{errors?.status?.message}</p>
                </div>
                <div className="flex items-center justify-end">
                    <button className="bg-black text-white me-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type='button' onClick={() => navigate("/contact")}>
                        Back
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {isEditMode ? 'Update' : 'Add'}
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ContactAddEdit;