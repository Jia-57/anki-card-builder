

# Note Type Management

## Description

Use when the user needs to view, create, or modify Anki Note Types and their field structures, including Note Type creation, field design, adding fields, renaming fields, and changing field order.

This Skill handles direct Note Type management requests and can be called by [vocabulary-and-content-import.md](./vocabulary-and-content-import.md). When adding learning content to an existing or new Deck, it determines whether a new Note Type is needed and designs and creates the required field structure.

When creating a Note Type, work with [card-template-management.md](./card-template-management.md) to design front and back layouts, then create the Note Type and Card Template together with one `create_model` call.

When adding content to an existing Deck, prefer a suitable Note Type already used there. For a new learning Deck, create a dedicated Note Type by default, using existing fields and Card Templates as references if useful. Reuse another Deck's Note Type directly only when the user explicitly wants to share it across Decks and the existing type is suitable.

## Workflow

### 1. Parse requirements and identify the scenario

Identify one of three scenarios from the user's request:

**Scenario A: Manage a Note Type directly**

When the user explicitly asks to view, create, or modify a Note Type, perform the requested operation.

This includes:

- Viewing existing Note Types and their field structures.
- Creating a new Note Type.
- Adding, renaming, or reordering existing fields.
- Inspecting related Note Type configuration.

**Scenario B: Add learning content to an existing Deck**

When [vocabulary-and-content-import.md](./vocabulary-and-content-import.md) needs to add words, collocations, or other learning content to an existing Deck:

1. Check the Note Types already used in the target Deck against the learning goal.
2. Prefer a suitable Note Type and Card Template already used in that Deck.
3. If the current fields or review method cannot support the learning goal, evaluate whether the different content needs a dedicated type.
4. Enter this Skill's structure design and creation workflow only if a Note Type really needs to be added or modified.
5. Return the selected Note Type and field information to the content addition workflow.

**Scenario C: Add learning content to a new Deck**

When [vocabulary-and-content-import.md](./vocabulary-and-content-import.md) needs to create a Deck and add content:

1. Consider suitable existing Note Types as design references based on the new Deck's learning goal and information to save.
2. Design a dedicated Note Type for the new Deck by default. Its fields and Card Template design may follow an existing type, but give it an independent name and configuration.
3. Reuse an existing type directly only if the user explicitly wants sharing across Decks and the type is suitable.
4. When adding a Note Type, work with [card-template-management.md](./card-template-management.md) on its layout.
5. After selecting or creating the type, return its configuration to the content addition workflow for Deck creation and content import.

**General principles:**

- A Note Type is not permanently bound to a Deck; multiple Decks may use one Note Type.
- One dedicated primary Note Type per Deck is this Skill's default management pattern. The type need not share the Deck's name, and a strict one-to-one relationship is not required.
- Do not create a Note Type for every import or individual word. A Deck may use several types when different content genuinely requires different fields or review methods.
- Do not automatically add Note Type fields just because the user adds new words.
- Follow an explicit request for a separate new Note Type.
- Do not assume a Note Type can handle all imports before checking field compatibility.
- Perform structural writes only when a Note Type must be created or changed.

### 2. Match and reuse a Note Type

For requests from [vocabulary-and-content-import.md](./vocabulary-and-content-import.md), first inspect types used in the target Deck; for a new Deck, read suitable existing types as design references. Evaluate direct reuse when the user explicitly requests sharing.

**Find candidate Note Types:**

1. Get existing Note Type names with `model_names`.
2. Select candidates using the user-specified Note Type, learning goal, and current content of the target Deck.
3. Inspect actual fields with `model_field_names`.
4. When needed, use `find_notes` and `notes_info` to identify Note Types used by existing Notes in the target Deck.
5. If card presentation matters, inspect relevant templates with `model_templates`.

Cards of a Note Type in the target Deck indicate actual use, not a permanent binding between that Deck and type.

**Matching criteria:**

Evaluate whether an existing Note Type is suitable by considering:

1. **Content fit**: Can it store the learning content the user wants to add?
2. **Field completeness**: Does it have fields required by the learning task?
3. **Field semantics**: Do existing field meanings fit the new content?
4. **Learning goal**: Do the Note Type and Card Template support the intended learning method?
5. **Template requirements**: Does the user need a field structure or review layout independent of the existing template?

**Handle matching results:**

