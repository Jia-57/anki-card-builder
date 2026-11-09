# Card Design System

## Description

Card Template Management uses this specification to select themes, components, and typography after content roles and order have been determined. It governs visual and UED decisions; it does not define Note Type fields, decide the question direction, or directly provide a template that can be written to Anki. [card-template-management.md](./card-template-management.md) assembles, previews, and verifies complete Front HTML, Back HTML, and Styling CSS using actual fields.

Design priority: explicit user requirements > parts of existing templates the user has not asked to change > this specification's defaults. For unspecified visual emphasis, consider the learning goal, content meaning, and recall task on each side. Do not add fields or learning content for visual design purposes.

## Workflow

### 1. Confirm content roles

Receive the learning goal, front/back order, actual field names, and content roles established by Card Template Management. User-specified priorities take precedence. Assign visual hierarchy to the main prompt, core answer, supporting information, supplementary explanation, and media without changing the question direction or field order.

### 2. Select and combine UED components

| Content role | Default presentation rule |
|---|---|
| Main prompt, core answer | Use the highest visual level; keep one primary focal point on each side so elements do not compete for attention. |
| Back-side headword | Display it centered as the first content group by default. Emphasize it when it is the answer; when it is a prompt, make it less prominent than the core meaning. Allow long words to wrap. |
| Phonetic transcription, part of speech, articles, and other supporting information | Place close to the headword they explain, with smaller type and lower contrast than the main content. |
| Meanings and supplementary explanations | Arrange in reading order. Group separate senses rather than combining all supporting content in one paragraph. |
| Example sentences and translations | Keep each original sentence and its translation in the same example group, with the translation immediately after the original. Do not place them at opposite ends of the card. |
| Audio | Place beside the headword or sentence it plays, allowing the group to wrap on narrow screens. Preserve Anki's native playback behavior. Give controls a clear click target, avoid duplicated visual boundaries, and align icons with adjacent labels. Decide the exact structure and style from the target client's actual rendering. |
| Images | Place at the corresponding point in the back-side content order, in a separate centered group. Scale proportionally without cropping the subject. |
| Missing optional content | Omit the entire group without empty headings, borders, or inactive playback buttons. |

Combine components so related content stays together, primary and secondary levels are clear, and the reading order feels natural. Prefer a vertical flow; place items side by side only when space and their relationship justify it. The layout must not depend on the text length of a single example Note.

On the back of a vocabulary card, make the core meaning the visual focus, then organize word forms, collocations, examples, and sources by importance. Unless the user requests a borderless or full-width layout, both sides should have a recognizable overall card surface and outer boundary by default. If the front has a distinct card surface, carry that boundary language through to the back. Use whitespace, font size and weight, contrasting backgrounds, translucent surfaces, light borders, or plain text to create internal hierarchy; every group need not sit in an identical card. Dividers may help organize content, but reconsider the reading order and focal point if dividers are the only distinction or every section becomes a box of equal color and weight. These are design judgments, not fixed components or ordering. For sparse content, constrain the reading width and whitespace to avoid a large empty panel. Maintain text contrast on translucent surfaces and provide a readable solid background for clients that do not support the effect.

### 3. Choose a complete theme

Ocean, Sage, Plum, Graphite, and Ember are five peer theme options, each with day and night colors from the Cheeky Pint card preview. The following colors are starting values; check actual text contrast before applying them and adjust as needed while preserving each theme's character.

| Theme | Mode | Page background | Card surface | Primary text | Secondary text | Accent | Light accent background | Borders and dividers | Text on accent |
|---|---|---|---|---|---|---|---|---|---|
| Ocean | Day | #F2F8FC | #FFFFFF | #172B3A | #4D6472 | #176B9A | #DBEFF9 | #C7DCE8 | #FFFFFF |
| Ocean | Night | #101820 | #1A2732 | #F3F7FA | #B8C8D2 | #7CC6E8 | #233F50 | #3A5361 | #101820 |
| Sage | Day | #F3F8F4 | #FFFFFF | #1B2E24 | #55695D | #2F7D5B | #DDEFE4 | #CADDD1 | #FFFFFF |
| Sage | Night | #111A15 | #1A2720 | #F1F7F3 | #BACBC0 | #7FCFA4 | #24402F | #3A5645 | #111A15 |
| Plum | Day | #F8F4FA | #FFFFFF | #2A1D33 | #6A5A75 | #7A3F9B | #EBDDF3 | #DACBE3 | #FFFFFF |
| Plum | Night | #19121F | #251B2E | #F7F1FA | #CBBCD6 | #C89BE3 | #3A2A47 | #55416A | #19121F |
| Graphite | Day | #F4F5F6 | #FFFFFF | #1D2125 | #5A626A | #3B4A5A | #E3E7EB | #D0D5DA | #FFFFFF |
| Graphite | Night | #121416 | #1D2024 | #F2F4F5 | #B9C0C6 | #A9BBCD | #2B3238 | #424B54 | #121416 |
| Ember | Day | #FBF6F0 | #FFFFFF | #2E2118 | #6E5E50 | #B05A1E | #F6E4D2 | #E6D5C3 | #FFFFFF |
| Ember | Night | #1A130E | #271D15 | #FAF4EE | #D1C3B5 | #F0A468 | #43301F | #5E4630 | #1A130E |

