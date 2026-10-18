// Generated from content/seed.json, skill-tree.json, and Markdown files.
import type { Course, SiteSettings, SkillStage } from "../types";
export const bundledSettings: SiteSettings = {
  "siteTitle": "Courses",
  "siteDescription": "Lorem ipsum dolor sit amet.",
  "defaultLanguage": "en"
};
export const bundledCourses: Course[] = [
  {
    "id": "course:intro-course",
    "slug": "intro-course",
    "title": "Your Learning Adventure",
    "description": "Lorem ipsum dolor sit amet.",
    "thumbnailUrl": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
    "modules": [
      {
        "id": "module:intro-course:1",
        "title": "Get oriented",
        "order": 1,
        "lessons": [
          {
            "id": "lesson:intro-course:welcome",
            "slug": "welcome",
            "title": "Welcome to your learning path",
            "order": 1,
            "body": "# Welcome\r\n\r\nThis is a **demo course** platform.\r\n\r\n## Features\r\n\r\n- Video playback\r\n- Markdown lesson content\r\n- Local progress tracking\r\n\r\nEnjoy the platform!",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Welcome to this open-source course platform demo."
              }
            ]
          },
          {
            "id": "lesson:intro-course:video-test",
            "slug": "video-test",
            "title": "A short pause to notice",
            "order": 2,
            "body": "# Video Playback\r\n\r\nThis lesson tests the **real video player**.\r\n\r\nThe video below is a public domain test file.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "This lesson tests the real video player."
              }
            ]
          }
        ]
      },
      {
        "id": "module:intro-course:2",
        "title": "Make it yours",
        "order": 2,
        "lessons": [
          {
            "id": "lesson:intro-course:screens-and-navigation",
            "slug": "screens-and-navigation",
            "title": "Choose one small next step",
            "order": 1,
            "body": "# Navigation\r\n\r\nThe app uses *Expo Router*.\r\n\r\n1. Home screen shows courses.\r\n2. Course screen shows modules.\r\n3. Lesson screen shows content.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "The app uses Expo Router."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "course:personal-foundations",
    "slug": "personal-foundations",
    "title": "Know Yourself, Grow on Purpose",
    "description": "Lorem ipsum dolor sit amet.",
    "thumbnailUrl": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85",
    "modules": [
      {
        "id": "module:personal-foundations:1",
        "title": "Find your starting point",
        "order": 1,
        "lessons": [
          {
            "id": "lesson:personal-foundations:personal-inventory",
            "slug": "personal-inventory",
            "title": "Take a strengths-first inventory",
            "order": 1,
            "body": "# Take a strengths-first inventory\n\nSelf-improvement works best when it starts with what is already working, not with a verdict about what is wrong. A strengths-first inventory helps you see patterns you can build on.\n\n## Try it\n\nWrite down three moments from the last month when you felt capable, engaged, or useful. For each one, note:\n\n- What were you doing?\n- Which strength did you use (for example, patience, curiosity, or follow-through)?\n- What conditions helped that strength show up?\n\nLook for a pattern across the moments. A strength is not a fixed label or a reason to do everything the same way; it is a resource you can choose to use.\n\n## Small experiment\n\nChoose one strength and use it deliberately in a situation this week. Afterwards, note what felt helpful and what you would change.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Write down three recent moments when you felt capable, engaged, or useful. Notice the strengths and conditions in common, then choose one strength to use deliberately this week."
              }
            ]
          },
          {
            "id": "lesson:personal-foundations:values-in-action",
            "slug": "values-in-action",
            "title": "Turn values into everyday choices",
            "order": 2,
            "body": "# Turn values into everyday choices\n\nValues are directions, not finish lines. “Connection” or “craft” becomes useful when it helps you choose what to do in a real situation.\n\n## Try it\n\nPick one value that matters to you. Complete these sentences:\n\n1. “This value matters because…”\n2. “When I live it in a small way, someone could see me…”\n3. “One situation where I can practice it this week is…”\n\nMake the action small enough that you can do it on an ordinary day. If your value is learning, you might ask one sincere question. If it is care, you might give someone your full attention for five minutes.\n\n## Reflect\n\nValues can compete. When that happens, name both values and choose a reasonable next step rather than expecting a perfect answer.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Choose one value that matters. Describe why it matters, how someone could see you living it, and one small situation where you can practice it this week."
              }
            ]
          }
        ]
      },
      {
        "id": "module:personal-foundations:2",
        "title": "Choose a direction",
        "order": 2,
        "lessons": [
          {
            "id": "lesson:personal-foundations:one-small-experiment",
            "slug": "one-small-experiment",
            "title": "Design a one-week experiment",
            "order": 1,
            "body": "# Design a one-week experiment\n\nA goal can feel too large to begin. An experiment is smaller: it lets you learn what works without demanding a permanent promise.\n\n## Make your experiment\n\n- **I want to learn:** What makes it easier for me to take a short walk?\n- **For one week, I will:** Walk for ten minutes after lunch on two days.\n- **I will make it easier by:** Putting my shoes by the door.\n- **I will notice:** My energy before and after, without judging the result.\n\nChoose your own question and a version you can repeat at least once. If the week becomes busy, reduce the experiment rather than treating a missed day as failure.\n\n## Close the loop\n\nAt the end of the week, ask: What helped? What got in the way? What is one adjustment I want to try next?",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Choose a question you want to learn about and design a one-week experiment with one small action. At the end, notice what helped and what you would change."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "course:focus-and-habits",
    "slug": "focus-and-habits",
    "title": "Focus & Habits",
    "description": "Lorem ipsum dolor sit amet.",
    "thumbnailUrl": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
    "modules": [
      {
        "id": "module:focus-and-habits:1",
        "title": "Protect your attention",
        "order": 1,
        "lessons": [
          {
            "id": "lesson:focus-and-habits:attention-audit",
            "slug": "attention-audit",
            "title": "Notice where your attention goes",
            "order": 1,
            "body": "# Notice where your attention goes\n\nAttention is shaped by your surroundings, energy, and the tasks in front of you. A short observation is more useful than blaming yourself for distraction.\n\n## A two-day attention audit\n\nThree times a day, jot down what you were trying to do, what pulled your attention away, and how you were feeling. Keep the notes factual: “notifications appeared” is more actionable than “I have no discipline.”\n\nAfter two days, look for one repeating cue. Perhaps a noisy room, an unclear next step, or a low-energy time is making focus harder.\n\n## Choose one adjustment\n\nChange one condition for a single work session: silence notifications, write the next action on paper, or take a short break first. Notice whether the adjustment helped. The aim is useful information, not a perfect record.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "For two days, notice what you are trying to do, what pulls your attention away, and how you feel. Look for one repeating cue and try one small environmental adjustment."
              }
            ]
          },
          {
            "id": "lesson:focus-and-habits:make-focus-easier",
            "slug": "make-focus-easier",
            "title": "Make the helpful choice easier",
            "order": 2,
            "body": "# Make the helpful choice easier\n\nWillpower is unreliable when a distracting option is one tap away and the work is vague. Design the environment so that beginning the task takes less effort.\n\n## Prepare a focus session\n\n1. Write one visible next action, such as “draft the opening paragraph.”\n2. Put the materials you need within reach.\n3. Move one likely distraction farther away or silence it.\n4. Choose a gentle time box, such as 15 minutes, then decide whether to continue.\n\nKeep the session small enough to start. A break is part of a sustainable rhythm, not a reward you have to earn.\n\n## If you get interrupted\n\nNote the interruption, return to the written next action, and restart with a shorter time box if needed. Each return is practice.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Write one next action, prepare what you need, move one distraction, and choose a gentle time box. If interrupted, return to the next action and restart small."
              }
            ]
          }
        ]
      },
      {
        "id": "module:focus-and-habits:2",
        "title": "Build a repeatable rhythm",
        "order": 2,
        "lessons": [
          {
            "id": "lesson:focus-and-habits:tiny-habit-loop",
            "slug": "tiny-habit-loop",
            "title": "Build a tiny habit loop",
            "order": 1,
            "body": "# Build a tiny habit loop\n\nA repeatable habit often has a cue, a very small action, and a satisfying sense of completion. The first version should be so manageable that you can practice it on a busy day.\n\n## Write an if-then plan\n\n“After I [existing routine], I will [tiny action] in [specific place].”\n\nFor example: “After I make tea, I will open my notebook and write one priority.” The cue connects the new action to a routine that already happens.\n\n## Make it forgiving\n\nDefine a minimum version that still counts as practice. If you miss a day, restart at the next cue; you do not need to compensate or double the effort. Once the action feels familiar, decide whether to grow it.\n\nWhat cue, tiny action, and place will you test for the next week?",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Connect a tiny action to a routine that already happens. Choose a cue, action, and place, and remember that a missed day is simply a chance to restart."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "course:emotional-resilience",
    "slug": "emotional-resilience",
    "title": "Emotional Resilience",
    "description": "Lorem ipsum dolor sit amet.",
    "thumbnailUrl": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    "modules": [
      {
        "id": "module:emotional-resilience:1",
        "title": "Understand the moment",
        "order": 1,
        "lessons": [
          {
            "id": "lesson:emotional-resilience:name-the-feeling",
            "slug": "name-the-feeling",
            "title": "Name the feeling without judgment",
            "order": 1,
            "body": "# Name the feeling without judgment\n\nStrong feelings can narrow attention. Pausing to describe what is happening may create room for a considered response. It does not make a difficult situation disappear.\n\n## A one-minute check-in\n\n- **Notice:** What sensations or impulses are present?\n- **Name:** What emotion might fit? More than one can be true.\n- **Allow:** “I am noticing ___ right now.” This is a description, not an instruction.\n- **Choose:** What is one kind, safe next step?\n\nUse plain language and avoid grading the feeling as good or bad. If naming it is hard, describe the body sensation or write “uncertain.”\n\n## Keep support in reach\n\nThese reflection exercises are educational, not mental-health treatment. If distress feels overwhelming or you feel unsafe, reach out to someone you trust or a qualified local support service.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Notice sensations, name a possible feeling without judgment, and choose one kind, safe next step. These learning exercises are not mental-health treatment."
              }
            ]
          },
          {
            "id": "lesson:emotional-resilience:thoughts-are-not-facts",
            "slug": "thoughts-are-not-facts",
            "title": "Make room between thought and fact",
            "order": 2,
            "body": "# Make room between thought and fact\n\nUnder pressure, a thought can sound like a certain prediction: “I always get this wrong.” Treating a thought as information to examine—not a fact you must obey—can make more choices visible.\n\n## Try the three-column note\n\n| What happened (observable) | The story my mind added | Another possible explanation |\n| --- | --- | --- |\n| A message has no reply yet | “They are upset with me” | They may be busy; I do not know yet |\n\nDo not force a positive interpretation. The aim is to separate what you know from what you are guessing and to make room for more than one explanation.\n\n## Choose a useful response\n\nAsk what you would do next if you held the thought lightly. You might wait, ask a clarifying question, or take care of something else while you learn more.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Separate observable facts from the story your mind adds. Consider another possible explanation without forcing positivity, then choose a useful next response."
              }
            ]
          }
        ]
      },
      {
        "id": "module:emotional-resilience:2",
        "title": "Find your way back",
        "order": 2,
        "lessons": [
          {
            "id": "lesson:emotional-resilience:recovery-plan",
            "slug": "recovery-plan",
            "title": "Create a personal recovery plan",
            "order": 1,
            "body": "# Create a personal recovery plan\n\nRecovery does not have to mean bouncing back instantly. A plan can help you find one supportive next step when you have less capacity.\n\n## Fill in your plan\n\n- **Early signs I need a pause:** (for example, rushing or skipping meals)\n- **A short reset that is usually safe for me:** (water, fresh air, a quiet moment)\n- **A person or resource I can contact:** (choose someone you trust)\n- **One thing that can wait:** (give yourself permission to defer it)\n\nKeep the plan realistic and easy to find. Your needs can change, so revisit it when you have more space.\n\n## Remember\n\nRest and asking for help are valid actions. If you are in immediate danger or cannot keep yourself safe, contact emergency services or crisis support available where you live.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Write down early signs you need a pause, a safe reset, someone you can contact, and one thing that can wait. Asking for help and resting are valid next steps."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "course:confident-communication",
    "slug": "confident-communication",
    "title": "Confident Communication",
    "description": "Lorem ipsum dolor sit amet.",
    "thumbnailUrl": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
    "modules": [
      {
        "id": "module:confident-communication:1",
        "title": "Listen to understand",
        "order": 1,
        "lessons": [
          {
            "id": "lesson:confident-communication:curious-listening",
            "slug": "curious-listening",
            "title": "Listen with curiosity",
            "order": 1,
            "body": "# Listen with curiosity\n\nListening to understand is different from waiting for your turn to speak. A little curiosity can help both people feel clearer, even when you do not agree.\n\n## Practice the listening loop\n\n1. Give the speaker your attention for a few minutes.\n2. Reflect the main point in your own words: “It sounds like…”\n3. Ask one open question: “What part feels most important to you?”\n4. Check your understanding before offering ideas.\n\nYou do not need to solve the situation. Ask whether the person wants listening, brainstorming, or practical help.\n\n## Try it in a low-stakes conversation\n\nAfterwards, notice which question helped you understand more. Listening can include a respectful boundary if you need to pause or return to the conversation later.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Give someone your attention, reflect what you heard, ask one open question, and check your understanding before offering ideas."
              }
            ]
          },
          {
            "id": "lesson:confident-communication:clear-boundaries",
            "slug": "clear-boundaries",
            "title": "Say what you need with care",
            "order": 2,
            "body": "# Say what you need with care\n\nA boundary communicates what you can do, what you cannot do, or what you need next. It is clearer when it describes your own action rather than trying to control another person.\n\n## Use a simple structure\n\n“I can [what is possible]. I cannot [limit]. I can [alternative or next step].”\n\nFor example: “I can review one section today. I cannot finish the full report by noon. I can send notes on the opening section this afternoon.”\n\n## Practice\n\nWrite a boundary for a real, low-stakes situation. Keep it brief, respectful, and specific. You can be kind and still be clear; a boundary does not require a long defense.\n\nIf safety is a concern, prioritize support and a safe plan over having a direct conversation.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "State what you can do, what you cannot do, and an alternative or next step. Be brief and respectful; prioritize safety if a direct conversation is risky."
              }
            ]
          }
        ]
      },
      {
        "id": "module:confident-communication:2",
        "title": "Make feedback useful",
        "order": 2,
        "lessons": [
          {
            "id": "lesson:confident-communication:useful-feedback",
            "slug": "useful-feedback",
            "title": "Give feedback people can use",
            "order": 1,
            "body": "# Give feedback people can use\n\nUseful feedback focuses on a specific behavior and its impact, then invites a next step. It is more helpful when offered with respect and room for the other person's perspective.\n\n## Try this structure\n\n- **Context:** When did this happen?\n- **Observation:** What did you see or hear, without guessing intent?\n- **Impact:** What effect did it have?\n- **Invitation:** What could we try next time?\n\nFor example: “In today's handoff, the deadline was not included, so I wasn't sure what to prioritize. Could we add the due date to the next handoff?”\n\n## Make it a conversation\n\nAsk if it is a good time, listen to their response, and be open to new information. Feedback is not a verdict on someone's character; it is an opportunity to improve a shared situation.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Describe the context, observable behavior, impact, and an invitation for next time. Ask if it is a good time and listen to the other person's perspective."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "course:purposeful-productivity",
    "slug": "purposeful-productivity",
    "title": "Purposeful Productivity",
    "description": "Lorem ipsum dolor sit amet.",
    "thumbnailUrl": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    "modules": [
      {
        "id": "module:purposeful-productivity:1",
        "title": "Choose what matters",
        "order": 1,
        "lessons": [
          {
            "id": "lesson:purposeful-productivity:meaningful-goals",
            "slug": "meaningful-goals",
            "title": "Set a goal that matters to you",
            "order": 1,
            "body": "# Set a goal that matters to you\n\nA useful goal connects an outcome you care about to a next action you can influence. It should guide your choices without turning your worth into a score.\n\n## Draft a grounded goal\n\n- **Why it matters to me:** Name the value or need underneath the goal.\n- **What I can influence:** Choose a behavior, not another person's response.\n- **The next small action:** Make it possible to begin this week.\n- **How I will review it:** Pick a date to learn and adjust.\n\n“Become more successful” is hard to act on. “Spend 20 minutes on my portfolio on Tuesday” is testable and adjustable.\n\n## Leave room for life\n\nChoose a minimum version for busy days and a sign that tells you the plan needs changing. Changing the plan is part of learning.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Connect an outcome you care about to a behavior you can influence, a small next action, and a date to review. Adjusting a goal is part of learning."
              }
            ]
          },
          {
            "id": "lesson:purposeful-productivity:energy-aware-planning",
            "slug": "energy-aware-planning",
            "title": "Plan around your energy",
            "order": 2,
            "body": "# Plan around your energy\n\nTime estimates matter, but energy and context matter too. A plan is easier to follow when demanding work has space and routine tasks have a place.\n\n## Make a simple energy map\n\nFor a few days, note when you tend to feel most alert, steady, or low-energy. There is no ideal pattern. Use your own observations rather than comparing your schedule with someone else's.\n\nPlace one important, demanding task in a period when you are usually more alert. Batch or simplify routine work where it fits. Leave small buffers around transitions.\n\n## Adjust with care\n\nIf your energy changes, reduce the task, move it, or ask for help. A sustainable plan includes breaks and recovery; it is not a test of how much you can push through.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Notice when you tend to feel alert or low-energy. Place demanding tasks with care, leave transition buffers, and include breaks and recovery in your plan."
              }
            ]
          }
        ]
      },
      {
        "id": "module:purposeful-productivity:2",
        "title": "Keep learning from the week",
        "order": 2,
        "lessons": [
          {
            "id": "lesson:purposeful-productivity:weekly-reset",
            "slug": "weekly-reset",
            "title": "Run a ten-minute weekly reset",
            "order": 1,
            "body": "# Run a ten-minute weekly reset\n\nA weekly reset is a short review that helps you close open loops and choose a manageable next step. It is not a demand to optimize every hour.\n\n## Ten-minute review\n\n1. **Notice:** What moved forward, even a little?\n2. **Learn:** What felt easier or harder than expected?\n3. **Release:** What can be paused, delegated, or removed?\n4. **Choose:** What are one to three priorities for the coming week?\n5. **Prepare:** What is the first small action, and when will you start?\n\nKeep the notes somewhere easy to revisit. If a plan repeatedly does not fit, make it smaller or change the conditions instead of blaming yourself.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Review what moved forward, what you learned, what can be released, and one to three priorities. Choose a first action and make the plan fit your life."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "course:thoughtful-leadership",
    "slug": "thoughtful-leadership",
    "title": "Thoughtful Leadership",
    "description": "Lorem ipsum dolor sit amet.",
    "thumbnailUrl": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85",
    "modules": [
      {
        "id": "module:thoughtful-leadership:1",
        "title": "Create the conditions for trust",
        "order": 1,
        "lessons": [
          {
            "id": "lesson:thoughtful-leadership:trust-through-clarity",
            "slug": "trust-through-clarity",
            "title": "Build trust through clear agreements",
            "order": 1,
            "body": "# Build trust through clear agreements\n\nTrust grows through everyday experiences of being heard, knowing what to expect, and seeing people follow through. Clear agreements reduce the guesswork for everyone.\n\n## Make an agreement visible\n\nFor a shared task, clarify:\n\n- What outcome are we aiming for?\n- Who owns the next step?\n- When will we check in?\n- What should happen if the plan changes?\n\nInvite questions and make it safe to raise uncertainty early. An agreement is not a contract for perfection; it is a shared starting point that people can update.\n\n## Reflect\n\nThink of one recurring handoff that could become clearer. Ask the people involved what information would help them do their best work.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Clarify the shared outcome, owner, check-in, and what to do if the plan changes. Invite questions and treat agreements as something the team can update."
              }
            ]
          },
          {
            "id": "lesson:thoughtful-leadership:share-ownership",
            "slug": "share-ownership",
            "title": "Share ownership, not just tasks",
            "order": 2,
            "body": "# Share ownership, not just tasks\n\nDelegating well means sharing context and decision space, not simply transferring a checklist. People need enough clarity to act and enough trust to choose how.\n\n## Set up shared ownership\n\nExplain the outcome and why it matters. Agree on boundaries, resources, and a check-in point. Ask what support would help, then let the person choose a reasonable approach.\n\nAvoid taking the work back at the first difference in style. If a risk appears, discuss it early and adjust together. Feedback should clarify the work, not remove the other person's agency.\n\n## Practice\n\nChoose a small task you can share this week. Name what success looks like, what decisions the other person owns, and when you will reconnect.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Share the outcome, context, decision space, and support available. Agree on a check-in and let the other person choose a reasonable approach."
              }
            ]
          }
        ]
      },
      {
        "id": "module:thoughtful-leadership:2",
        "title": "Make decisions together",
        "order": 2,
        "lessons": [
          {
            "id": "lesson:thoughtful-leadership:decision-clarity",
            "slug": "decision-clarity",
            "title": "Make the decision and owner clear",
            "order": 1,
            "body": "# Make the decision and owner clear\n\nTeams lose time when a discussion ends without agreement about who decides, what was decided, or when to revisit it. A short decision note gives people a common reference.\n\n## Capture four things\n\n- **Decision:** What are we choosing for now?\n- **Owner:** Who will take the next action?\n- **Reason:** What information or trade-off mattered most?\n- **Review point:** What would make us revisit the decision?\n\nNot every decision needs consensus. Be explicit about who has input and who is accountable, and make space for concerns before closing the discussion.\n\n## Try it\n\nAfter your next team decision, write a three-sentence summary and invite corrections. Clarity is a practice, not a claim that everyone agrees.",
            "variants": [
              {
                "language": "en",
                "label": "English",
                "isDefault": true
              }
            ],
            "transcripts": [
              {
                "language": "en",
                "text": "Capture what was decided, who owns the next action, why it was chosen, and when to revisit it. Make clear whose input matters and who is accountable."
              }
            ]
          }
        ]
      }
    ]
  }
];
export const bundledSkillStages: SkillStage[] = [
  {
    "title": "Start here",
    "subtitle": "Lorem ipsum dolor sit amet.",
    "nodes": [
      {
        "slug": "self-awareness",
        "courseSlug": "personal-foundations",
        "title": "Self-awareness",
        "description": "Lorem ipsum dolor sit amet.",
        "domain": "Foundations",
        "icon": "compass",
        "prerequisites": []
      }
    ]
  },
  {
    "title": "Build everyday skills",
    "subtitle": "Lorem ipsum dolor sit amet.",
    "nodes": [
      {
        "slug": "focus-and-habits",
        "courseSlug": "focus-and-habits",
        "title": "Focus & habits",
        "description": "Lorem ipsum dolor sit amet.",
        "domain": "Focus",
        "icon": "target",
        "prerequisites": [
          "self-awareness"
        ]
      },
      {
        "slug": "emotional-resilience",
        "courseSlug": "emotional-resilience",
        "title": "Emotional resilience",
        "description": "Lorem ipsum dolor sit amet.",
        "domain": "Wellbeing",
        "icon": "heart",
        "prerequisites": [
          "self-awareness"
        ]
      },
      {
        "slug": "confident-communication",
        "courseSlug": "confident-communication",
        "title": "Communication",
        "description": "Lorem ipsum dolor sit amet.",
        "domain": "Connection",
        "icon": "messages",
        "prerequisites": [
          "self-awareness"
        ]
      }
    ]
  },
  {
    "title": "Plan your work",
    "subtitle": "Lorem ipsum dolor sit amet.",
    "nodes": [
      {
        "slug": "purposeful-productivity",
        "courseSlug": "purposeful-productivity",
        "title": "Purposeful productivity",
        "description": "Lorem ipsum dolor sit amet.",
        "domain": "Focus",
        "icon": "target",
        "prerequisites": [
          "focus-and-habits",
          "emotional-resilience"
        ]
      }
    ]
  },
  {
    "title": "Work with others",
    "subtitle": "Lorem ipsum dolor sit amet.",
    "nodes": [
      {
        "slug": "thoughtful-leadership",
        "courseSlug": "thoughtful-leadership",
        "title": "Thoughtful leadership",
        "description": "Lorem ipsum dolor sit amet.",
        "domain": "Connection",
        "icon": "users",
        "prerequisites": [
          "confident-communication",
          "purposeful-productivity"
        ]
      }
    ]
  }
];
