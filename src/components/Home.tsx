import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getUnixTime } from 'date-fns'
import { auth } from 'firebase'
import { useAllRegisteredUsers, useIsTyping, useSendMessage, useUserMessages } from 'lib/hooks'
import { MessageResponse, UserResponseModel } from 'lib/types'
import { User } from './User'
import { Message } from './Message'
import { InputText } from './InputText'
import { LoaderDots } from './LoaderDots'

export const Home: React.FunctionComponent = () => {
    const { users } = useAllRegisteredUsers()
    const [selectedUser, setSelectedUser] = useState<UserResponseModel>()
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState<Array<MessageResponse>>([])
    const { sendMessage: sendMessageAction, isLoading } = useSendMessage()
    const { getMessages } = useUserMessages(setMessages)
    const { setStartTypingMode, setStopTypingMode, getSecondUserTypingMode, receiverIsTyping } = useIsTyping()
    const isFirstRender = useRef(true)
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const sendMessage = () => {
        if (messageText && auth.currentUser?.uid && selectedUser?.uid) {
            sendMessageAction({
                message: messageText,
                firstUserUid: auth.currentUser.uid,
                secondUserUid: selectedUser.uid
            })
                .catch(() => console.log('Error in send message'))
                .finally(() => setMessageText(''))
        }
    }

    const onSelectedUser = (user: UserResponseModel) => {
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
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <HomeContainer>
            <UserAccountContainer>
                {users?.map(user => (
                    <User
                        key={user.uid}
                        user={user}
                        onClick={onSelectedUser}
                    />
                ))}
            </UserAccountContainer>
            <MessagesContainer>
                <div>
                    <Heading>
                        {selectedUser ? (
                            <h1>
                                Start talking with {selectedUser.name}
                            </h1>
                        ) : (
                            <h1>
                                Select user to start typing
                            </h1>
                        )}
                    </Heading>
                    <MessagesList>
                        {messages?.map((message, index) => {
                            const date = message.createdAt.toDate()

                            return (
                                <Message
                                    key={`${getUnixTime(date)}`}
                                    message={message}
                                />
                            )
                        })}
                        {receiverIsTyping && (
                            <LoaderContainer>
                                <LoaderDots/>
                            </LoaderContainer>
                        )}
                        <div ref={messagesEndRef}/>
                    </MessagesList>
                </div>
                {selectedUser && (
                    <InputText
                        isLoading={isLoading}
                        value={messageText}
                        onChange={setMessageText}
                        onClick={sendMessage}
                    />
                )}
            </MessagesContainer>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    height: calc(100% - 60px);
    display: flex;
`

const UserAccountContainer = styled.div`
    width: 20%;
    padding: 20px 15px;
    background-color: ${({ theme }) => theme.colors.lightGray};
`

const MessagesContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;
    overflow-y: auto;
`

const MessagesList = styled.div`
    display: flex;
    flex-direction: column;
`

const Heading = styled.div`
    position: sticky;
    top: 0;
    font-size: 20px;
    text-align: center;
    color: ${({ theme }) => theme.colors.brown};
    margin-bottom: 20px;
`

const LoaderContainer = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    height: 50px;
`