- **A type in the target Deck matches fully**: Reuse it without adding fields or templates.
- **Only names differ, while meanings match**: Map fields correctly; prefer the type already used by the target Deck.
- **Optional fields are missing**: Preserve the existing structure if it still meets the core learning goal.
- **Required fields are missing**: Consider a new Note Type or changes to existing fields; do not modify an existing type without a request to do so.
- **Layout or learning method does not match**: Prefer evaluating a separate Note Type. Explain impacts on other Decks before changing a shared Card Template.
- **Several Note Types fit**: Consider the user's specified type and current use in the target Deck first; explain key differences if the choice remains unclear.

**Reuse requirements:**

- Reusing a Note Type does not require recreating its Card Template.
- A new Deck may use another type's fields, template, and styling as references; creating a dedicated type is neither direct reuse nor necessarily a complete clone.
- Do not rename existing fields solely because their names differ from the recommended convention.
- Do not automatically modify a Note Type when new content lacks optional information.
- Avoid changing public fields of a Note Type shared across Decks without a user request.
- Do not discard required content just to reuse a type that cannot satisfy explicit user requirements.

If the user wants an independent layout completely different from an existing Card Template while retaining the old layout, consider a new Note Type. Do not overwrite a template used by other Decks.

### 3. Design Note Type fields

When a new Note Type is needed, design field names, count, order, and purposes from user requirements, learning goals, and content to import.

When triggered by a bulk import, use that batch's content to explain the purposes of recommended fields, what maps directly, what needs completion or can remain empty, and why other optional fields are omitted. Return the recommendation to content import along with the card layout for user confirmation.

**User fully specifies the fields**

If the user specifies every field name and its order, follow that structure.

Do not add, remove, or change specified fields without authorization.

**User specifies some field requirements**

When the user specifies only part of the fields:

- Design specified fields as requested.
- Fill in only necessary unspecified fields from the learning goal.
- Recommend optional fields only if they have clear learning value.
- Avoid duplicate or semantically overlapping fields.

For example:

The user asks for an English vocabulary Note Type and only mentions storing words, translations, and examples.

Possible recommendations:

- `Expression`: word or fixed expression
- `Meaning`: translation or definition
- `Example`: example sentence
- `IPA`: phonetic transcription (optional)
- `Audio`: pronunciation (optional)

If the user explicitly requires only three fields, do not add others.

**User does not specify a field structure**

When the user describes only a learning goal or content type, design the full field structure.

Defaults:

1. **Core content**: Add a field for the primary learning object.
2. **Explanation**: Add a field for the translation, answer, or explanation.
3. **Supporting information**: Add examples, pronunciation, images, and similar fields according to the learning goal.
4. **Information separation**: Store different semantic content separately where practical.
5. **Simplicity**: Avoid unnecessary fields.
6. **Extensibility**: Allow later content additions and template changes.

For bulk vocabulary import, propose the following Vocabulary Import candidate structure according to the content and learning goal. Recommended fields need not be populated in every Note, and reusing an existing Note Type does not require renaming its fields:

| Field | Content and recommended conditions |
|---|---|
| `Word` | Word or headword; the core identification field. |
| `Meaning` | Core meaning in the specified language, for the target sense. |
| `Pronunciation` | Recommend IPA for English headwords and context-appropriate pinyin for Chinese headwords; do not require it where inapplicable. |
| `WordAudio` | Reference to an actual word audio file; unnecessary for Anki TTS. |
| `Examples` | Recommend 1–2 sentences for the target sense. Prefer authentic sentences for corpus-based extraction; if insufficient, leave empty or generate separately as the user chooses. |
| `ExampleTranslations` | Translation in the specified language corresponding to each example sentence. |
| `ExampleAudio` | Reference to actual example audio files; unnecessary for Anki TTS. |
| `Collocations` | Recommend useful common collocations; 2–4 is only a guideline. For corpus-based extraction, label only combinations that actually appear in the source as original collocations. |
| `CollocationTranslations` | Translation in the specified language corresponding to each collocation. |
| `CollocationAudio` | Reference to actual collocation audio files; unnecessary for Anki TTS. |

Corpus-based extraction should also preserve sources. Use a `Source` field or Tags according to the existing structure and the user's choice. Include audio fields in the final structure only when actual files need to be stored. Before recommending Anki TTS by default, check the target language and actual playback capability through the content import workflow.

If grammatical gender must be stored for German nouns, the article and noun may occupy separate fields; Card Template controls how they appear on the front. Separate storage does not imply requiring the user to recall an article from a bare noun. If the user specifies English meanings or collocation translations, keep field mapping and examples in English. Preserve the original and corresponding translation for every collocation rather than losing one to simplify template presentation.

