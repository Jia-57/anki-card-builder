
# Vocabulary and content import

## Description

Use when the user needs to add words, collocations, phrases, example sentences, or other learning content to Anki.

Extract, organize, and import learning content from directly entered text, vocabulary lists, structured tables, documents, web pages, articles, audio, and other sources. Prepare data suitable for Anki Note Type fields according to the learning goal.

This Skill is the main coordinator for content addition. It handles extraction, data organization, target Deck selection, Note Type matching, field mapping, duplicate checks, and writing Notes.

Collaboration with other Skills:

- [note-type-management.md](./note-type-management.md): Matches or creates a suitable Note Type and manages its fields.
- [card-template-management.md](./card-template-management.md): Designs front/back card layouts, visual styling, and templates.

When adding content to an existing Deck, prefer a suitable Note Type already used there. For a new learning Deck, create a dedicated Note Type by default, using existing fields and Card Templates as design references if useful. Reuse another Deck's Note Type directly only when the user explicitly wants sharing across Decks and the existing type fits.

This Skill adds Note data; Anki generates Cards automatically from the Note Type's Card Templates.

## Workflow

### 1. Parse requirements and identify the import scenario

Identify the user's content source, learning goal, target Deck, content to add, and other import requirements.

**Scenario A: Add content to an existing Deck**

When the user names an existing Deck:

1. Confirm that the target Deck exists.
2. Determine which fields the content needs.
3. Prefer a suitable Note Type and Card Template already used by the target Deck.
4. Add Notes after mapping fields.

**Scenario B: Create a Deck and add content**

When the user explicitly asks to create a Deck:

1. Determine its name and hierarchy.
2. Analyze the content structure and learning goal.
3. Use existing Note Type fields and Card Templates as references and design a dedicated Note Type for the new Deck by default.
4. Reuse an existing type directly only if the user explicitly wants sharing across Decks and the type fits. Otherwise, have Note Type and Card Template management create a dedicated type.
5. Prepare and create the target Deck.
6. Add the content.

**Scenario C: No target Deck specified**

When the user asks to add words or learning content without specifying a Deck:

1. Get existing Decks with `listDecks`.
2. Infer possible targets from the user's context and existing Deck content.
3. Use a clearly identifiable target Deck if one exists.
4. Do not select a Deck or create one without a reliable basis.
5. Ask the user for the necessary target information.

**Scope of requirement analysis:**

- **Content sources**: User input, tables, web pages, articles, documents, audio, and so on.
- **Learning content**: Words, phrases, collocations, example sentences, meanings, and so on.
- **Target Deck**: Existing, new, or undetermined.
- **Note Type**: A user-specified type or one to match automatically.
- **Learning goal**: Meaning recognition, spelling recall, collocation learning, contextual understanding, and so on.
- **Content requirements**: Translations, part of speech, IPA, examples, pronunciation, and other supporting information.
- **Pronunciation needs**: Consider Anki TTS by default for vocabulary import. Check whether the user explicitly does not want speech, requests another method, and can play the target language in the actual client before including it in the import plan.
- **Image needs**: Evaluate whether images help memory only when the user requests them; let the user choose among Emoji, image search, and image generation.
- **Import scope**: All content, specified entries, or automatically selected entries.
- **Corpus-based extraction**: Use when the user supplies sentences, paragraphs, articles, subtitles, or transcripts and wants vocabulary selected from authentic context. File format such as TXT does not itself determine the workflow; a plain word list is still handled as a word list.

**Global principles:**

1. Prioritize explicitly specified content, format, target Deck, and fields.
2. Complete unspecified minor details according to the learning goal.
3. Prefer a suitable type already used by an existing Deck. Create a dedicated type for a new learning Deck by default, but not for every import, and do not require a Deck to use only one type.
4. Do not discard important information the user explicitly wants saved merely to fit existing fields.
5. Do not change a Note Type or Card Template used by another Deck without a user request.
6. Do not write to Anki when the user only asks to extract, organize, or preview content.
7. Enter the write workflow only when the user explicitly asks to add or import content.

