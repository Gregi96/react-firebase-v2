import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'lib/styles'
import { TranslatorScreen } from 'features/translator'

export const App = () => (
    <ThemeProvider theme={theme}>
        <AppContainer>
            Hello World !!
            <TranslatorScreen />
        </AppContainer>
    </ThemeProvider>
)

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.colors.backgroundColor};
`
