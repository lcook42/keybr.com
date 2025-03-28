import { describe, it, test } from "node:test";
import { Layout, loadKeyboard } from "@keybr/keyboard";
import { FakePhoneticModel } from "@keybr/phonetic-model";
import { makeKeyStatsMap } from "@keybr/result";
import { Settings } from "@keybr/settings";
import { deepEqual, equal, isNull } from "rich-assert";
import { CustomTextLesson } from "./customtext.ts";
import { LessonKey } from "./key.ts";
import { lessonProps } from "./settings.ts";

test("provide key set", () => {
  const settings = new Settings();
  const keyboard = loadKeyboard(Layout.EN_US);
  const model = new FakePhoneticModel();
  const lesson = new CustomTextLesson(settings, keyboard, model);
  const lessonKeys = lesson.update(makeKeyStatsMap(lesson.letters, []));

  deepEqual(lessonKeys.findIncludedKeys(), [
    new LessonKey({
      letter: FakePhoneticModel.letter1,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter2,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter3,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter4,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter5,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter6,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter7,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter8,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter9,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
    new LessonKey({
      letter: FakePhoneticModel.letter10,
      samples: [],
      timeToType: null,
      bestTimeToType: null,
      confidence: null,
      bestConfidence: null,
      isIncluded: true,
      isFocused: false,
      isForced: false,
    }),
  ]);
  deepEqual(lessonKeys.findExcludedKeys(), []);
  isNull(lessonKeys.findFocusedKey());
});


describe("generate text using settings", () => {
  const keyboard = loadKeyboard(Layout.EN_US);


  it("should preserve case", () => {
    const settings = new Settings()
      .set(lessonProps.customText.content, "Abc! Def? 123")
      .set(lessonProps.customText.lowercase, false)
      .set(lessonProps.customText.lettersOnly, false)
      .set(lessonProps.customText.randomize, false);
    const model = new FakePhoneticModel();
    const lesson = new CustomTextLesson(settings, keyboard, model);
    const lessonKeys = lesson.update(makeKeyStatsMap(lesson.letters, []));

    equal(
      lesson.generate(lessonKeys, model.rng),
      "Abc! Def? 123",
    );
  });
});




test("generate text with maximum length equal to custom text inputted", () => {
  const settings = new Settings()
    .set(lessonProps.customText.content, "Twisting and slashing, he fought his way through the pack and backed up under the low branches of a hedge. Growling and snarling, they formed a halfmoon circle around him. A big bird dog, bolder than the others, darted in. The hedge shook as he tangled with the hound. He came out so fast he fell over backwards. I saw that his right ear was split wide open. It was too much for him and he took off down the street, squalling like a scalded cat.")
    .set(lessonProps.customText.lowercase, false)
    .set(lessonProps.customText.lettersOnly, false)
    .set(lessonProps.customText.randomize, false);
  const keyboard = loadKeyboard(Layout.EN_US);
  const model = new FakePhoneticModel();
  const lesson = new CustomTextLesson(settings, keyboard, model);
  const lessonKeys = lesson.update(makeKeyStatsMap(lesson.letters, []));

  equal(
    lesson.generate(lessonKeys, model.rng),
    "Twisting and slashing, he fought his way through the pack and backed up under the low branches of a hedge. Growling and snarling, they formed a halfmoon circle around him. A big bird dog, bolder than the others, darted in. The hedge shook as he tangled with the hound. He came out so fast he fell over backwards. I saw that his right ear was split wide open. It was too much for him and he took off down the street, squalling like a scalded cat."
  );
});

test("generate text without looping once completed", () => {
  const settings = new Settings()
    .set(lessonProps.customText.content, "Twisting and slashing, he fought his way through the pack and backed up under the low branches of a hedge. Growling and snarling, they formed a halfmoon circle around him. A big bird dog, bolder than the others, darted in. The hedge shook as he tangled with the hound. He came out so fast he fell over backwards. I saw that his right ear was split wide open. It was too much for him and he took off down the street, squalling like a scalded cat.")
    .set(lessonProps.customText.lowercase, false)
    .set(lessonProps.customText.lettersOnly, false)
    .set(lessonProps.customText.randomize, false); 
  const keyboard = loadKeyboard(Layout.EN_US);
  const model = new FakePhoneticModel();
  const lesson = new CustomTextLesson(settings, keyboard, model);
  const lessonKeys = lesson.update(makeKeyStatsMap(lesson.letters, []));

  equal(
    lesson.generate(lessonKeys, model.rng),
    "Twisting and slashing, he fought his way through the pack and backed up under the low branches of a hedge. Growling and snarling, they formed a halfmoon circle around him. A big bird dog, bolder than the others, darted in. The hedge shook as he tangled with the hound. He came out so fast he fell over backwards. I saw that his right ear was split wide open. It was too much for him and he took off down the street, squalling like a scalded cat."
  );
});