### 2. Extract and organize content from multiple sources

Extract learning content from the sources the user provides.

**Corpus-based vocabulary extraction (Context-Based Vocabulary Extraction)**

When a source contains authentic sentences or continuous context and the user wants vocabulary extracted from it:

1. Read the actual source first and identify its language, content, and quotable original sentences. Prioritize target words specified by the user.
2. If the user has not specified a selection scope or difficulty and this affects selection, ask for a target level or learning stage, such as A1–C2, HSK, or JLPT.
3. Prefer useful content verbs, nouns, and fixed expressions present in the source. Deduplicate and rank them by target level, learning value, and contextual importance. Do not pad the list with words absent from the original.
4. Extract authentic source sentences containing target words. Record only collocations that actually occur in the source, preserving their relationship to the target word and sense.
5. Summarize candidates without usable original examples or collocations and ask whether to leave those fields empty or generate supplementary examples or collocations separately. If generated, clearly distinguish generated content from source content in previews and saved information; do not label it extracted from the original.
6. Preview candidate words, source sentences and collocations, sources, missing items, and proposed fields, then proceed with the user-confirmed scope.

**Directly entered vocabulary or text**

Includes:

- One word or phrase.
- A list of words.
- Words and their translations.
- Mixed text containing words, meanings, and examples.
- Other learning material supplied directly by the user.

Processing rules:

1. Identify each independent learning item.
2. Preserve user-provided words, meanings, and examples.
3. Organize unstructured text into consistent data.
4. Add necessary information according to the learning goal.
5. Do not change original meanings without a basis.

**Structured tables**

Includes CSV, TSV, Excel, and other readable tabular content.

Processing rules:

1. Identify headers and the meaning of each column.
2. Determine the learning item in each row.
3. Preserve relationships among original fields.
4. Mark missing values or fill them as needed.
5. Do not drop information solely because column names differ.
6. Map the resulting data to Anki Note Type fields.

File-reading capabilities depend on the current Agent environment and available tools.

**Web pages, articles, and documents**

When the user supplies a web link, article, or document:

1. Read the actual content using tools available to the current Agent.
2. Extract specified words, phrases, or learning points.
3. If no particular vocabulary is specified, select useful content according to the learning goal.
4. Prefer preserving the word's original context.
5. Extract relevant examples, meanings, and other supporting information as needed.
6. Keep only content needed for import; do not copy the entire article by default.

If the original source cannot be accessed, do not pretend extraction is complete.

**Audio and other media**

When the user supplies audio or media containing language:

1. Obtain available transcription or actual media content if the environment supports it.
2. Extract words, expressions, sentences, or other learning content as requested.
3. Organize context and meanings when needed.
4. Mark content that cannot be identified reliably.
5. Explain missing transcription or recognition capabilities; do not invent audio content.

Audio transcription and extraction are not direct Anki MCP functions. Use only source-processing capabilities actually available to the current Agent.

**Shared organization principles:**

- Preserve user-specified learning content and its original meaning.
- Do not invent sentences absent from the source and claim they came from it.
- Distinguish automatically generated examples, meanings, and supplementary information from the original source.
- Preserve the relationship between a word and its meaning, examples, and context.
- Authentic examples and collocations from corpus-based extraction must be findable in the source. If absent, follow the user's choice to leave them empty or generate supplementary content; do not fabricate a source to meet a recommended count.
- Suggest corrections for obvious spelling errors, but do not change proper nouns or explicitly specified content without checking.

### 3. Structure and complete learning content

Organize extracted learning content into consistent data for later field mapping.

**Vocabulary learning content**

Depending on user requirements, it may include:

