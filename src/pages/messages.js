/* Styles */
import styles from "../styles/Messages.module.scss";

/* Components */
import Message from "../components/Messages/Message";
import Preview from "@/components/Messages/Preview";
import ErrorView from "@/components/ErrorView";
/* react / nextjs */
import { useState } from "react";
import { useSession } from "next-auth/react"
/* external imports */
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export async function getServerSideProps() {
    const messageData = await prisma.message.findMany()
    return {
        props: { messageData: messageData },
    };
}

export default function Messages({ session, messageData }) {
    if (!session) {
        return (
          <>
            <ErrorView></ErrorView>
          </>
        )
      }
    const [messages, setMessages] = useState(messageData);
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
            <Preview />
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
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
