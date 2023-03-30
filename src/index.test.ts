import getCurrentLocationWithTimeout from "index"
import { TiredFromWaitingPromiseResolveTooLongError } from "promise-until-tired"

describe('getCurrentLocationWithTimeout()', () => {
    const MOCK_RESPONSE = {
        coords: {
            latitude: 51.1,
            longitude: 45.3
        }
    }

    const MOCK_REJECT_RESPONSE = new Error('reject')

    const mockGetCurrentPosition = jest.fn()
    
    beforeAll(() => {
        Object.defineProperty(window, 'navigator', {
            value: {
                geolocation: {
                    getCurrentPosition: mockGetCurrentPosition,
                },
            },
        })
    })

    afterEach(() => {
        mockGetCurrentPosition.mockClear()
    })

    describe('geolocation resolve after timeout', () => {
        beforeEach(() => {
            mockGetCurrentPosition.mockImplementation(resolve => {
                setTimeout(() => {
                    resolve(MOCK_RESPONSE)
                }, 50000)
            })
        })

        it('should reject with timeout error (with default timeout)', async () => {
            await expect(getCurrentLocationWithTimeout()).rejects.toBeInstanceOf(TiredFromWaitingPromiseResolveTooLongError)
        })

        it('should reject with timeout error (with input timeout)', async () => {
            await expect(getCurrentLocationWithTimeout({ timeout: 1000 })).rejects.toBeInstanceOf(TiredFromWaitingPromiseResolveTooLongError)
        })
    })

    describe('geolocation reject after timeout', () => {
        beforeEach(() => {
            mockGetCurrentPosition.mockImplementation((_, reject) => {
                setTimeout(() => {
                    reject(MOCK_REJECT_RESPONSE)
                }, 50000)
            })
        })

        it('should reject with timeout error (with default timeout)', async () => {
            await expect(getCurrentLocationWithTimeout()).rejects.toBeInstanceOf(TiredFromWaitingPromiseResolveTooLongError)
        })

        it('should reject with timeout error (with input timeout)', async () => {
            await expect(getCurrentLocationWithTimeout({ timeout: 1000 })).rejects.toBeInstanceOf(TiredFromWaitingPromiseResolveTooLongError)
        })
    })

    describe('geolocation resolve before timeout', () => {
        beforeEach(() => {
            mockGetCurrentPosition.mockImplementation(resolve => {
                setTimeout(() => {
                    resolve(MOCK_RESPONSE)
                }, 500)
            })
        })

        it('should reject with timeout error (with default timeout)', async () => {
            await expect(getCurrentLocationWithTimeout()).resolves.toEqual(MOCK_RESPONSE)
        })

        it('should reject with timeout error (with input timeout)', async () => {
            await expect(getCurrentLocationWithTimeout({ timeout: 1000 })).resolves.toEqual(MOCK_RESPONSE)
        })
    })

    describe('geolocation reject before timeout', () => {
        beforeEach(() => {
            mockGetCurrentPosition.mockImplementation((_, reject) => {
                setTimeout(() => {
                    reject(MOCK_REJECT_RESPONSE)
                }, 500)
            })
        })

        it('should reject with timeout error (with default timeout)', async () => {
            await expect(getCurrentLocationWithTimeout()).rejects.toEqual(MOCK_REJECT_RESPONSE)
        })

        it('should reject with timeout error (with input timeout)', async () => {
            await expect(getCurrentLocationWithTimeout({ timeout: 1000 })).rejects.toEqual(MOCK_REJECT_RESPONSE)
        })
    })
})
