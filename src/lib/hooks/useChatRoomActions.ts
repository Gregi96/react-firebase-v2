import { useEffect, useRef, useState } from 'react'
import { auth } from 'firebase'
import { MessageResponse, UserResponseModel } from 'lib/types'
import { useUserMessages } from './useUserMessages'
import { useIsTyping } from './useIsTyping'

export const useChatRoomActions = () => {
    const [isGeneralChannel, setIsGeneralChannel] = useState(true)
    const [selectedUser, setSelectedUser] = useState<UserResponseModel>()
    const [messages, setMessages] = useState<Array<MessageResponse>>([])
    const { getMessages, getGeneralMessages } = useUserMessages(setMessages)
    const { setStartTypingMode, setStopTypingMode, getSecondUserTypingMode, receiverIsTyping } = useIsTyping()
    const isFirstRender = useRef(true)
    const [messageText, setMessageText] = useState('')

    const setGeneralChannel = () => {
        setIsGeneralChannel(true)
        setSelectedUser(undefined)
    }
    const setPrivateChannel = (user: UserResponseModel) => {
        setIsGeneralChannel(false)
        setSelectedUser(user)

        if (auth.currentUser?.uid && user.uid) {
            getMessages({
                firstUserUid: auth.currentUser.uid,
                secondUserUid: user.uid
            })
            getSecondUserTypingMode({
                firstUser: auth.currentUser.uid,
                secondUser: user.uid
            })
        }
    }

    useEffect(() => {
        if (!isFirstRender.current && auth.currentUser?.uid && selectedUser?.uid) {
            setStartTypingMode({
                firstUser: auth.currentUser.uid,
                secondUser: selectedUser.uid
            })
        }

        const stopTyping = setTimeout(() => {
            if (auth.currentUser?.uid && selectedUser?.uid) {
                setStopTypingMode({
                    firstUser: auth.currentUser.uid,
                    secondUser: selectedUser.uid
                })
            }
        }, 800)

        return () => clearTimeout(stopTyping)
    }, [messageText])
    useEffect(() => {
        isFirstRender.current = false
    }, [])
    useEffect(() => {
        if (!selectedUser) {
            getGeneralMessages()
        }
    }, [isGeneralChannel])

    return {
        setGeneralChannel,
        setIsGeneralChannel,
        setPrivateChannel,
        isGeneralChannel,
        selectedUser,
        messages,
        receiverIsTyping,
        setMessageText,
        messageText
    }
}
