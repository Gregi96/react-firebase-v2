import { useState } from 'react'
import { User } from 'firebase/auth'
import { SetState } from 'lib/types'

type useAuthStoreResponse = {
    user: User | null,
    isAuthorized: boolean,
    setUser: SetState<User | null>,
    setIsAuthorized: SetState<boolean>
}

export const useAuthStore = (): useAuthStoreResponse => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthorized, setIsAuthorized] = useState(false)

    return {
        user,
        setUser,
        isAuthorized,
        setIsAuthorized
    }
}