- Expression: word, collocation, or fixed expression
- Meaning: core meaning or translation
- Pronunciation: IPA for English headwords or context-appropriate pinyin for Chinese headwords; choose representations for other languages according to actual learning needs
- PartOfSpeech: part of speech
- Examples: example sentences, preferably authentic source sentences for corpus-based extraction
- ExampleTranslations: translation corresponding to each example sentence
- Collocations: collocations, preferably combinations actually found in the source for corpus-based extraction
- CollocationTranslations: translation corresponding to each collocation
- WordAudio, ExampleAudio, CollocationAudio: references to actual audio files when needed; Anki TTS does not require these fields
- Source: content source
- Notes: other supplementary information

These are semantic properties for internal organization, not a requirement to create Anki fields with these names.

Use the selected Note Type for final field names and stored content.

**Complete language- and part-of-speech-specific information:**

Add reliably determinable information with clear learning value based on the language, actual part of speech, and final fields. For German, for example:

| Content | Useful specific values | Notes |
|---|---|---|
| Nouns | Article (der/die/das), plural, and genitive form if needed | Match the article to the specific sense; preserve context for multiple valid forms. |
| Verb forms | Third-person singular present, past, past participle, and perfect-tense auxiliary | Fill final fields separately instead of mixing forms into one ambiguous value. |
| Verb patterns | Governed case or fixed preposition patterns | Governed case is different from conjugation; verify it against the specific sense and usage. |
| Adjectives | Comparative, superlative, and necessary collocations | Add only when the learning goal and fields call for them. |

For other languages, choose pronunciation, gender, irregular forms, inflections, or collocations according to the language. Preserve context for multiple senses or valid forms. Leave inapplicable fields empty rather than inventing content to fill them.

These are values in individual Notes, identified and filled by this Skill. [note-type-management.md](./note-type-management.md) decides whether separate fields are needed; [card-template-management.md](./card-template-management.md) controls front/back display. Follow explicit requests to retain only original material or limit fields.

**Content completion rules:**

1. Preserve user-provided content first.
2. Add necessary meanings, examples, or other information according to the learning goal. In corpus-based extraction, if source examples or collocations are missing, ask as described in Section 2 before deciding to leave them empty or generate and label supplementary content.
3. Do not automatically fill many fields unrelated to the learning goal.
4. For polysemous words, prefer the sense specified by the user or present in the source context.
5. Preserve complete collocations and their meanings where possible; do not split them arbitrarily into isolated words.
6. Do not invent information without a reliable basis.
7. Do not generate extra study material when the user explicitly requests an import of original content only.

**Information completeness:**

- Every item should have core information that identifies it.
- For missing essential content, first try to complete it from supplied sources.
- If completion is unreliable, mark the item for follow-up instead of treating guesses as facts.
- Optional fields may remain empty as appropriate.
- Keep completed content consistent with the user's intended learning method.

**Batch organization:**

When importing several words or learning items:

1. Organize content into separate items.
2. Check for duplicates or obvious conflicts within the batch.
3. Preserve valid items with different contexts or learning meanings.
4. Do not merge distinct learning items just because capitalization or form is similar.
5. Merge or mark clearly duplicate source records.

### 4. Select or create a Deck

Use the target Deck determined in Section 1.

**Existing Deck**

1. List existing Decks with `listDecks`.
2. Check whether the target name exists.
3. Use the name specified by the user to identify the final target.
4. Do not create another Deck just because a Deck has the same or a similar name.

**New Deck**

1. Determine the name and hierarchy from user requirements.
2. Check whether it already exists with `listDecks`.
3. Confirm that its hierarchy is valid under current MCP capabilities.
4. After content and Note Type configuration are ready, create it with `createDeck`.
5. Record the actual MCP creation result.

**Deck structure rules:**