When the user asks to remove information in a card design, distinguish hiding it on the card, clearing a field value, and deleting a Note Type field. By default, front/back presentation choices change only the Card Template, not saved fields or content. Handle an actual structural deletion separately after assessing its impact.

**Field naming rules:**

- Use short, clear names with definite meanings.
- Keep naming style consistent within one Note Type.
- Do not use duplicate field names.
- Avoid Anki special field names such as `Tags`, `Type`, `Deck`, `Card`, and `FrontSide`.
- Users may choose their own names; do not require `Word`, `Meaning`, `Example`, or other fixed names.
- Do not rename existing fields without a user request.

**Field order:**

- Prefer the core content that identifies the learning object as the first field.
- Order other fields by entry workflow, frequency of use, and semantic relationships.
- Anki uses the first field to help detect duplicate Notes, so change it carefully.
- Field storage order is independent of display order in Card Templates.

### 4. Coordinate new Note Types and Card Templates

Follow this process when the user directly asks for a Note Type or the content addition workflow determines one is needed.

**Creation workflow:**

1. Determine the Note Type name and final fields using Section 3.
2. Check whether the name already exists with `model_names`.
3. Provide field names, purposes, learning goal, and user layout requirements to [card-template-management.md](./card-template-management.md).
4. Have Card Template management design Front Template HTML, Back Template HTML, and Styling CSS.
5. Obtain the complete template configuration.
6. Check template field references against final fields.
7. For a bulk import, return the fields and card layout to content import for user confirmation before proceeding. Do not ask again about a confirmed plan.
8. Create the Note Type, fields, and Card Templates together with one `create_model` call.
9. Record the actual MCP creation result.

**Creation requirements:**

- `create_model` must include both field structure and card template configuration.
- Do not create the Note Type before template design is complete.
- Create one set of front/back templates that meets the learning goal by default.
- Design multiple Card Types only when the user explicitly needs multiple review directions.
- Do not call `create_model` repeatedly for the same Note Type.
- Do not modify an existing Note Type with the same name as a substitute for creating a new one.
- Creating a Note Type does not mean a Deck or Notes have been created.

**Handoff to content addition:**

If [vocabulary-and-content-import.md](./vocabulary-and-content-import.md) triggered creation:

1. Return the Note Type name and fields after successful creation.
2. Provide the mapping between content to import and Note Type fields.
3. Tell content addition that the corresponding Card Template was created.
4. Let content addition create or select the Deck and add Notes.
5. Do not repeat content addition inside this Skill.

If `create_model` fails, do not import content using that Note Type as if it existed.

### 5. Modify an existing Note Type

When the user directly requests changes to an existing Note Type, or field changes are needed and explicitly authorized, perform the corresponding field operations.

Before changing anything, get the actual configuration with `model_names` and `model_field_names` and determine the change scope.

**Add a field**

Use `model_field_add`:

1. Confirm that the target Note Type exists.
2. Check that the new field name does not conflict with existing fields.
3. Determine insertion position from user requirements.
4. Append it to the end by default if no position is specified.
5. Add the field.
6. Reread the fields and verify the result.

Notes:

- A new field does not automatically appear in the Card Template.
- If the user wants it displayed, coordinate a layout change with [card-template-management.md](./card-template-management.md).
- Do not extend a shared Note Type without a user request simply because the content addition workflow needs more information.

**Rename a field**

Use `model_field_rename`:

1. Confirm that the target field exists.
2. Check that the new name does not conflict with existing fields.
3. Rename the field.
4. Reread the fields and verify the change.
5. If needed, inspect template field references with `model_templates`.

Anki normally updates corresponding Card Template field references when it renames a field.

Do not change the template again without checking.

**Reorder fields**

Use `model_field_reposition`:

1. Get the current field order.
2. Determine the target order from user requirements.
3. Convert the target position to the 0-based index expected by MCP.
4. Reposition the field.
5. Reread the field list and verify it.

If the first field changes, tell the user it may affect duplicate Note detection.

**Modification principles:**

- Change only fields the user explicitly identifies.
- Preserve other fields and existing data by default.
- Do not add a new field as a substitute for renaming one.
- Do not recreate a Note Type to simulate changing its existing structure.
- Reordering stored fields does not require changing Card Template display order.
- If the configuration already meets the request, do not write it again.
- Changes to a Note Type used by several Decks affect the entire type, not just one Deck.

