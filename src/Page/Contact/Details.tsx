import { useSelector } from 'react-redux';

const Details = (): JSX.Element => {
    const { contactDetails } = useSelector((state: any) => state?.contacts);
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-2">Contact Details</h1>
            <div className="p-4 text-justify bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <p><b>First Name :</b> {contactDetails?.firstName} </p>
                <p><b>Last Name :</b> {contactDetails?.lastName} </p>
                <p><b>Status :</b> <span className="uppercase">{contactDetails?.status}</span> </p>
            </div>
        </div>
    )
}

export default Details