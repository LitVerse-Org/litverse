import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    faHome,
    faBell,
    faBookmark,
    faCog,
    faPen,
    faUser,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import SettingsModal from './SettingsModal';

const Sidebar = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const router = useRouter();

    const toggleSettingsModal = () => {
        setIsSettingsModalOpen(!isSettingsModalOpen);
    };

    return (
        <div className="w-1/4 min-h-screen bg-black text-white fixed flex flex-col items-center">
            <Link href="/home">
                    <img src="/white_logo_dark_background.png" alt="LITVERSE" className="w-50 mt-6 mb-4 cursor-pointer"/>
            </Link>
            <div className="flex items-center justify-center p-6 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={() => router.push('/home')}>
                <FontAwesomeIcon icon={faHome} className="text-2xl" />
                <span className="ml-2">Home</span>
            </div>
            <div className="flex items-center justify-center p-6 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={() => router.push('/notifications')}>
                <FontAwesomeIcon icon={faBell} className="text-2xl" />
                <span className="ml-2">Notifications</span>
            </div>
            <div className="flex items-center justify-center p-6 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={() => router.push('/profile')}>
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
                <span className="ml-2">Profile</span>
            </div>
            <div className="flex items-center justify-center p-6 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={() => router.push('/messages')}>
                <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
                <span className="ml-2">Messages</span>
            </div>
            <div className="flex items-center justify-center p-6 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={() => router.push('/bookmarks')}>
                <FontAwesomeIcon icon={faBookmark} className="text-2xl" />
                <span className="ml-2">Bookmarks</span>
            </div>
            <div className="flex items-center justify-center p-6 cursor-pointer text-xl hover:bg-gray-700 w-full" onClick={toggleSettingsModal}>
                <FontAwesomeIcon icon={faCog} className="text-2xl" />
                <span className="ml-2">Settings</span>
            </div>
            <div className="flex items-center justify-center p-6 cursor-pointer text-xl hover:bg-gray-700 w-full mt-auto">
                <button className="bg-green-500 text-white p-4 rounded-full transition hover:bg-green-700" onClick={() => router.push('/createPost')}>
                    <FontAwesomeIcon icon={faPen} className="text-2xl" />
                </button>
            </div>
            <SettingsModal
                show={isSettingsModalOpen}
                onClose={toggleSettingsModal}
            />
        </div>
    );
};

export default Sidebar;






// import React, { useState } from 'react';
// import styles from './sidebar.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useRouter } from 'next/router';
// import {
//     faHome,
//     faBell,
//     faBookmark,
//     faCog,
//     faPen,
//     faUser,
//     faEnvelope
// } from '@fortawesome/free-solid-svg-icons';
// import SettingsModal from './SettingsModal';
// import Link from 'next/link';
//
// const Sidebar = () => {
//     const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
//     const router = useRouter();
//
//     const toggleSettingsModal = () => {
//         setIsSettingsModalOpen(!isSettingsModalOpen);
//     };
//
//     return (
//         <div className={styles.sidebarContainer}>
//             <div className={styles.sidebarItem} onClick={() => router.push('/home')}>
//                 <FontAwesomeIcon icon={faHome} />
//                 <span>Home</span>
//             </div>
//             <div className={styles.sidebarItem} onClick={() => router.push('/notifications')}>
//                 <FontAwesomeIcon icon={faBell} />
//                 <span>Notifications</span>
//             </div>
//             <div className={styles.sidebarItem} onClick={() => router.push('/profile')}>
//                 <FontAwesomeIcon icon={faUser} />
//                 <span>Profile</span>
//             </div>
//             <div className={styles.sidebarItem} onClick={() => router.push('/messages')}>
//                 <FontAwesomeIcon icon={faEnvelope} />
//                 <span>Messages</span>
//             </div>
//             <div className={styles.sidebarItem} onClick={() => router.push('/bookmarks')}>
//                 <FontAwesomeIcon icon={faBookmark} />
//                 <span>Bookmarks</span>
//             </div>
//             <div className={styles.sidebarItem} onClick={toggleSettingsModal}>
//                 <FontAwesomeIcon icon={faCog} />
//                 <span>Settings</span>
//             </div>
//             <div className={styles.sidebarItem}>
//                 <button className={styles.composeButton} onClick={() => router.push('/createPost')}>
//                     <FontAwesomeIcon icon={faPen} />
//                 </button>
//             </div>
//             <SettingsModal
//                 show={isSettingsModalOpen}
//                 onClose={toggleSettingsModal}
//             />
//         </div>
//     );
// };
//
// export default Sidebar;
