// Table CE parser plugin

const isSpace = require('markdown-it/lib/common/utils').isSpace

/**
 * taken from {@link https://github.com/markdown-it/markdown-it/blob/master/lib/rules_block/table.js#L8}
 */
function getLine(state, line) {
    let pos = state.bMarks[ line ] + state.blkIndent
    let max = state.eMarks[ line ]

    return state.src.substr(pos, max - pos)
}

/**
 * taken from {@link https://github.com/markdown-it/markdown-it/blob/master/lib/rules_block/table.js#L15}
 */
function escapedSplit(str) {
    let result = []
    let pos = 0
    let max = str.length
    let ch
    let escapes = 0
    let lastPos = 0
    let backTicked = false
    let lastBackTick = 0

    ch = str.charCodeAt(pos)

    while (pos < max) {
        if (ch === 0x60/* ` */) {
            if (backTicked) {
                // make \` close code sequence, but not open it;
                // the reason is: `\` is correct code block
                backTicked = false
                lastBackTick = pos
            } else if (escapes % 2 === 0) {
                backTicked = true
                lastBackTick = pos
            }
        } else if (ch === 0x7c/* | */ && (escapes % 2 === 0) && !backTicked) {
            result.push(str.substring(lastPos, pos))
            lastPos = pos + 1
        }

        if (ch === 0x5c/* \ */) {
            escapes++
        } else {
            escapes = 0
        }

        pos++

        // If there was an un-closed backtick, go back to just after
        // the last backtick, but as if it was a normal character
        if (pos === max && backTicked) {
            backTicked = false
            pos = lastBackTick + 1
        }

        ch = str.charCodeAt(pos)
    }

    result.push(str.substring(lastPos))

    return result
}

function parseTable(state, startLine, endLine, silent) {
    let ch,
        lineText,
        pos,
        i,
        nextLine,
        columns,
        columnCount,
        token,
        aligns,
        t,
        tableLines

    // should have at least two lines
    if (startLine + 2 > endLine) {
        return false
    }

    nextLine = startLine + 1

    if (state.sCount[ nextLine ] < state.blkIndent) {
        return false
    }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[ nextLine ] - state.blkIndent >= 4) {
        return false
    }

    // first character of the second line should be '|', '-', ':',
    // and no other characters are allowed but spaces;
    // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

    pos = state.bMarks[nextLine] + state.tShift[ nextLine ]
    if (pos >= state.eMarks[ nextLine ]) {
        return false
    }

    ch = state.src.charCodeAt(pos++)
    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */) {
        return false
    }

    while (pos < state.eMarks[ nextLine ]) {
        ch = state.src.charCodeAt(pos)

        if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace(ch)) {
            return false
        }

        pos++
    }

    lineText = getLine(state, startLine + 1)

    columns = lineText.split('|')
    aligns = []
    for (i = 0; i < columns.length; i++) {
        t = columns[i].trim()
        if (!t) {
            // allow empty columns before and after table, but not in between columns;
            // e.g. allow ` |---| `, disallow ` ---||--- `
            if (i === 0 || i === columns.length - 1) {
                continue
            } else {
                return false
            }
        }

        if (!/^:?-+:?$/.test(t)) {
            return false
        }
        if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
            aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right')
        } else if (t.charCodeAt(0) === 0x3A/* : */) {
            aligns.push('left')
        } else {
            aligns.push('')
        }
    }

    lineText = getLine(state, startLine).trim()
    if (lineText.indexOf('|') === -1) {
        return false
    }
    if (state.sCount[ startLine ] - state.blkIndent >= 4) {
        return false
    }
    columns = escapedSplit(lineText.replace(/^\||\|$/g, ''))

    // header row will define an amount of columns in the entire table,
    // and align row shouldn't be smaller than that (the rest of the rows can)
    columnCount = columns.length
    if (columnCount > aligns.length) {
        return false
    }

    if (silent) {
        return true
    }

    token = state.push('CETable', 'Table', 1)
    token.map = tableLines = [ startLine, 0 ]
    token.nesting = 0

    let tableData = []

    const columnNames = columns.map(name => name.trim())

    for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
            break
        }

        lineText = getLine(state, nextLine).trim()
        if (lineText.indexOf('|') === -1) {
            break
        }
        if (state.sCount[ nextLine ] - state.blkIndent >= 4) {
            break
        }
        columns = escapedSplit(lineText.replace(/^\||\|$/g, ''))

        let row = {}

        columnNames.forEach((columnName, index) => {
            row[columnName] = columns[index] ? columns[index].trim() : ''
        })

        tableData.push(row)
    }

    token.tableData = tableData

    tableLines[ 1 ] = nextLine
    state.line = nextLine
    return true
}

module.exports = function TablePlugin(md) {
    md.block.ruler.at('table', parseTable)

    md.renderer.rules.CETable = function renderTable(tokens, idx, options, env, self) {
        const token = tokens[idx]

        token.attrs = [
            [':data', JSON.stringify(token.tableData)]
        ]

        options = {
            ...options,
            xhtmlOut: true
        }

        return self.renderToken(tokens, idx, options)
    }
}
