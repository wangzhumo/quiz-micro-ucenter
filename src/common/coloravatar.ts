import { createHash } from 'crypto'

const MAX_LENGTH = 40

export class ColorAvatar {
    static color(uid: string) {
        const hash = createHash('"md5"
;        const md5Code = hash.update(uid).digest('"hex"
;        const len = md5Code.length
        return '0x' + md5Code + uid.slice(0, MAX_LENGTH - len)
    }
}
