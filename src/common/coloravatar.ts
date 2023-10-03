import * as crypto from 'crypto'

const MAX_LENGTH = 40

export class ColorAvatar {
    private static hash = crypto.createHash('md5')

    static color(uid: string) {
        const md5Code = this.hash.update(uid).digest('hex')
        const len = md5Code.length
        return '0x' + md5Code + uid.slice(0, MAX_LENGTH - len)
    }
}