- Anki uses `::` for parent/child Deck hierarchy.
- If the user only says "create a Deck" without naming a parent, treat it as an independent top-level Deck. Create a subdeck only when the user explicitly requests one, names a parent, or provides a `parent::child` hierarchy. Existing similar Decks or date-based subdecks may inform naming but do not automatically become its parent.
- Use `::` for hierarchy and verify name validity from the actual `createDeck` result; current tools do not declare a fixed two-level limit.
- Create a dedicated Note Type for a new learning Deck by default, without requiring the type and Deck to share a name. Its name should identify the Deck and content category and be unique in the collection.
- Creating a Deck does not mean Notes were added.

**Additional rules:**

- Multiple Decks may reuse one Note Type.
- One Deck may contain cards generated from different Note Types.
- Do not assume the target Deck has a permanently bound Note Type.
- One dedicated primary Note Type per Deck is this Skill's default pattern; a Deck may use other types when different content needs different fields or review methods.
- Do not create a Deck and Note Type automatically for each article or import. Use Tags or Source to distinguish sources or batches.
- Use a normal Deck for ordinary content addition; do not use a filtered Deck as regular storage without a user request.

### 5. Match Note Types and coordinate Card Templates

Before writing content, give [Note Type management](./note-type-management.md) the target Deck, learning goal, language, distribution of parts of speech, content structure, user-specified type, and display requirements, if any. Have it verify field and template compatibility. If field names differ but meanings match, map actual fields rather than creating a type for that reason alone.

When a new type is needed, Note Type management obtains front/back templates from [Card Template management](./card-template-management.md) and creates the type centrally. Once the final type, actual fields, template status, and creation result are available, continue field mapping and import. If preparation fails, pause Notes writes that depend on that type.

Do not modify a shared Note Type or Card Template without a user request. Adding a type to an existing Deck affects future Notes only; old Notes are not converted automatically. Verify capabilities and results separately if migration is needed.
### 6. Map fields and check before import

Map organized learning content to Anki Note fields using the final selected Note Type.

**Field mapping:**

1. Get actual field names with `modelFieldNames`.
2. Map organized learning content to those fields.
3. Base mapping on meaning, not fixed field names.
4. Every output field name must match an actual Note Type field.
5. Do not write content to nonexistent fields.
6. Do not add fields to solve a mapping problem without authorization.

For example:

| Learning content property | Note Type field |
|---|---|
| Word or collocation | Expression |
| Chinese meaning | Meaning |
| Example sentence | Example |
| IPA | IPA |

If the target Note Type uses `Word` instead of `Expression`, map to its actual `Word` field.

**Data format requirements:**

- Use strings accepted by Anki MCP as field values.
- Preserve necessary multiline content, HTML, and media references.
- Do not arbitrarily remove or replace special characters, IPA, or non-English text the user wants preserved.
- Do not treat Card Template HTML as Note field data.
- Do not place actual field content in Note Type configuration by mistake.

**Pre-import checks:**

Before calling MCP to write Notes, verify that:

1. The target Deck exists or was created successfully.
2. The target Note Type exists and is configured validly.
3. Field mapping uses actual field names.
4. Every Note has a nonempty core learning field.
5. The content meets the minimum conditions for the template to generate valid cards.
6. Media references point to available files.
7. Necessary duplicate checks are complete.

If a check fails, fix the issue before writing.

### 7. Check duplicates and handle existing Notes

By default, use the word or collocation to memorize as the duplicate key, and check only the target Deck itself, excluding subdecks. The same headword in another Deck is not a conflict.

**Duplicates within the batch:**

1. Check whether the import list contains identical memory headwords.
2. Mark identical headwords as duplicates. If their meanings or contexts differ, flag that difference without automatically merging them or adding a second Note.

**Existing content in Anki:**

1. Use `findNotes` to restrict the search to the exact target Deck, excluding subdecks, and check the Note Types used there.
2. When needed, read actual fields with `notesInfo` and compare the content holding the memory headword.
3. Match headwords precisely rather than treating partial textual similarity as a duplicate.
4. Use valid Anki query syntax and escape special characters when needed.
5. If a search returns too many results, read `notesInfo` in batches of at most 100 IDs and verify them. Do not describe unchecked results as fully checked.

