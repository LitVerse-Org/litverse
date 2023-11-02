//create boilerplate bookmarks page that imports layout and sidebar and displays all bookmarked posts

import Layout from "../components/Layout";
import { useSession, getSession, signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

const fetchBookmarkedPosts = async () => {
    const response = await fetch('/api/bookmarks/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.userId })  // Assuming `userId` is available in the session object
    });

    const data = await response.json();

    if (data.success) {
        setBookmarkedPosts(data.posts);
    } else {
        console.error("Error fetching bookmarked posts:", data.message);
    }
};


export default function Bookmarks() {
    const { data: session, status } = useSession(); // Use the useSession hook here
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();

        router.push("/login");
    };

    useEffect(() => {
        async function fetchData() {
            const fetchedSession = await getSession();
            console.log(
                "Current Session token in bookmarks.js page from `getSession()`: ",
                fetchedSession
            );
        }
        if (session) {
            fetchBookmarkedPosts();
        }
    }, [session]);

    return (
        <Layout>
            <div>
                <div>
                    <h1
                        style={{
                            color: "white",
                            fontSize: "1em",
                        }}
                    >
                        {session && (
                            <div className="ml-3 px-3 py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold"
                            >
                                {JSON.stringify(session.token.email)}'s Bookmarks
                            </div>
                        )}                    </h1>
                    <div>
                        <p>
                            {console.log("Rendering session.user:", session)}
                        </p>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 sm:px-4 sm:py-2 flex font-roboto-slab text-zinc-200 font-bold bg-darkGreen focus:bg-black rounded-full"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}    
