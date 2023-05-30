import { type ReactNode } from 'react';
import Sidebar from './sidebar';
import Header from './header';


type layoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: layoutProps): JSX.Element => {

    return (
        <div>
            <Header />
            <div className='flex'>

                <Sidebar />

                <div className="p-4 w-full">
                    {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"> */}
                    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Layout; 