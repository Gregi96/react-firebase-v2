import { useEffect } from 'react'

type UseScrollDownMessageProps = {
    messages: Array<any>,
    receiverIsTyping: boolean,
    messagesEndRef: any
}

export const useScrollDownMessage = ({
    messages,
    receiverIsTyping,
    messagesEndRef
} : UseScrollDownMessageProps) => {
    useEffect(() => {
        if (messagesEndRef.current) {
            return messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, receiverIsTyping])
}
