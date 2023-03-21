import { useState } from "react";

export default function Message({ isCreateNewInput, id, text, remoteFilepath, isOnline, createHandler, deleteHandler, updateHandler, className }) {
    const [onlineStatus, setOnlineStatus] = useState(isOnline);
    const [message, setMessage] = useState(text);
    const [url, setURL] = useState(remoteFilepath);
    const [isDisabled, setIsDisabled] = useState(isCreateNewInput ? false : true);

        
    const clearFields = () => {
        setMessage("");
        setURL("");
        setOnlineStatus(false);
    }

    const onCreate = () => {
        //saveHandler(id, message, url, onlineStatus)
        createHandler(message, url, onlineStatus)
        clearFields();
    }
    const onDelete = () => {
        deleteHandler(id, message, url, onlineStatus)
    }
    const onUpdate = () => {
        // disable the inputs after save
        setIsDisabled(true)
        updateHandler(id, message, url, onlineStatus)
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
                <input
                    type="text"
                    disabled={isDisabled}
                    value={message}
                    onChange={(onMessageChange)} />
            </td>
            <td>
                <input
                    type="url"
                    disabled={isDisabled}
                    value={url} onChange={onURLChange}
                />
            </td>
            <td><input type="radio" disabled={isDisabled} name={`status__${id}`} value="online" checked={onlineStatus} onChange={onRadioChange} /></td>
            <td><input type="radio" disabled={isDisabled} name={`status__${id}`} value="offline" checked={!onlineStatus} onChange={onRadioChange} /></td>
            <td>
                {
                    //TODO: extract these buttons into new components?
                    isCreateNewInput ?
                        <button onClick={onCreate}>create</button> :
                        isDisabled ?
                            <button onClick={() => setIsDisabled(false)}>edit</button> :
                            <button onClick={onUpdate}>save</button>
                }
            </td>
            <td>
                {
                    isCreateNewInput ?
                        <button style={{ visibility: "hidden" }}>delete</button> :
                        <button style={isDisabled ? { visibility: "hidden" } : { visibility: "visible" }} onClick={onDelete}>delete</button>
                }

            </td>
        </tr>
    )
}