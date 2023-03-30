import newPromiseUntilTired, { TiredFromWaitingPromiseResolveTooLongError } from 'promise-until-tired'
import { DEFAULT_TIMEOUT } from './variables'

function getCurrentLocationWithTimeout(options?: PositionOptions) {
    return newPromiseUntilTired<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    }, options?.timeout || DEFAULT_TIMEOUT)
}

export const TimeoutError = TiredFromWaitingPromiseResolveTooLongError

export default getCurrentLocationWithTimeout
