import { Epoch, Snowyflake } from '../common/snowflake'

export const idGenerator = new Snowyflake({
    workerId: 1n,
    epoch: Epoch.Twitter,
})
