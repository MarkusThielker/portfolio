import showdown from "showdown"
import showdownHighlight from "showdown-highlight"

export const showdownConverter = new showdown.Converter({
    extensions: [showdownHighlight({
        pre: true,
        auto_detection: true,
    })],
    customizedHeaderId: true,
    parseImgDimensions: true,
    strikethrough: true,
    tables: true,
    ghCodeBlocks: true,
    tasklists: true,
    requireSpaceBeforeHeadingText: true,
    ghMentions: true,
    emoji: true,
})