**Sync considerations:**

- `model_field_add` and `model_field_reposition` require a one-way full sync next time.
- `model_field_rename` usually does not trigger a full sync by itself.
- Explain relevant sync risks before execution to avoid overwriting unsynced data on other devices.
- Afterward, report the actual `will_force_full_sync` status returned by MCP.
- Do not call `sync` without authorization.

### 6. Handoff to other workflows

For requests from [content addition](./vocabulary-and-content-import.md), receive the target Deck, learning goal, information to save, and user field or display requirements. Return the final type, actual fields, template status, and execution result for mapping field values and writing Notes. The Output Specification below lists the return items.

For a new type, pass field names, purposes, and display requirements to [Card Template management](./card-template-management.md), then create the type centrally under Section 4 after obtaining a valid template configuration. The corresponding workflows own field structure and card presentation separately; coordinate with templates as needed even for direct Note Type management.

Do not bypass actual MCP capability limits. If a related specification cannot be accessed, do not claim it was read or executed.

### 7. Verify results and report to the user

After creating or modifying a type, verify the actual result with read-only MCP tools.

**New Note Type:**

1. Confirm the new Note Type exists with `model_names`.
2. Check its fields with `model_field_names`.
3. Check front/back templates with `model_templates`.
4. Check CSS with `model_styling` if needed.
5. Confirm that the result meets the original learning goal.

**Modified Note Type:**

1. Reread the field list.
2. Check names and order against user requirements.
3. Confirm that fields not requested for change remain.
4. Check Card Template field references if needed.
5. Confirm the actual MCP execution result.

**User feedback:**

For direct Note Type management, briefly report:

- The Note Type name.
- The operation performed.
- The final fields.
- Any effect on related Card Templates.
- MCP status and necessary sync guidance.

When triggered by content addition:

- Return the selected or created Note Type upstream.
- Explain whether it reuses the target Deck's type, creates a dedicated type for that Deck, or shares another type as requested.
- Provide field mapping and configuration needed for import.
- Avoid reporting every internal Skill step to the user.
- Let content addition consolidate the final result.

If some steps fail, report completed and incomplete operations separately.

## Output Specification

Return information appropriate to the operation and caller.

**1. View a Note Type**

Output:

- Note Type name
- Field names and order
- Field purposes, when verifiable
- Other configuration requested by the user

**2. Add a Note Type**

Output:

- Note Type name
- Complete field structure
- Corresponding Card Template creation status
- Actual MCP creation result

**3. Modify an existing Note Type**

Output:

- Changed fields
- Differences before and after
- Final field structure
- Actual MCP execution result

**4. Called by content addition**

Prefer structured internal handoff information:

- `model_name`: Name of the selected or created Note Type
- `field_names`: Actual field list
- `field_mapping`: Suggested mapping from content properties to actual fields when verifiable; content addition checks the final mapping
- `model_action`: reused / created / modified
- `template_status`: Actual state of the related Card Template
- `success`: Whether Note Type preparation succeeded

These are conventions for handoff between Skills, not a claim that Anki MCP returns the same format.

**Output requirements:**

- Do not invent Note Types, field names, or MCP results.
- Do not describe a design proposal as a successful creation.
- Do not output Card Template HTML/CSS source by default.
- Do not give long, repetitive user feedback because internal Skills coordinate.
- Base all creation and modification status on actual MCP results.

## Error Handling

- **Capability limits**: Current tools do not expose operations to delete or rename Note Types, clone them completely, bulk convert existing Notes to another Note Type, or independently add or delete Card Types in an existing type. Creating a similar type does not accomplish those operations; follow actual runtime capabilities.
- **Data loss risk**: `removeModelField` can delete a field, clearing its data from every Note of that Note Type. Distinguish field deletion, clearing field values, and hiding a field on cards; confirm the impact scope before deletion.
- **Configuration mismatch**: Duplicate Note Type names, absent or duplicate fields, mismatched field meanings, and Card Templates referencing invalid fields are possible. Check actual configuration; do not guess names or drop necessary content merely to reuse a type.
- **Shared types and dependencies**: Changing a shared type affects other Decks. A new type needs valid fields and Card Templates before content import can use it. Creating a dedicated type does not automatically convert existing Notes.
- **Execution and sync anomalies**: On connection failure, partial success, or unclear results, inspect actual state before retrying. Follow Anki's actual prompts for sync requirements after structural changes; do not treat a proposal or preview as a completed write or sync automatically.