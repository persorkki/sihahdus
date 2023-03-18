import { useState } from "react";

export default function Message({ id, text, remoteFilepath, isOnline, saveHandler, deleteHandler, className }) {


    const [onlineStatus, setOnlineStatus] = useState(isOnline);
    const [message, setMessage] = useState(text);
    const [url, setURL] = useState(remoteFilepath);
    const [isDisabled, setIsDisabled] = useState(id == 0 ? false : true);

    const clearFields = () => {
        setMessage("");
        setURL("");
        setOnlineStatus(false);
    }

    const onSave = (e) => {
        id == 0 ? "" :setIsDisabled(true)
        saveHandler(id, message, url, onlineStatus)
        if (!deleteHandler) {
            clearFields();
        }

    }
    const onDelete = (e) => {
        deleteHandler(id, message, url, onlineStatus)
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
        <tr className={className}>
            <td>
                <input type="text" disabled={isDisabled} value={message} onChange={onMessageChange} />
            </td>
            <td>
                <input type="url" disabled={isDisabled} value={url} onChange={onURLChange} />
            </td>
            <td><input type="radio" disabled={isDisabled} name={`status__${id}`} value="online" checked={onlineStatus} onChange={onRadioChange} /></td>
            <td><input type="radio" disabled={isDisabled} name={`status__${id}`} value="offline" checked={!onlineStatus} onChange={onRadioChange} /></td>

            { /*TODO: maybe add a button to "unlock" a message object first, then show the "save" button instead. */}
            <td>
                {

                    isDisabled ?
                        <button onClick={() => setIsDisabled(false)}>unlock</button> :
                        <button onClick={onSave}>{id == 0 ? "create" : "save"}</button>

                }
                { /*<button onClick={onSave}>{deleteHandler ? "save" : "add"}</button> */}
            </td>
            
            <td>
                {
                    id == 0 ?
                    <button style={{ visibility: "hidden" }} >delete</button>:
                    <button style={isDisabled ? { visibility: "hidden" } : { visibility: "visible" }} onClick={onDelete}>delete</button>
                }
                 
            </td>
        </tr>
    )
}