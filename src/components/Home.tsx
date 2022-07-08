import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getUnixTime } from 'date-fns'
import { auth } from 'firebase'
import { useAllRegisteredUsers, useIsTyping, useSendMessage, useUserMessages } from 'lib/hooks'
import { Media, MessageResponse, UserResponseModel } from 'lib/types'
import { User } from './User'
import { Message } from './Message'
import { InputText } from './InputText'
import { LoaderDots } from './LoaderDots'

export const Home: React.FunctionComponent = () => {
    const { users } = useAllRegisteredUsers()
    const [selectedUser, setSelectedUser] = useState<UserResponseModel>()
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState<Array<MessageResponse>>([])
    const { sendMessage: sendMessageAction, isLoading, sendGeneralMessage: sendGeneralMessageAction } = useSendMessage()
    const { getMessages, getGeneralMessages } = useUserMessages(setMessages)
    const { setStartTypingMode, setStopTypingMode, getSecondUserTypingMode, receiverIsTyping } = useIsTyping()
    const isFirstRender = useRef(true)
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    const [generalChannel, setGeneralChannel] = useState(true)

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

    const sendGeneralMessage = () => {
        if (messageText && auth.currentUser?.uid && auth.currentUser.email) {
            sendGeneralMessageAction({
                message: messageText,
                userUid: auth.currentUser.uid,
                name: auth.currentUser.email
            })
                .catch(() => console.log('Error in send message'))
                .finally(() => setMessageText(''))
        }
    }

    const onSelectedUser = (user: UserResponseModel) => {
        setGeneralChannel(false)
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
        if (!selectedUser) {
            getGeneralMessages()
        }
    }, [generalChannel])

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
    }, [messages, receiverIsTyping])

    return (
        <HomeContainer>
            <UserAccountContainer>
                <div>
                    <GeneralChannel
                        onClick={() => {
                            setGeneralChannel(true)
                            setSelectedUser(undefined)
                        }}
                    >
                        General Message
                    </GeneralChannel>
                </div>
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
                                It's General channel, you can choose user to private message
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
                                    isGeneralChannel={generalChannel}
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
                <InputText
                    value={messageText}
                    onClick={() => {
                        if (generalChannel) {
                            return sendGeneralMessage()
                        }

                        sendMessage()
                    }}
                    isLoading={isLoading}
                    onChange={setMessageText}
                />
            </MessagesContainer>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    height: calc(100% - 60px);
    display: flex;
`

const GeneralChannel = styled.div`
    margin-bottom: 10px;
    text-align: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
    padding: 15px 5px;
    border-radius: 5px;
`

const UserAccountContainer = styled.div`
    width: 20%;
    padding: 20px 15px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    @media (max-width: ${Media.Phone}px) {
        width: 30%;
    }
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
    text-align: center;
    color: ${({ theme }) => theme.colors.brown};
    margin-bottom: 20px;
    h1 {
        font-size: 20px;
    }
`

const LoaderContainer = styled.div`
    width: 50px;
    height: 50px;
    margin-top: 20px;
    margin-left: 20px;
`