Anki's default duplicate detection mainly uses the first field within one Note Type; it does not replace checks by target Deck and memory headword.

Therefore:

- An identical memory headword is a duplicate within the target Deck even across Note Types.
- The same headword in another Deck is not a conflict for this import.
- By default, skip and report different meanings or uses of the same word; supplement the existing Note only when the user requests it.

**Default duplicate handling:**

- When adding Notes, prefer an interface supporting `duplicateScope: "deck"` and keep `allowDuplicate: false`.
- Skip existing duplicate content by default or explain it to the user.
- Do not enable `allowDuplicate: true` automatically to bypass checks.
- Consider allowing duplicates only if the user explicitly wants duplicate entries.
- Do not overwrite fields of an existing Note just because a duplicate was found.
- If the current interface lacks a Deck-scoped duplicate option, use another available interface that supports it. If none is available, explain the limitation; do not treat whole-collection results as target-Deck results.

**When the user asks to update existing content:**

If the user explicitly asks to supplement or update an existing Note:

1. Identify the target Note with `findNotes` and `notesInfo`.
2. Check which fields need changes.
3. Preserve fields not requested for modification.
4. Use the available Anki MCP interface: `update_notes` for batches or `updateNoteFields` per Note, passing only the fields to change.
5. Prepare and review a change list before a batch update; run `dry_run` first if the interface offers it. Follow the selected interface's tool names and parameters instead of mixing naming conventions.
6. Verify actual results after writing.

Updating existing Notes and adding new Notes are distinct operations.

### 8. Handle media and Tags

**Media content**

**Pronunciation and speech:**

1. When the user does not specify a speech method for vocabulary import, propose Anki TTS by default. Do not add speech if the user explicitly declines it. Recommending TTS does not prove playback works or justify creating an audio file field.
2. Before using speech, check whether the target Anki client has a suitable voice for the language, and test it with an actual headword. A temporary template may use `{{tts-voices:}}` to list voices. Valid template syntax or a visible play button cannot substitute for an actual playback test. If the required voice is unavailable or cannot be verified, explain why and offer feasible choices: install a suitable voice, use another available voice the user accepts, create real audio files after confirming source and cost and store them in Anki, or omit speech for now. Let the user decide; do not present failing or unverified TTS as completed pronunciation.
3. Once a working speech method is confirmed, have [note-type-management.md](./note-type-management.md) determine the final fields and text to read. Have [card-template-management.md](./card-template-management.md) decide which side uses Anki TTS, such as `{{tts de_DE:Expression}}`, or actual audio references. Avoid front-side speech that reveals an answer meant to be recalled. Anki TTS does not generate audio files automatically. If using only TTS, do not add an `Audio` field or call `storeMediaFile` for that reason. Before changing a reused Note Type, check the impact on its shared Card Template.

**Image selection:**

1. Consider whether images help understanding or memory only when the user asks for them. If their value is unclear, explain rather than adding images merely to fill a field.
2. Explain options: Emoji can work for concrete objects with clear meanings, usually need no extra image file, and reduce media storage and sync size, but rendering may vary across devices. If Emoji do not fit and real appearance, a scene, or details have learning value, recommend searching for an appropriate image. The user may also choose image generation.
3. After the user selects an option, have Note Type management determine whether an image field is needed and Card Template management determine its position. Save Emoji as text. Treat searched or generated images as media files only after actually obtaining and verifying them. Do not treat an option the user has not selected as an authorized image method.

**Actual audio and image files:**

When the user supplies audio or chooses an actual image file:

1. Check whether an accessible real media file or URL was provided.
2. Use `storeMediaFile` to save media to Anki's media directory when needed.
3. Build Note field references from the actual filename returned by MCP.
4. Use Anki-supported reference syntax for the media type.
5. Confirm successful media storage before adding the Note.

For example:

Audio field:

