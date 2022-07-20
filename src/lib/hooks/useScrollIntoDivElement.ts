import { useEffect, useRef } from 'react'

export const useScrollIntoDivElement = <T, K>(
    firstDependency: T,
    secondDependency: K
) => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        if (messagesEndRef.current) {
            return messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [firstDependency, secondDependency])

    return messagesEndRef
}
