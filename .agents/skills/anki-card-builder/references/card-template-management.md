
# Card Template Management

## Description

Use when the user needs to view, design, create, or modify the front and back layouts and visual styling of Anki cards, including field display, HTML structure, fonts, colors, spacing, responsive layouts, and dynamic interactions.

This Skill designs and manages Card Templates. [note-type-management.md](./note-type-management.md) handles Note Type creation, field structure management, and deletion.

Receive the learning goal, actual field names, and the user's front/back requirements. Determine the displayed content and order, use [Card Design System](./card-design-system.md) for visual design, and return verifiable Front HTML, Back HTML, and Styling CSS. Delegate creation of a new type to Note Type management.

## Workflow

### 1. Parse requirements and identify the scenario

Parse the user's requirements for content layout, visual styling, and interactions. Identify the two main scenarios:

**Scenario A: Add a Note Type and Card Template**

When the user adds a Note Type, design its Card Template from the new field structure and learning goal supplied by [note-type-management.md](./note-type-management.md), then support the Note Type creation workflow.

**Scenario B: Modify an existing Card Template**

When the user changes the fields of an existing Note Type or asks to change an existing Card Template's layout or visual styling, make only the necessary changes to the original template.

If the user only asks to view an existing template, read and show its configuration without entering the design or modification workflow.

**Scope of requirement analysis:**

- **Content layout**: fields shown on each side, field order, content position, alignment, and HTML structure.
- **Visual styling**: font family, font size, text and background colors, spacing, borders, corner radius, and other CSS.
- **Dynamic interaction**: animation, button shape, interactive state changes, and other HTML, CSS, or JavaScript effects.

**Global design principles:**

1. Explicit user design requirements have the highest priority.
2. Base presentation on the Note Type's actual field structure and learning goal.
3. Complete unspecified design details using the design specification.
4. When modifying an existing template, preserve its layout, styling, and functions unless the user asks to change them.
5. When the user explicitly requests a complete redesign, the entire template may be redesigned using the design specification.
6. Do not repeatedly ask about minor design details unless there is a critical conflict or required information is missing.

### 2. Design front and back content layouts

Use the user requirements, Note Type fields, and learning goal to determine content, field order, and layout relationships on both sides. Identify the roles of the main prompt, core answer, supporting information, supplementary explanation, and media.

Choose a design strategy according to how much the user specified:

**Fully specified layout**

When the user specifies content, field order, display positions, and layout details for both sides, follow those instructions exactly. Do not override specified content with a default template.

**Partially specified layout**

When the user specifies only some layout or visual requirements:

- Implement specified parts exactly as requested.
- Preserve the front-side hints, translation language, and learning method already established in the conversation. If the user asks only to show a headword, do not add a question or recall prompt. Handle German noun articles according to the default rule below.
- Complete unspecified parts using the design specification.
- Keep completed details consistent with the user's requirements to form a unified layout.

For example, if the user only says "show the word centered on the front," follow that requirement for front-side content and alignment, then design unspecified front/back layout and styling details using the design specification.

When modifying an existing template, preserve unchanged parts of its original design first. Apply template styling rules only to new content or parts that need redesign.

**Unspecified layout**

When the user provides only a learning goal or card purpose, design the full layout using the Note Type fields and design specification.

Defaults:

1. **Front**: Show the core headword the user wants to see repeatedly. Show the article plus noun for German nouns by default; hide the article only if the user explicitly wants to recall grammatical gender. Whether another field "reveals the answer" depends on the user's actual practice goal.
2. **Back**: On a vocabulary card, repeat the learning headword first. Follow a headword used as a prompt with the core meaning; emphasize a headword used as the answer. For other cards, prioritize the core answer or explanation.
3. **Field order**: Arrange by learning importance, comprehension order, and content relationships.
4. **Content hierarchy**: Emphasize primary learning content and de-emphasize secondary information.
5. **Information density**: Avoid excessive content and maintain clarity and readability.

**Example: Learning English words and collocations**

Recommended front:
- Word or fixed expression

Recommended back:
1. Word or fixed expression (optionally with IPA and pronunciation)
2. Chinese translation or core meaning
3. Image, if any (by default after the meaning and before examples)
4. Example sentences
5. Other supplementary content

An image that applies only to a particular sense or example should immediately follow that content.

This order is only a default recommendation. The actual design must follow user requirements and fields present in the Note Type.

**Implementation constraints:**

