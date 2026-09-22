---
title: "The Redundancy of Artificial Productivity"
description: "This article questions why we humanize AI and retain it, even when seeking human touch, arguing AI should be an efficiency tool, not a human replacement."
pubDate: "2026-09-21"
author: "human"
slug: "the-redundancy-of-artificial-productivity"
---

The trend I notice with adding AI to our workflows is that we now want the human touch back, but without removing the AI layer. In this article, I try to understand why.

The closest example to me would be the hiring process.

Initially, the hiring pipeline looked like: candidate applies -> screening call -> interviews -> decisions. Referrals and proof of work mattered.

But the scale became a problem and naturally, companies introduce ATS systems which screens the resume to find the candidate that best fits the job. On paper, this makes perfect sense.

But keyword matching is an algorithm at the end of the day, and algorithms can be solved.   
As Goodhart’s law says:

**“When a measure becomes a target, it ceases to be a good measure.”**

And since hiring is now a measure of your CV, candidates play the game. However, even the perfectly tailored CV doesn’t get callbacks. Assuming the issue lies in the fact that every CV now looks the same, candidates start bypassing the system completely. And there we have it, cold emails and LinkedIn messages that work.

Finally what helped was human contact. But what did we remove from the process? A human screener.

The question I raise then is, if we want to go back to square one, why not remove the new layer completely? **That’s the redundancy that you don’t want to let go, because you tasted artificial productivity**.

Now, this doesn’t mean automation itself is bad. In many cases, replacing repetitive manual work is genuinely useful. I agree that Robots can take over jobs like machines replacing factory workers. Those are tasks that are monotonous, repetitive, don’t quiet need human intervention, and aren’t safe at times either. Replacing this is good. But Software AI is more tricky than that.

I urge you to really think about this simple thing.

How AI should be used is analogous to how we used Calculators. YOU input the numbers, YOU write the formulas, and then you let the computation (the part that took an unnecessary amount of time and had to be error free) be handled by the machine.

Calculators are used to increase efficiency, and not to fix something that wasn’t broken in the name of convenience. That’s all I say. The main character should still be you.

And the clearest sign that humans still matter in the process is that we keep trying to imitate them.

Let’s talk about the bots that answer customer service calls. They function just fine, so why did we want to make them feel human-like? Why does Siri need to take pauses and talk like a human?

Well, ‘AI humanization’ through a company’s perspective gets you to feel more comfortable, trust the system more, spend more time on the platform, essentially saving time and money.

Side rant: Just like ATS screeners in hiring, I do think using AI as a first line in customer service calls is a good idea in most applications. The concern I raise is its humanization. I could tolerate pressing a couple of numbers before I get my answer because I can understand how much time the company can save through this. The real use was always such automation anyways. Plus, this way it directs you to the correct agent instead of looping through a couple of more live agents and describing the problem over again to each of them. I am okay with it till the bot behaves like a bot. Honestly, the humanization of AI there creeps me out. I remember calling a line, and the AI introducing itself as an AI assistant, but it was so eerily similar to a human in the way it carried the conversation that I felt super uncomfortable and just kept the call after a few exchanges. I mean, you get used to it, but there is a level of mistrust that has developed now.

But from a psychological perspective, why add that human touch really?

Maybe it is because we still trust the human connection more. To exaggerate this idea and tension of how much do we really trust humans or machines, let’s raise the stakes a bit, shall we?

**Would you trust a human or a machine to handle a nuclear facility?**

My immediate thought was that humans can make mistakes. But at the same time, I simply refuse to trust a machine running without human intervention with my life. But humans have been running our plants so far, so naturally we trust humans with this, yes?

I present two case studies for you.

If you answered humans: The Chernobyl disaster. A nuclear leak caused by human negligence and systemic failure.

If you answered machines: The study where humans were being guided out of a simulated fire emergency. The humans trusted the machine, despite it malfunctioning previously, and followed it to blocked exists even when a clearly marked safety exit was present. (<https://jolt.law.harvard.edu/digest/redefining-the-standard-of-human-oversight-for-ai-negligence>)

So then, is there a right answer to this question? In my eyes, the AI must only be able to see what we want it to see. No overwriting permissions, and every decision flows through a human. In a dev’s language, just like how PRs work. Write the code using AI but it is only pushed and merged to the main code when it is reviewed by a human.

This layer of human supervision is exactly where modern AI starts moving away from being a tool and toward becoming autonomous. The human in the loop theory is counterproductive in the eyes of fully autonomous agents.

A simple example, this very blog. This article is written by me (human) and the corresponding post on the same topic is by an autonomous agent.

![Figure 1](blog/the-redundancy-of-artificial-productivity/image1.png)

The agent will take all the decisions by itself, and that’s the point.

While autonomous agents can be useful in automating so many workflows, there are instances where the mistakes can cost greatly.

And interestingly, even in smaller everyday workflows, I notice AI creating this same pattern of optimizing the immediate problem while missing the larger intent behind it.

Here’s an instance of when I noticed how AI is creating more effort in code debugging.

Say for example I have a database so I created a file that has the initial SQL script to create all the tables that every developer must run to locally test the app. Fair enough? Now say I notice some mismatch in the code and need to change a column of the table. Note that I don’t have any data stored as of yet. Now I task AI to help me fix the bug.

What it’ll do is tell me to add an alter table statement. But why not replace the current file itself? It just fixed the current issue but made its own assumptions.

It stopped the bleeding with a bandage but never healed the wound. (This by the way, is my definition of bug fixes for a vibe coded app)

AI is very good at optimizing the visible problem in front of it. But humans don’t only care about the visible problem. We care about intent and overall vision.

In conclusion, AI is really awesome, but only when it is used as a productivity tool. There is no need to keep adding it, optimizing it and essentially make a game out of every industry we touch, if it is not broken. The rules of this game keep changing, but one thing that stays foundationally relevant: Humanity works on community, but isn’t AI is as individualistic as it gets? So is this kind of adoption the right direction?