A theme must cover the page and card backgrounds, primary and secondary text, answer emphasis, labels, audio containers, image captions, borders, and focus states. Components use semantic colors instead of hard-coding colors from a particular theme. Use the same theme on both sides, with its paired night colors in Anki night mode.

If the user has not specified a theme, recommend one based on the card's purpose and offer theme options in the interactive HTML proposal page. Let the user inspect layouts, themes, both sides, and representative content before confirming a choice; update the same preview file when changes are requested. Use the confirmed theme in the final Anki template.
A theme changes the colors of a layout. When the user wants to compare design proposals, also offer layout options with clearly different structures or component combinations. The proposal page supports switching and comparison; the user can still provide additional requirements in conversation.

### 4. Typography, component sizes, and responsiveness

Establish a type scale for the main content, answer, body text, and supporting information, then adjust for screen width and text length. The font sizes, spacing, and image height below are reference ranges. Reading width, padding, and control sizes set readability and usability bounds, not fixed card dimensions.

Choose font families, weights, and line heights for the language and readability, and keep them consistent across both sides. Borders, corners, shadows, and other decoration should support the content hierarchy.

| Item | Reference range and bounds |
|---|---|
| Content width and padding | Maximum reading width about 680px; at least 16px horizontal padding on narrow screens and about 24–28px on wide screens. |
| Front-side card height | Start with a card body around 320–480px high in desktop windows or 270–400px on narrow screens; adjust for word length, audio controls, and available space rather than treating these ranges as fixed dimensions. Avoid a card that is too wide and short, or increasing only the outer area without changing the card body. |
| Main prompt/headword | About 28–44px, scaling smoothly with the viewport; let long words wrap without horizontal overflow. |
| Core answer | About 24–36px, with a clear hierarchy relative to the main prompt. |
| Body text and examples | About 16–18px with a line height around 1.5–1.7. Translations may be less prominent than originals but must remain easy to read. |
| Supporting information | About 14–16px; do not rely on color alone to convey meaning. |
| Within-group/between-group spacing | About 6–12px between related items and 16–24px between different content groups. |
| Audio controls | Size the click target for easy use; about 44px is a reference. Styling must not interfere with Anki's native playback controls. |
| Images | No wider than their container and, by default, no taller than about 320px. Show the full image when the content must be fully identifiable. |

Start with narrow screens, using fluid widths and font sizes and layouts based on relative positioning rather than fixed coordinates. Wrap or scale long words, sentences, and large images without covering content; constrain line length on desktop. Keep the front card's width and height in balance, shrinking with narrow windows and growing moderately with content. Center the overall card vertically as much as possible within the actual review area, and check that whitespace above and below it is balanced. In larger windows, the card body can grow moderately; once it reaches a comfortable reading size, increase surrounding whitespace instead of enlarging the card indefinitely. Check card positioning and card body height separately. All decoration must give way to learning content and readability.

### 5. Preview and template handoff

Card Template Management handles actual field bindings, template assembly, and HTML preview; this specification does not prescribe a fixed front/back HTML skeleton. The preview should show both sides of the selected combination and reuse the same file for later adjustments. Theme selection and preview do not mean anything has been written to Anki.
Before handoff, check whether information blocks are clear, collocations and translations stay paired, text and background have sufficient contrast, and whitespace serves reading intentionally. Pass the selected layout, theme, and additional requirements clearly back to Card Template Management. Check only issues actually found; do not repeatedly create verification artifacts for a simple card UI.

## Output Specification

Keep the design handoff concise: give the selected or recommended theme, components and typography for the established content roles, any necessary size or color exceptions, and issues found in the preview. Card Template Management outputs the complete usable Anki template code and actual write status.

## Error Handling

- If content roles or order are unclear, ask Card Template Management to verify them instead of using visual inference in place of user requirements.
- If audio or images are missing, hide their components. Do not draw inactive controls or describe files not yet in Anki's media collection as available.
- If theme text contrast is insufficient, content overflows, or client styling differs, first fix readability and layout, then verify in the target Anki client.
