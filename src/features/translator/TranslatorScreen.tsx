import React from 'react'
import styled from 'styled-components'
import { useTranslations } from 'lib/hooks'

export const TranslatorScreen: React.FunctionComponent = () => {
    const T = useTranslations()

    console.log("hookTest", T)

    return (
        <Container>
            Translator Screen
        </Container>
    )
}

const Container = styled.div`
    color: ${({theme}) => theme.colors.typography};
`
