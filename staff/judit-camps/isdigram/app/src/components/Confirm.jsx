function Confirm({ message }) {
    return <div className="fixed top-0 flex flex-col items-center p-[12px] bg-red-300 rounded-lg mt-12">
        <h3>{message}</h3>
        <div>
            <button onClick={onCancelClick}>cancel</button>
            <button onClick={onAcceptClick} >accept</button>
        </div>
    </div>
}

export default Confirm