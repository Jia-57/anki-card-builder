---
name: anki-card-builder
description: Use when users need to view, create, or adjust vocabulary learning content in Anki; select vocabulary, original example sentences, and collocations from articles, subtitles, transcripts, or TXT files containing authentic context; or organize and bulk import vocabulary from word lists, spreadsheets, documents, web pages, and other sources. Supports selecting or creating hierarchical Decks, managing Note Type fields and existing Notes, and designing Card Template fronts and backs, themes, and audio/image presentation.
---

# Anki Card Builder
Anki Card Builder turns vocabulary learning goals into reviewable Anki cards, aligning learning content, field structure, and card presentation.
## Workflow

First identify whether the user wants to change learning content, field structure, or card presentation; enter only the relevant workflow.

| User goal | Main workflow | Handoff as needed |
|---|---|---|
| Extract, import, or update vocabulary and Note content | [Vocabulary and content import](references/vocabulary-and-content-import.md) | Hand off to the workflows below if fields or templates are unsuitable |
| View, create, or adjust Note Types and fields | [Note Type management](references/note-type-management.md) | Hand off to Card Template management when creating a new type or changing presentation requirements |
| View, design, or modify card fronts and backs | [Card Template management](references/card-template-management.md) | Refer to Card Design System for visual and component rules |
| Choose themes, components, or responsive presentation | [Card Design System](references/card-design-system.md) | Hand off to Card Template management when a usable Anki template is needed |

Cross-workflow handoff: Content import specifies the learning goal and information to save. Note Type management determines the actual fields and, when needed, asks Card Template management to generate front and back templates. Card Template management uses Card Design System for visual design and returns the template configuration. Note Type management creates new types centrally and returns the actual fields and template status; content import then maps fields and writes Notes. For direct field or template management, enter the corresponding workflow without running the entire chain.

## Shared Constraints

- Explicit user requirements take priority. First verify the actual Decks, Note Types, fields, and templates in Anki. Decide field storage order and card display order separately.
- Design proposals must preserve the learning goal, scope of front-side hints, translation language, and amount of information already confirmed in this turn. Do not impose a default recall exercise on the user. Do not write to Anki when the user requests only a proposal.
- Local scripts only prepare, validate, or preview material. Use the currently available interfaces to inspect Anki's actual state, write to it, and verify writes. Check tool names in this documentation against capabilities available at runtime.
- Preserve source information, unselected fields, and existing review schedules. Before changing a shared Note Type or Card Template, identify affected Decks. Creating a separate new type does not automatically migrate old Notes.
- Complete a feasibility check before writing. Show the target Deck, Note Type, card presentation, estimated count, duplicates and anomalies, media or significant costs, shared impact, and specific actions. When a bulk import involves creating or changing a Note Type, fields, or Card Template, propose fields and a card layout based on the content to import, then confirm them with the user before making those structural changes. A request to create a Deck or import content alone does not confirm unspecified structure or layout. Carry out a specifically confirmed plan under the existing authorization without asking again; confirmation can take any form. Explain and reconfirm material changes to the plan.
- Before deletion, list the affected objects, their count, and downstream effects. Handle hiding a field, clearing field values, deleting a Note, and deleting a Deck separately, and verify results through the actual interface. Explain any interface limitations.

## Output Specification

The main workflow reports one consolidated result. Distinguish preparation, completed writes, and verification; report successes, skips, failures, and items with uncertain status separately. For card design, first deliver an interactive HTML proposal page so the user can inspect and switch layouts, themes, fronts and backs, and representative short and long words; confirm the selection and additional requirements after the user has seen it. Reuse confirmed choices in later feedback and update the same preview file rather than enumerating every combination again. A preview does not mean the changes are active in Anki; after implementation, check Anki's actual presentation. Internal workflows should not report the same step to the user repeatedly.

## Error Handling

If upstream fields or templates were not prepared successfully, pause writes that depend on them. If interface capabilities are insufficient or results are unclear, inspect the actual state before deciding what to do next. Do not invent fields, media, execution results, or sync status.
