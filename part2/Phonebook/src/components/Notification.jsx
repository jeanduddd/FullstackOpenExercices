const Notification = ({message, success}) => {
    console.log(message, success)
    const successNotificationStyle = {
        color: 'green',
        background: 'lightgrey', 
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorNotificationStyle = {
        color: 'red',
        background: 'lightgrey', 
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    console.log(success)

    if (message === null) {
        return null
    }
    
    return (
        <div style={success? successNotificationStyle : errorNotificationStyle}>{message}</div>
    )
}

export default Notification