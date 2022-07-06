import React from 'react'
import { format } from 'date-fns'
import styled from 'styled-components'
import { MessageResponse } from 'lib/types'
import { auth } from 'firebase'

type MessageProps = {
    message: MessageResponse
}

type MessageContainerProps = {
    left: boolean
}

export const Message: React.FunctionComponent<MessageProps> = ({ message }) => {
    const dateToFormat = message.createdAt.toDate()
    const formattedDate = format(dateToFormat, 'yyyy/MM/dd/ hh:mm:ss')

    return (
        <MessageContainer left={auth.currentUser!.uid === message.from}>
            <div>
                {message.message}
            </div>
            <Time>
                {formattedDate}
            </Time>
        </MessageContainer>
    )
}

const MessageContainer = styled.div<MessageContainerProps>`
    padding: 10px;
    background-color: ${({ theme, left }) => left ? theme.colors.beige : theme.colors.lightBlue};
    margin-bottom: 10px;
    width: fit-content;
    max-width: 300px;
    align-self: ${({ left }) => left ? 'end' : 'start'};
    border-radius: 15px;
    text-align: center;
`

const Time = styled.div`
    font-size: 10px;
    text-align: end;
    margin-top: 15px;
`
