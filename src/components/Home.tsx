import React, { useState } from 'react'
import styled from 'styled-components'
import {
    collection,
    addDoc,
    Timestamp,
    query,
    onSnapshot,
    orderBy
} from 'firebase/firestore'
import { getUnixTime } from 'date-fns'
import { db, auth } from 'firebase'
import { useAllRegisteredUsers } from 'lib/hooks'
import { MessageResponse, UserResponseModel } from 'lib/types'
import { User } from './User'
import { Message } from './Message'
import { InputText } from './InputText'

export const Home: React.FunctionComponent = () => {
    const { users } = useAllRegisteredUsers()
    const [selectedUser, setSelectedUser] = useState<UserResponseModel>()
    const [messageText, setMessageText] = useState('')
    const [messages, setMessages] = useState<Array<MessageResponse>>([])

    const sendMessage = () => {
        if (messageText && auth.currentUser?.uid && selectedUser?.uid) {
            // set the same id, no matter whether for or to
            const id = auth.currentUser.uid > selectedUser?.uid ?
                `${auth.currentUser.uid + selectedUser?.uid}` :
                `${selectedUser?.uid + auth.currentUser.uid}`

            addDoc(collection(db, 'messages', id, 'chat'), {
                from: auth.currentUser.uid,
                to: selectedUser.uid,
                createdAt: Timestamp.fromDate(new Date()),
                message: messageText
            })
                .then(() => setMessageText(''))
        }
    }

    const onSelectedUser = (user: UserResponseModel) => {
        setSelectedUser(user)

        if (auth.currentUser?.uid && user.uid) {
            // set the same id, no matter whether for or to
            const id = auth.currentUser.uid > user.uid ?
                `${auth.currentUser.uid + user.uid}` :
                `${user.uid + auth.currentUser.uid}`
            const messageRef = collection(db, 'messages', id, 'chat')
            const q = query(messageRef, orderBy('createdAt', 'asc'))

            onSnapshot(q, snapshot => {
                const messages = snapshot.docs.map(doc => doc.data()) as Array<MessageResponse>

                setMessages(messages)
            })
        }
    }

    return (
        <HomeContainer>
            <UserAccountContainer>
                {users && users.map(user => (
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
                        {messages && messages.map((message, index) => {
                            const date = message.createdAt.toDate()

                            return (
                                <Message
                                    key={`${getUnixTime(date)}`}
                                    message={message}
                                />
                            )
                        })}
                    </MessagesList>
                </div>
                {selectedUser && (
                    <InputText
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
    height: 100%;
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
`

const MessagesList = styled.div`
    display: flex;
    flex-direction: column;
`

const Heading = styled.div`
    font-size: 40px;
    text-align: center;
    color: ${({ theme }) => theme.colors.brown};
    margin-bottom: 20px;
`
