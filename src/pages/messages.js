/* Styles */
import styles from "../styles/Messages.module.scss";

/* Components */
import Message from "../components/Messages/Message";
import ErrorView from "../components/ErrorView";

/* helper etc */
import prisma from "../lib/prisma"

/* react / nextjs */
import { useState, useMemo } from "react";
import { useSession } from "next-auth/react"

export async function getServerSideProps() {
    const messageData = await prisma.message.findMany()
    return {
        props: { messageData: messageData },
    };
}

export default function Loader({ messageData }) {
    const { data: session } = useSession()
    if (!session) {
        return (
            <>
                <ErrorView></ErrorView>
            </>
        )
    }
    return <Messages messageData={messageData} />
}

function compareURLs(a, b) {
    if (a.remoteFilepath < b.remoteFilepath) {
        return -1;
    }
    if (a.remoteFilepath > b.remoteFilepath) {
        return 1;
    }
    return 0;
}

function Messages({ messageData }) {
    const [messages, setMessages] = useState(messageData);
    const sorted = useMemo(() => [...messages].sort((a, b) => compareURLs(a, b)), [messages])

    const updateList = async() => {
        const res = await fetch("/api/message", {
            method: "GET",
        })
        const data = await res.json();
        if (Array.isArray(data.data))
        {
            setMessages(data.data);
            return;
        }
        throw new Error('Error: updated data is not valid');
    }

    async function updateMessage(id, text, remoteFilepath, isOnline) {
        const messageObject = {
            id,
            text,
            remoteFilepath,
            isOnline
        }
        const result = await fetch('/api/message', {
            method: "PUT",
            headers: { headers: { "Content-Type": "application/json" } },
            body: JSON.stringify(messageObject)
        })

        if (result.ok) {
            updateList();
        }
    }

    async function createMessage(text, remoteFilepath, isOnline) {
        const messageObject = {
            text,
            remoteFilepath,
            isOnline
        }
        const result = await fetch('/api/message', {
            method: "POST",
            headers: { headers: { "Content-Type": "application/json" } },
            body: JSON.stringify(messageObject)
        })

        if (result.ok) {
            updateList();
        }
    }

    async function deleteMessage(id) {
        const messageObject = {
            id,
        }
        const result = await fetch('/api/message', {
            method: "DELETE",
            headers: { headers: { "Content-Type": "application/json" } },
            body: JSON.stringify(messageObject)
        })

        if (result.ok) {
            updateList();
        }
    }
    return (
        <>
            <table className={styles.messageTable}>
                <thead>
                    <tr className={styles.newMessage}>
                        <th>message</th>
                        <th>URL</th>
                        <th>on</th>
                        <th>off</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >
                    <Message
                        /* isCreateNewInput, id, text, remoteFilepath, isOnline, createHandler, deleteHandler, updateHandler, className */
                        /* the first input thats only used to create a new item */
                        isCreateNewInput={true}
                        className={styles.newMessage}
                        key={0}
                        id={0}
                        text=""
                        remoteFilepath=""
                        isOnline={false}

                        createHandler={createMessage}  
                    />
                    {

                        //messages.slice(0).reverse().map((e) => {
                        
                        sorted
                            .map((e) => {
                            return (
                                <Message
                                    /* normal message that can be edited etc */
                                    isCreateNewInput={false}
                                    className={styles.message}
                                    key={e.id}
                                    id={e.id}
                                    text={e.text}
                                    remoteFilepath={e.remoteFilepath}
                                    isOnline={e.isOnline}
                                    updateHandler={updateMessage}
                                    deleteHandler={deleteMessage}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
