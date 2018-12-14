import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import YouTube from './YouTube.vue'

describe('YouTube.vue', () => {
    let wrapper = {}
    const videoId = 'aqz-KE-bpKQ'
    const baseURL = `https://www.youtube.com/watch?v=${videoId}`
    const expectedURL = `https://www.youtube-nocookie.com/embed/${videoId}`

    beforeEach(() => {
        wrapper = shallowMount(YouTube, {
            context: {
                props: {
                    url: baseURL
                }
            }
        })
    })

    it('should contain class contentelement-youtube', () => {
        expect(wrapper.classes('contentelement-youtube')).to.be.true
    })

    it('should contain the expected src', () => {
        expect(wrapper.attributes().src).to.eq(expectedURL)
    })

    describe('youtube url validator', () => {
        const expectedValues = [
            { value: '', expects: false },
            { value: 'a', expects: false },
            { value: '1', expects: false },
            { value: ' ', expects: false },
            { value: 'https://youtu.be/PQPO5Z4lVTU', expects: true },
            { value: 'https://youtu.be/PQPO5Z4lVTU1', expects: false },
            { value: 'youtu.be/PQPO5Z4lVTU', expects: false },
            { value: 'https://www.youtube.com/watch?v=PQP-5Z4lVTU', expects: true },
            { value: 'https://www.youtube.com/watch?v=PQP-5Z4lVTU1', expects: false },
            { value: 'www.youtube.com/watch?v=PQP-5Z4lVTU', expects: false },
            { value: 'https://youtu.be/PQPO5Z4lVTU\rM', expects: false },
            /* eslint-disable-next-line no-useless-escape */
            { value: '\h\t\t\p\s\:\/\/youtu\.be\/PQPO5Z4lVTU', expects: false },
            { value: 'https://https://youtu.be/PQPO5Z4lVTU', expects: false },
            { value: 'https://youtu.be/https://youtu.be/PQPO5Z4lVTU', expects: false },
            { value: 'https://www.youtube.com/watch?v= QP-5Z4lVTU', expects: false },
            { value: 'https://www.youtube.com/watch?v=%20PQP-5Z4lVTU', expects: false },
            { value: 'https://www.youtube.com/watch?v=%20-5Z4lVTU', expects: false },
            { value: '"https://www.youtube.com/watch?v=%20-5Z4lVTU"', expects: false },
            { value: 'https://youtu,be/PQPO5Z4lVTU', expects: false }
        ]

        const validator = YouTube.props.url.validator

        expectedValues.forEach(({ value, expects }, index) => {
            it(`should validate url '${value}' with ${expects} (${index})`, () => {
                expect(validator(value)).to.equal(expects)
            })
        })
    })
})
