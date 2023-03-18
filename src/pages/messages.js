/* Styles */
import styles from "../styles/Messages.module.scss";

/* Components */
import Message from "../components/Messages/Message";
import ErrorView from "../components/ErrorView";
/* react / nextjs */
import { useState } from "react";
import { useSession } from "next-auth/react"
import Image from "next/image";
/* external imports */
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export async function getServerSideProps() {
    const messageData = await prisma.message.findMany()
    return {
        props: { messageData: messageData },
    };
}
// TODO: other protected pages should probably follow this style
export default function Loader({messageData}) {
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
function Messages({ messageData }) {

    const [messages, setMessages] = useState(messageData);
    /* TODO: combine into an object? */
    const [previewState, setPreviewState] = useState({
        show: false,
        url: null,
    })
    const previewStateHandler = (show, url) => {
        if (show && url != null && url != "") {
            setPreviewState({ show: show, url: url })
            return;
        }
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
            setMessages(messages.map(x => x.id == id ? messageObject : x))
        }
    }

    async function saveMessage(id, text, remoteFilepath, isOnline) {
        /* actually creates a new message */
        const messageObject = {
            id: messages.length + 1,
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
            setMessages([...messages, messageObject])
        }
    }

    async function deleteMessage(id, text, remoteFilepath, isOnline) {
        if (id == 0) return;

        const messageObject = {
            id,
            text,
            remoteFilepath,
            isOnline
        }
        const result = await fetch('/api/message', {
            method: "DELETE",
            headers: { headers: { "Content-Type": "application/json" } },
            body: JSON.stringify(messageObject)
        })

        if (result.ok) {
            setMessages(messages.filter(x => x.id != id))
        }
    }

    return (

        <>
            {/*
            TODO:: this is a temporary solution 
            FIXME: hovering over input while it has some text but not a valid url breaks the whole mouseover thing
            FIXME: mouseleave doesn't work (look at previewStateHandler conditions)
            */}
            {previewState.show && <Image className={styles.preview} src={previewState.url} alt="preview image" width={100} height={100} />}
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
                        className={styles.newMessage}
                        key={0}
                        id={0}
                        text=""
                        remoteFilepath=""
                        isOnline={false}
                        saveHandler={saveMessage}
                        previewStateHandler={previewStateHandler}
                    />
                    {
                        messages.slice(0).reverse().map((e) => {
                            return (
                                <Message
                                    className={styles.message}
                                    key={e.id}
                                    id={e.id}
                                    text={e.text}
                                    remoteFilepath={e.remoteFilepath}
                                    isOnline={e.isOnline}
                                    saveHandler={updateMessage}
                                    deleteHandler={deleteMessage}
                                    previewStateHandler={previewStateHandler}

                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    )
}