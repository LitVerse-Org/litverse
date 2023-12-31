import React, { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import ViewProfile from '@/components/ViewProfile/View-Profile';

export default function Profile() {
    const { data: session } = useSession();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (session?.token?.sub) {
            setUserId(session.token.sub);
        }
        console.log('Session token in profile.js:', userId);
    }, [session]);

    return (
        <Layout>
            <div className="container mx-auto px-4">
                {userId && <ViewProfile userId={userId} />}
            </div>
        </Layout>
    );
}
