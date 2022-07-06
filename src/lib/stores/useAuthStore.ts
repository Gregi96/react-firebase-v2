import { useState } from 'react'
import { User } from 'firebase/auth'
import { SetState } from 'lib/types'

type useAuthStoreResponse = {
    user: User | null,
    isLoading: boolean,
    setUser: SetState<User | null>,
    setIsLoading: SetState<boolean>
}

export const useAuthStore = (): useAuthStoreResponse => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    return {
        user,
        isLoading,
        setUser,
        setIsLoading
    }
}
