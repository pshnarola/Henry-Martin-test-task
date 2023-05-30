import { Dispatch } from "redux"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { removeContact, viewContact } from '../../store/contacts/actions';

const Contact = (): JSX.Element => {

    const { contactList } = useSelector((state: any) => state?.contacts);

    const dispatch: Dispatch<any> = useDispatch();

    const navigate = useNavigate();

    const handleEdit = (data: IContact) => {
        navigate('/manage-contact', { state: data })
    }

    const handleView = (contact: IContact) => {
        dispatch(viewContact(contact));
        navigate('/details')
    }

    return (
        <div>
            <div className='flex justify-between border-b-2'>
                <h1 className="text-2xl font-semibold">Contacts</h1>
                <button type="button" onClick={() => navigate("/manage-contact")} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add New</button>
            </div>
            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs  text-white uppercase bg-gray-50 bg-gray-800 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {contactList?.length > 0 ? contactList?.map((contact: IContact, index: number) => (
                                <tr key={contact?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">{contact?.firstName}</td>
                                    <td className="px-6 py-4">{contact?.lastName}</td>
                                    <td className="px-6 py-4 uppercase">{contact?.status}</td>
                                    <td className="flex justify-start px-6 py-4">
                                        <FiEye size="18" className="me-2 cursor-pointer" onClick={() => handleView(contact)} />{' '}
                                        <FiEdit size="18" className="me-2 cursor-pointer" onClick={() => handleEdit(contact)} />{' '}
                                        <FiTrash2 size="18" className="cursor-pointer" onClick={() => dispatch(removeContact(index))} />
                                    </td>
                                </tr>
                            )) :
                                <tr>
                                    <td colSpan={5}><p className="mt-10 text-xl text-center font-semibold">No Contacts Found !</p></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Contact