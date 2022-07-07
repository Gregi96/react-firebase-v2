export const createCommonUid = (firstUserUid: string, secondUserUid: string) => firstUserUid > secondUserUid
    ? `${firstUserUid + secondUserUid}`
    : `${secondUserUid + firstUserUid}`

