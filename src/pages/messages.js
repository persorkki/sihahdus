import { use, useState } from "react";
import styles from "../styles/Messages.module.scss";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getServerSideProps() {
    const messageData = await prisma.message.findMany()
    return {
        props: { messageData: messageData },
        //TODO: maybe use getStaticProps for this? revalidate on create/destroy?
        //revalidate: 10
    };
}

export default function Messages({ messageData }) {

    function saveMessage(id, text, remoteFilepath, isOnline) {
        /*TODO: save to DB here*/
        console.log(id, text, remoteFilepath, isOnline);
    }

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>URL</th>
                            <th>Online</th>
                            <th>Offline</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            messageData.map((e) => {
                                return (
                                    <Message
                                        key={e.id}
                                        id={e.id}
                                        text={e.text}
                                        remoteFilepath={e.remoteFilepath}
                                        isOnline={e.isOnline}
                                        saveHandler={saveMessage}/>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

function Message({ id, text, remoteFilepath, isOnline, saveHandler }) {
    console.log(isOnline);
    const [onlineStatus, setOnlineStatus] = useState(isOnline);
    const [message, setMessage] = useState(text);
    const [url, setURL] = useState(remoteFilepath);
    const onSave = (e) => {
        saveHandler(id, message, url, onlineStatus)
    }

    const onMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const onURLChange = (e) => {
        setURL(e.target.value);
    }

    const onRadioChange = (e) => {
        setOnlineStatus(e.target.value === "online")
    }
    return (
        <tr>

            <td>
                <input type="text" value={message} onChange={onMessageChange} />
            </td>
            <td>
                <input type="url" value={url} onChange={onURLChange} />
            </td>
            <td><input type="radio" name={`status__${id}`} value="online" checked={onlineStatus} onChange={onRadioChange} /></td>
            <td><input type="radio" name={`status__${id}`} value="offline" checked={!onlineStatus} onChange={onRadioChange} /></td>

            { /*TODO: maybe add a button to "unlock" a message object first, then show the "save" button instead. */}
            <td><button onClick={onSave}>save</button></td>
        </tr>
    )
}



{/* 
                <form>
                    <div className={styles.innerContainer}>
                        <div className={styles.block}>
                            <label htmlFor="text">message: </label>
                            <input id="text" type="text" required />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="url">image URL </label>
                            <input id="url" type="url" required />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="online">online</label>
                            <input name="onoff" id="online" type="radio" required />
                        </div>
                        <div className={styles.block}>
                            <label htmlFor="online">online</label>
                            <input name="onoff" id="online" type="radio" />
                        </div>
                        <div className={styles.block}>
                            <button className={styles.submitButton} type="submit">submit</button>
                        </div>
                    </div>
                </form>
                */ }