- Every field placeholder must match an actual Note Type field name.
- Do not assume fields are named Word, Meaning, Example, or anything else.
- Do not add, delete, or change Note Type fields without authorization.
- If field changes do not affect the existing template and the user has not requested a layout change, a redesign is unnecessary.
- By default, design only the Card Types needed for the learning goal; do not add another review direction solely for layout design.
- Keep each collocation paired with its original text and corresponding translation, and show the requested number. Do not compress all collocations into one line or replace several with one.
- When using the recommended vocabulary import structure, display `Pronunciation` according to the actual language. Group multiple examples and collocations separately with their translations; omit empty headings and containers for missing optional content. Use Anki TTS only with language and text fields confirmed to play in the target client.

### 3. Design visual styling and responsive layouts

After determining front/back content and order, select a theme, components, visual hierarchy, and responsive rules from [Card Design System](./card-design-system.md). Assemble templates with HTML, CSS, and necessary JavaScript; test readability with representative real content. Keep front card width and height balanced, adjusting moderately to the window and word length. When the window grows taller, reposition the card area instead of stretching the entire page container to create a large empty space. On the back, check which information the reader encounters first, what should be secondary, and whether repeated containers feel monotonous. Adjust visual hierarchy to the content rather than applying fixed components.

**Dynamic effects and interactions:**

- Prefer CSS Animation and Transition for simple animations.
- Use JavaScript when interaction logic actually requires it.
- For audio buttons and similar controls, distinguish visual state changes from actual playback control.
- Consider compatibility with JavaScript and web features across Anki clients.
- Avoid unnecessary animations that distract from learning.

**Technical requirements:**

- Use HTML for content structure and CSS for styling and responsive layout; keep the visual language consistent on both sides.
- Use actual Note Type field placeholders, not example field names.
- Multiple Card Types under one Note Type may share CSS; scope styles to prevent interference.
- Preserve native Anki behavior for audio, media, and other special features, and check compatibility in the target client.

### 4. Design preview

After an initial card layout is ready, deliver an openable interactive HTML proposal page. Let the user switch layouts, themes, fronts and backs, and representative short and long words, then confirm a choice and provide further requirements after seeing the result. When the user asks to change front or back information, retain confirmed choices and update the same preview file.

**Preview data:**

- New Note Type: Prefer example data supplied by the user.
- Existing template: Prefer real data for the Note Type from `find_notes` and `notes_info`.
- If no data is available, use clearly labeled mock data.

**Preview requirements:**

1. Switch candidate layouts, themes, and card sides in one HTML file; show the final combination in that same file after selection.
2. Reproduce final HTML and CSS as closely as possible, with correct field content, order, and positions.
3. Check adaptation for the user's devices and specific issues; simple cards do not need separate previews for every layout, theme, word class, and screen combination.
4. Where supported and useful for judging the result, dynamically preview animations and interactive elements. Explain limitations for Anki-specific features or interactions that cannot be fully simulated.
5. When the user wants to compare designs, offer layouts with genuinely different structures or component hierarchies; color changes alone are not different layouts.

**Color scheme:**

If the user does not specify colors, recommend a theme from [Card Design System](./card-design-system.md) and provide theme options in the interactive HTML proposal page. Let the user compare layouts and themes in that file and confirm or add requirements in conversation; update the same file for later changes. Describe an openable file link clearly as a local HTML preview, not as an interaction within the conversation.

**Preview versus actual application:**

- Keep the preview as close as possible to the HTML and CSS ultimately written to Anki.
- Before delivery, inspect the preview against user requirements and known issues. Use real short and long words to assess focal points, supporting information, and repeated containers; fix purposeless whitespace, low contrast, overflow, or flat hierarchy. Judge audio controls, card placement, and client compatibility from Anki's actual presentation after implementation. A visible audio button in the preview or card text does not prove that playback works.
- A design preview does not mean a template was created or modified successfully.
- If the user requests only a design proposal, deliver the proposal and preview without requiring HTML/CSS source. Provide implementation code after the user selects a design or explicitly asks for code.
- Once the user has viewed the proposal and confirmed a specific card design and all required information is available, proceed without asking for the same confirmation again. For a bulk import with no layout specified yet, return the interactive front/back proposal page to the content import workflow for the user to inspect and confirm before writing the template.

### 5. Create or modify a Card Template

Choose the Anki MCP workflow for the relevant scenario.
Before any MCP write, check generated Front / Back HTML against the field reference constraints in Section 2. Fix mismatched fields or invalid references before writing.


**Scenario A: Add a Note Type and Card Template**

