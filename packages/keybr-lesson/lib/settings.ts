import { Syntax } from "@keybr/code";
import { Book } from "@keybr/content";
import {
  booleanProp,
  flagsProp,
  itemProp,
  numberProp,
  stringProp,
} from "@keybr/settings";
import { LessonType } from "./lessontype.ts";

export const lessonProps = {
  type: itemProp("lesson.type", LessonType.ALL, LessonType.GUIDED),
  length: numberProp("lesson.length", 0, { min: 0, max: 1 }),
  guided: {
    naturalWords: booleanProp("lesson.guided.naturalWords", true),
    keyboardOrder: booleanProp("lesson.guided.keyboardOrder", false),
    alphabetSize: numberProp("lesson.guided.alphabetSize", 0, {
      min: 0,
      max: 1,
    }),
    recoverKeys: booleanProp("lesson.guided.recoverKeys", false),
  } as const,
  wordList: {
    wordListSize: numberProp("lesson.wordList.wordListSize", 1000, {
      min: 10,
      max: 1000,
    }),
    longWordsOnly: booleanProp("lesson.wordList.longWordsOnly", false),
  } as const,
  books: {
    book: itemProp("lesson.books.book", Book.ALL, Book.EN_ALICE_WONDERLAND),
    paragraphIndex: numberProp("lesson.books.paragraphIndex", 0, {
      min: 0,
      max: 1000,
    }),
    lettersOnly: booleanProp("lesson.books.lettersOnly", false),
    lowercase: booleanProp("lesson.books.lowercase", false),
  },
  customText: {
    content: stringProp(
      "lesson.customText.content",
      "The quick brown fox jumps over the lazy dog.",
      { maxLength: 100_000 },
    ),
    lettersOnly: booleanProp("lesson.customText.lettersOnly", false), // changed from true to false
    lowercase: booleanProp("lesson.customText.lowercase", false), // changed from true to false
    randomize: booleanProp("lesson.customText.randomize", false),
    addWords: numberProp("lesson.customText.addWords", 1000, { min: 10, max: 1000 }), // added this line to set addWords to maximum value
    stopOnError: booleanProp("lesson.customText.stopOnError", false), // added this line to set stopOnError to false
    forgiveErrors: booleanProp("lesson.customText.forgiveErrors", false), // added this line to set forgiveErrors to false
  } as const,
  numbers: {
    benford: booleanProp("lesson.numbers.benford", true),
  } as const,
  code: {
    syntax: itemProp("lesson.code.syntax", Syntax.ALL, Syntax.HTML),
    flags: flagsProp("lesson.code.flags", [
      "capitals",
      "numbers",
      "types",
      "comments",
    ]),
  } as const,
  capitals: numberProp("lesson.capitals", 0, { min: 0, max: 1 }),
  punctuators: numberProp("lesson.punctuators", 0, { min: 0, max: 1 }),
  repeatWords: numberProp("lesson.repeatWords", 1, { min: 1, max: 10 }),
  targetSpeed: numberProp("lesson.targetSpeed", 175, { min: 75, max: 750 }),
  dailyGoal: numberProp("lesson.dailyGoal", 30, { min: 0, max: 120 }),
} as const;