`[sound:example.mp3]`

Image field:

`<img src="example.jpg">`

These only illustrate the format. Actual filenames must come from successfully stored media files.

**Media handling requirements:**

- Do not describe nonexistent media as uploaded.
- Do not treat an external audio URL alone as an Anki native audio reference.
- Do not describe Anki TTS as a generated audio file or assume Anki MCP can automatically generate pronunciation audio.
- Do not reference nonexistent media using unverified filenames.
- If media storage fails, report the failure rather than claiming a normal import.

**Tags**

Add appropriate Tags to Notes according to user requirements and content sources.

For example:

- `Vocabulary`
- `Collocation`
- `IELTS`
- `Source::Article`

Processing rules:

1. Prioritize Tags explicitly specified by the user.
2. Recommend concise classification Tags based on the learning goal or source when useful.
3. Avoid excessive redundant Tags.
4. Keep Tag naming consistent within a batch.
5. Pass Tags to MCP as a string array.
6. Do not confuse Tags with Deck hierarchy.
7. Do not change Tags on other Notes without a user request.
### 9. Create and write Notes in batches

After extraction, Deck selection, Note Type matching, field mapping, and necessary checks, perform the actual write.

**Create one Note**

Use `addNote` when adding a single Note.

Pass:

- `deckName`: Target Deck name
- `modelName`: Selected Note Type name
- `fields`: Actual field names and corresponding content
- `tags`: Optional Tag array
- `allowDuplicate`: false by default
- `duplicateScope`: `deck` by default

**Create multiple Notes**

Prefer `addNotes` when adding multiple Notes.

Execution rules:

1. Notes in one `addNotes` call must use the same Deck and Note Type, with 1–100 Notes per batch.
2. Import separate combinations of Deck and Note Type in separate calls.
3. Give each Note independent field data and optional Tags.
4. Shared Tags may add a consistent label to the batch.
5. Do not bypass Anki duplicate checks by default.
6. Set `duplicateScope: "deck"` when using an interface with Deck-scoped duplicate detection.
7. A successful batch call does not prove every Note was created.

**Write order:**

1. Extract and structure content.
2. Determine the target Deck and Note Type.
3. Propose field mapping and a card layout from content to import. If a Note Type, fields, or Card Template must be created or changed, show the specific plan and confirm it with the user first.
4. Create necessary Note Types and Card Templates.
5. Create the target Deck if it does not yet exist.
6. Map actual fields and run pre-write checks.
7. Choose `addNote` or `addNotes` based on count and grouping.
8. Read the MCP result.
9. Verify created, skipped, and failed records.

**Execution requirements:**

- Follow the pre-write agreement in the [root entry point](../SKILL.md) when writing Notes; explain material plan changes again.
- Do not write when the user requests only design, extraction, or preview.
- Do not call addition tools before the target Note Type and Deck are ready.
- Do not blindly retry already successful records by repeating a batch-add call.
- Do not count multiple Cards generated from one Note as multiple added Notes.

### 10. Verify import results and report to the user

After MCP writes, check actual execution results.

**Verification workflow:**

1. Check the status returned by `addNote` or `addNotes`.
2. Collect IDs of successfully created Notes.
3. Read actual reasons for skipped or failed items.
4. Check added Note fields with `notesInfo` when needed.
5. Compare actual fields with the expected mapping.
6. Use appropriate read-only tools when card display or the target Deck needs further verification.
7. If Deck Override or other card-generation settings apply, rely on actual card results.

**User feedback:**

After import, briefly report:

- Target Deck.
- Note Type used.
- Whether it reuses the target Deck's type, creates a dedicated type for that Deck, or shares another type at the user's request.
- Number of Notes attempted.
- Number of Notes created successfully.
- Skipped or failed counts and main reasons.
- Necessary media or Card Template caveats.

**When called by another workflow:**

Return structured handoff information:

