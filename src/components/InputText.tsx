import React from 'react'
import styled from 'styled-components'

type InputTextProps = {
    value: string,
    onChange(text: string): void,
    onClick(): void
}

export const InputText: React.FunctionComponent<InputTextProps> = ({
    value,
    onChange,
    onClick
}) => (
    <InputContainer>
        <Input
            placeholder="type message"
            value={value}
            onChange={event => onChange(event.target.value)}
        />
        <button onClick={onClick}>
            Send
        </button>
    </InputContainer>
)

const InputContainer = styled.div`
    width: 100%;
    display: flex;
`

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-right: 10px;
    border-radius: 4px;
`
