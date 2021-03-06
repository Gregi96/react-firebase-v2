import React from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'
import { auth } from 'firebase'
import { MessageResponse } from 'lib/types'

type MessageProps = {
    message: MessageResponse,
    isGeneralChannel: boolean
}

type MessageContainerProps = {
    sender: boolean
}

export const Message: React.FunctionComponent<MessageProps> = ({
    message ,
    isGeneralChannel
}) => {
    const dateToFormat = message.createdAt.toDate()
    const formattedDate = format(dateToFormat, 'yyyy/MM/dd/ hh:mm:ss')

    return (
        <MessageContainer sender={auth.currentUser!.uid === message.from}>
            <div>
                {message.message}
            </div>
            {isGeneralChannel && message.name && (
                <AuthorEmail>
                    {message.name}
                </AuthorEmail>
            )}
            <Time>
                {formattedDate}
            </Time>
        </MessageContainer>
    )
}

const MessageContainer = styled.div<MessageContainerProps>`
    padding: 10px;
    background-color: ${({ theme, sender }) => sender ? theme.colors.beige : theme.colors.lightBlue};
    margin-bottom: 10px;
    width: fit-content;
    max-width: 300px;
    align-self: ${({ sender }) => sender ? 'end' : 'start'};
    border-radius: 15px;
    text-align: center;
`

const Time = styled.div`
    font-size: 10px;
    text-align: end;
    margin-top: 15px;
`

const AuthorEmail = styled.div`
    font-size: 12px;
`