- `deck_name`: Actual target Deck
- `model_name`: Actual Note Type used
- `model_action`: reused / created
- `total_items`: Number of items prepared for import
- `created_count`: Number of Notes created
- `skipped_count`: Number of items skipped
- `failed_count`: Number of items that failed
- `note_ids`: IDs of created Notes
- `success`: Actual completion status of this task

These are conventions for Skill handoff, not a claim that Anki MCP returns the same format.

For partial success, clearly distinguish completed from incomplete content.

## Output Specification

Return information appropriate to the user's request and the actual stage reached.

**1. Extract and organize content**

When the user asks only to extract or organize content from a source, return structured learning content.

For example, a table may show:

| Expression | Meaning | Example |
|------------|---------|---------|
| take into account | consider | We must take the cost into account. |
| come across | encounter by chance | I came across an old friend. |

This illustrates a format; choose actual fields from user requirements.

**2. Preview before import**

For bulk imports, show a concise import plan. If a Note Type, fields, or Card Template will be created or changed, also show field recommendations and front/back previews based on content to import, then confirm them with the user before writing. For large amounts of content, complex mapping, or an explicit preview request, show representative entries including:

- Content to import.
- Target Deck.
- Selected Note Type.
- Field mapping.
- Estimated item count.
- Possible duplicates or missing information.
- For corpus-based extraction, original source locations, authentic examples and collocations, and supplementary content generated separately as the user chooses. Summarize missing items so the user can choose to leave them empty or generate content.

Do not force several rounds of design confirmation merely because the user did not ask for a preview. Do not ask again about a confirmed plan.

**3. Actual import**

After import, prioritize a concise execution summary:

- Target Deck
- Note Type
- Number created successfully
- Number skipped
- Number failed
- Necessary next steps

**4. Code and data requirements**

- Note data must use actual field names.
- Field values must correspond to actual learning content.
- Do not invent media paths or filenames.
- Do not confuse Card Template code with Note field data.
- Do not describe mere data preparation as a successful Anki import.
- Do not output complete HTML/CSS template code by default unless the user explicitly requests it.

## Error Handling

### 1. MCP unsupported or limited

Current MCP tools do not directly import CSV, Excel, or APKG files. After reliably reading and parsing ordinary tables, use `addNote` or `addNotes` to create Notes; do not call this a complete package import or claim it restores review history. Current tools cannot independently add or delete Card Types in an existing Note Type, nor bulk convert existing Notes to another Note Type. Verify Deck hierarchy from the actual `createDeck` result rather than repeating the old claim of a fixed "two-level limit." Explain unsupported structural operations and feasible Anki desktop steps.

### 2. Source, configuration, and mapping problems

When a web page, file, or audio cannot be read, state what could not be obtained and continue with verifiable parts without inventing source text or transcription. If a target Deck/Note Type is missing, field names differ, core content is missing, or a template does not fit, verify with read-only tools such as `listDecks`, `modelNames`, and `modelFieldNames`, and involve Note Type or Card Template workflows when needed. Do not guess fields, discard information the user wants saved, or treat incomplete structural preparation as ready for writes.

### 3. Cross-Skill and duplicate handling

If Note Type or Card Template preparation fails, pause dependent Notes writes and return completed and incomplete steps upstream. Check duplicates within the batch separately from existing Notes in the target Deck. Skip identical headwords in the target Deck by default. Do not set `allowDuplicate: true` automatically or overwrite old Notes without authorization. Use the existing-Note update workflow when the user requests updates.

### 4. Execution failures, media, and sync risks

Do not reference nonexistent filenames after media storage fails; pause affected items when required media is missing. Inspect created, skipped, and failed results for each `addNotes` item and retain created Note IDs. On timeout or uncertain status, query first and retry only after checking to avoid duplicate cards. Explain changes to shared types and actual sync prompts. A local import is not an AnkiWeb sync; do not call `sync` without authorization. Do not describe successful extraction, field mapping, or preview as an import of Notes.