import { logger } from "../utils/index.mjs"

function Feedback({ message, level, onAcceptClick }) {
    logger[level](message)
    return <div className="fixed top-0 flex flex-col items-center p-[12px]${level === 'error' ? 'bg-red-500' : level === 'warn' ? 'bg-yellow-500' : 'bg-green-500'} rounded-lg mt-12">
        <h3>{message}</h3>
        <button onClick={onAcceptClick}>accept</button>
    </div>
}

export default Feedback