1. Obtain the new Note Type's name, field structure, and learning goal from [note-type-management.md](./note-type-management.md).
2. Prepare Front HTML, Back HTML, and Styling CSS from the front/back design and verify field references.
3. Hand the complete template configuration to Note Type management for creation, then verify the template from the creation result.

**Execution rules:**

- Prepare only the Card Types required by the learning goal. Additional question directions require support from user requirements.

**Scenario B: Modify an existing Card Template**

1. Use the field structure and user requirements from [note-type-management.md](./note-type-management.md) to identify the target Note Type and Card Template.
2. Read current Front / Back HTML with `model_templates`.
3. Read current CSS with `model_styling`.
4. Use `update_model_templates` to modify front/back HTML as needed.
5. Use `update_model_styling` to modify CSS as needed.
6. For local changes, prefer PATCH mode to preserve other content.
7. Replace complete content only when a full replacement is truly necessary.
8. If Anki has already updated template references after a field rename, inspect the result before making further changes.

**Execution rules:**

- Do not change template content the user did not ask to change.
- Do not modify a template by deleting and recreating its Note Type.
- Do not simulate Card Type deletion by clearing its HTML.
- Check effects on other Card Types before modifying shared CSS.
- Revise the plan before making unexpected changes with broad effects rather than overwriting the existing configuration.
- If the requested change already exists, do not write it again.

### 6. Verify results and report to the user

After MCP execution, read the actual configuration and verify the creation or modification.

**Verify new creation:**

1. Have [note-type-management.md](./note-type-management.md) confirm that the Note Type and fields were created.
2. Check front/back HTML with `model_templates`.
3. Check CSS with `model_styling`.
4. Confirm that the actual configuration matches the design.

**Verify modification:**

1. Reread the target Card Template's HTML.
2. Reread CSS.
3. Check placeholders against actual fields.
4. Check that content not requested for modification was preserved.
5. Confirm that this change was written correctly.

**User feedback:**

After the operation, briefly report:

- The target Note Type and Card Template.
- Whether the operation added, modified, or only viewed a template.
- The main content layout and styling work completed.
- The actual MCP execution result.
- Dynamic effects or compatibility issues the user should check in the Anki client.

For Note Type field changes and full-sync risks, [note-type-management.md](./note-type-management.md) provides guidance based on actual MCP status.

Do not equate successfully reading HTML/CSS configuration with verifying all interactions in the Anki client.

## Output Specification

When the user asks to implement, create, or modify a Card Template, or explicitly asks for code, provide the corresponding standard implementation code:

1. **Front Template HTML**: The complete HTML template for the front.
2. **Back Template HTML**: The complete HTML template for the back.
3. **Styling CSS**: The complete or necessarily modified CSS.
4. **JavaScript (as needed)**: Provide it only when needed for interaction, inside the appropriate template HTML.

Code requirements:

- Use Anki-supported field placeholder syntax, such as `{{FieldName}}`.
- Do not reference fields absent from the Note Type.
- Ensure complete HTML structure and valid CSS syntax.
- Deliver and write newly generated Front / Back HTML, CSS, and necessary JavaScript in readable multiline form: use consistent indentation, sensible line breaks for selectors, declarations, and structure, and blank lines between logical blocks. Add brief comments where useful; do not compress the whole code into one line. Use the same format for code shown in the preview.
- Remember that Anki CSS usually applies to the whole Note Type, not just one card.
- Do not submit JavaScript as a separate Anki MCP template configuration parameter.
- Avoid unrelated code changes for local modifications.
- Keep code as close to the design preview as possible.

If the user only wants to view a template, show its existing configuration and necessary explanation without generating new implementation code.

## Error Handling

- **Card Type structure limits**: Current tools can create one or more Card Types with a new Note Type, but cannot separately add, delete, rename, or reorder Card Types in an existing type. Changing existing template HTML/CSS does not perform these structural operations. Deleting a Card Type also affects its cards and review history.
- **Target or field mismatch**: A Note Type or template may be missing, have a different capitalization, reference nonexistent fields, or have front/back content that cannot produce a valid card. Verify the actual configuration first; do not guess names or change fields without authorization.
- **Shared styling and client compatibility**: Multiple Card Types of one Note Type may share CSS, and changes may affect cards in other Decks. Media and interactions may differ across clients; check the actual preview and target environment.
- **Execution anomalies**: If the connection fails, a content fragment cannot be matched, execution partially completes, or status is unclear, reread the current template before deciding whether to retry. Do not treat a design preview as a completed write or repeatedly overwrite a template while status is unknown.