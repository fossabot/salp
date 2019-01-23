<template>
    <div class="code__container">
        <textarea ref="textarea"/>
    </div>
</template>
<script>
import * as codeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'

const languages = require.context('codemirror/mode', true, /\.js$/)
languages.keys().forEach(languages)

export default {
    name: 'Code',
    model: {
        prop: 'code',
        event: 'change'
    },
    props: {
        code: {
            type: String
        },
        language: {
            type: String,
            required: true
        },
        highlightedLines: {
            default() {
                return []
            },
            validator(value) {
                if (!Array.isArray(value)) {
                    return false
                }

                const isValidEntry = entry => Number.isInteger(entry) && entry > 0
                const isValidRange = ([min, max]) => isValidEntry(min) && isValidEntry(max) && min < max

                let isValid = true
                value.forEach(range => {
                    if (!(isValidEntry(range) || (Array.isArray(range) && range.length === 2
                        && isValidRange(range)))) {
                        isValid = false
                    }
                })

                return isValid
            }
        }
    },
    data() {
        return {
            editor: null
        }
    },
    methods: {
        initialize() {
            const options = {
                tabSize: 4,
                lineNumbers: true,
                readOnly: 'nocursor',
                viewportMargin: Infinity,
                mode: this.language
            }

            const code = this.code || this.$slots.default.map(node => node.text).join()

            this.editor = codeMirror.fromTextArea(this.$refs.textarea, options)
            this.editor.setValue(code)

            this.highlightLines(this.highlightedLines)
        },
        highlightLines(lines) {
            lines.forEach(range => {
                if (typeof range === 'number') {
                    range = [range, range]
                }
                for (let currentLine = range[0]; currentLine <= range[1]; currentLine++) {
                    this.editor.addLineClass(currentLine - 1, 'background', 'line-highlight')
                }
            })
        }
    },
    watch: {
        'code': function(newCode, oldCode) {
            let currentCode = this.editor.getValue()
            if (newCode !== currentCode) {
                let scrollInfo = this.editor.getScrollInfo()
                this.editor.setValue(newCode)
                this.editor.scrollTo(scrollInfo.left, scrollInfo.top)
            }
        }
    },
    mounted() {
        this.initialize()
    },
    beforeDestroy: function() {
        if (this.editor) {
            this.editor.toTextArea()
        }
    }
}
</script>

<style lang="scss">
.code__container {
    margin-top: 1em;
    margin-bottom: 0;

    .CodeMirror {
        height: auto;
    }

    .CodeMirror-scroll {
        .line-highlight {
            background-color: lightgray;
        }
    }
}
</style>
